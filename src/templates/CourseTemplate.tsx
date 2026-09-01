import type { ReactNode } from "react";

export default function CourseTemplate({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <article className="prose dark:prose-invert">{children}</article>
    </div>
  );
}
