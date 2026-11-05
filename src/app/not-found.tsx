import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="topo-bg flex min-h-[100svh] flex-col items-center justify-center bg-navy-950 px-6 text-center text-white">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-6 text-5xl font-semibold sm:text-7xl">Page not found</h1>
      <p className="mt-6 max-w-md text-concrete-300">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-orange-500 px-7 py-4 text-sm font-semibold text-navy-950 transition-colors hover:bg-orange-400"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to home
      </Link>
    </section>
  );
}
