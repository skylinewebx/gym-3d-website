import JoinLink from "./JoinLink";

export default function CtaBand() {
  return (
    <section className="bg-accent text-accent-contrast">
      <div className="container-x flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
        <h2 className="max-w-2xl text-4xl sm:text-6xl">Your first session is the hardest. Let&rsquo;s start it.</h2>
        <JoinLink prefill={{ mode: "trial" }} className="btn bg-bg text-fg hover:bg-surface">Book Free Trial</JoinLink>
      </div>
    </section>
  );
}
