/** Identical on both panes — only the title word changes. */
export function PaneHeader({ title }: { title: string }) {
  return (
    <section className="border-b border-line bg-mist py-10">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="section-label mb-3">Nothing is real</p>
        <h1 className="font-display text-4xl uppercase text-ink md:text-5xl">{title}</h1>
      </div>
    </section>
  );
}
