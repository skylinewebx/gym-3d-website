import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x section flex min-h-[60svh] flex-col items-start justify-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="text-[clamp(4rem,14vw,10rem)]">Missed <span className="text-accent">rep.</span></h1>
      <p className="mt-4 max-w-md text-muted">That page doesn&rsquo;t exist. Head back and keep training.</p>
      <Link href="/" className="btn btn-accent mt-8">Back to home</Link>
    </section>
  );
}
