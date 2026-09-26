import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path";
import { Script } from "node:vm";
import ts from "typescript";

// Execute actual application modules with explicit boundary mocks, without
// importing Next's server-only runtime into the Node test runner.
export function loadTs(path, mocks = {}) {
  const filename = resolve(path);
  const source = readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  });
  const loaded = { exports: {} };
  const nativeRequire = createRequire(filename);
  const require = (id) => {
    if (Object.hasOwn(mocks, id)) return mocks[id];
    if (id.startsWith("@/")) return loadTs(`src/${id.slice(2)}.ts`, mocks);
    return nativeRequire(id);
  };
  new Script(`(function(require, module, exports) {${outputText}\n})`, { filename })
    .runInThisContext()(require, loaded, loaded.exports);
  return loaded.exports;
}
