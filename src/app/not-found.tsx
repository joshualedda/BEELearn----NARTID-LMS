import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Page not found</h2>
      <p className="text-sm text-gray-500">The page you requested does not exist.</p>
      <Link href="/" className="underline">
        Return home
      </Link>
    </div>
  );
}
