export function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="max-w-[720px] w-full">
      {title ? (
        <h2 className="mt-10 mb-2 text-sm uppercase tracking-wider text-muted-foreground">
          {title}
        </h2>
      ) : null}
      <div className="divide-y divide-border/70">
        {children}
      </div>
    </section>
  );
}


