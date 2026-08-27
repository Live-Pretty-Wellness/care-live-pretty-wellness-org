import type { ReactNode } from "react";
import jeanPortrait from "@/assets/jean-portrait.png";


/* ============ TOP BAR ============ */
export function PickTopBar() {
  return (
    <header className="border-b border-line bg-cream/70 backdrop-blur-sm">
      <div className="pick-shell flex flex-col items-center gap-1 py-4 text-center">
        <p className="eyebrow">Jean&rsquo;s Picks &middot; Make It Make Sense</p>
        <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-rose">
          Save-worthy skincare education
        </p>
      </div>
    </header>
  );
}

/* ============ HERO ============ */
export function PickHero({
  title,
  question,
  hook,
  scanner,
  image,
  imageAlt,
}: {
  title: string;
  question: string;
  hook?: ReactNode;
  scanner?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="pick-shell pt-10 pb-2 sm:pt-14">
      <p className="eyebrow">A quick skincare guide from Live Pretty Wellness</p>
      <h1 className="mt-4 text-[2.35rem] leading-[1.08] sm:text-[3.25rem]">{title}</h1>
      <p className="mt-4 font-display text-xl text-ink-soft sm:text-2xl">{question}</p>
      {scanner ? (
        <p className="mt-3 text-sm uppercase tracking-[0.14em] text-taupe">{scanner}</p>
      ) : null}
      <div className="mx-auto mt-6 max-w-md overflow-hidden rounded-lg border border-line">
        <img
          src={image}
          alt={imageAlt}
          width={1408}
          height={1008}
          className="aspect-[16/10] w-full object-cover"
        />
      </div>
      {hook ? <div className="mt-6 space-y-4 text-ink-soft">{hook}</div> : null}

    </section>
  );
}

/* ============ SECTION ============ */
export function Section({
  index,
  title,
  children,
}: {
  index?: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className="pick-shell py-7 sm:py-8">
      {title ? (
        <div className="mb-4">
          {index ? <p className="eyebrow mb-1.5">{index}</p> : null}
          <h2 className="text-[1.7rem] sm:text-[2.1rem]">{title}</h2>
        </div>
      ) : null}
      <div className="space-y-4 text-ink-soft">{children}</div>
    </section>
  );
}

export function Sub({ children }: { children: ReactNode }) {
  return (
    <h3 className="pt-2 text-[1.05rem] font-semibold uppercase tracking-[0.12em] text-ink">
      {children}
    </h3>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="font-display text-xl leading-snug text-ink sm:text-2xl">{children}</p>;
}

export function Note({ children }: { children: ReactNode }) {
  return <p className="text-sm text-taupe">{children}</p>;
}

export function Bullets({ items, marker = "•" }: { items: ReactNode[]; marker?: string }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-[0.15rem] text-rose">
            {marker}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Divider() {
  return (
    <div className="pick-shell">
      <div className="rule-hair" />
    </div>
  );
}

/* ============ JEAN'S GEM ============ */
export function Gem({ children, large = false }: { children: ReactNode; large?: boolean }) {
  return (
    <figure className="gem-card my-5">
      <figcaption className="eyebrow text-cocoa">Jean&rsquo;s Gem</figcaption>
      <p
        className={`mt-3 font-display text-ink ${
          large ? "text-[1.75rem] leading-tight sm:text-[2.15rem]" : "text-xl sm:text-2xl"
        }`}
      >
        {children}
      </p>
    </figure>
  );
}

/* ============ FAST ANSWER ============ */
export function FastAnswer({ children }: { children: ReactNode }) {
  return (
    <section className="pick-shell py-8">
      <div className="rounded-lg border border-rose/50 bg-rose-tint p-6 sm:p-8">
        <p className="eyebrow text-cocoa">The Fast Answer</p>
        <div className="mt-4 space-y-5 text-ink">{children}</div>
      </div>
    </section>
  );
}

/* ============ JEAN'S QUICK PICK ============ */
export function QuickPick({
  label = "Jean's Quick Pick",
  intro,
  columns,
  footnote,
}: {
  label?: string;
  intro?: string;
  columns: { head: string; sub?: string; items: ReactNode[]; arrow?: ReactNode }[];
  footnote?: ReactNode;
}) {
  return (
    <div className="my-8">
      <p className="eyebrow">{label}</p>
      {intro ? <p className="mt-2 font-medium text-ink">{intro}</p> : null}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {columns.map((col) => (
          <div key={col.head} className="panel-card">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa">
              {col.head}
            </p>
            {col.sub ? <p className="mt-1 text-sm text-taupe">{col.sub}</p> : null}
            <ul className="mt-3 space-y-1.5 font-display text-lg text-ink">
              {col.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            {col.arrow ? (
              <p className="mt-4 border-t border-line pt-3 text-sm text-ink-soft">{col.arrow}</p>
            ) : null}
          </div>
        ))}
      </div>
      {footnote ? <p className="mt-4 text-sm text-taupe">{footnote}</p> : null}
    </div>
  );
}

/* ============ STEP FLOW ============ */
export function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="my-6 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2 sm:flex-1">
          <div className="quiet-card flex-1 px-4 py-3 text-center text-sm font-semibold uppercase tracking-[0.1em] text-ink">
            {step}
          </div>
          {i < steps.length - 1 ? (
            <span aria-hidden className="text-rose">
              →
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ============ CARD GRID ============ */
export function CardGrid({
  items,
}: {
  items: { title: string; body: ReactNode }[];
}) {
  return (
    <div className="my-4 grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.title} className="panel-card">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cocoa">
            {item.title}
          </p>
          <div className="mt-2 space-y-2 text-ink-soft">{item.body}</div>
        </div>
      ))}
    </div>
  );
}

/* ============ WHOLE ROUTINE / BATHROOM CABINET ============ */
export function WholeRoutine({
  headline = "Your bathroom cabinet is part of your health history.",
  items,
  closing,
}: {
  headline?: string;
  items: string[];
  closing?: ReactNode;
}) {
  return (
    <section className="my-4 bg-cocoa py-12 text-cream">
      <div className="pick-shell">
        <p className="eyebrow text-rose-soft">The Whole Routine</p>
        <h2 className="mt-3 font-display text-[1.85rem] leading-tight text-cream sm:text-[2.4rem]">
          {headline}
        </h2>
        <ul className="mt-6 space-y-2">
          {items.map((item) => (
            <li key={item} className="flex gap-3 text-cream/85">
              <span aria-hidden className="text-rose-soft">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        {closing ? <p className="mt-6 text-cream/85">{closing}</p> : null}
      </div>
    </section>
  );
}

/* ============ EVALUATE YOUR SKIN ============ */
export function EvaluateYourSkin({
  title = "Evaluate Your Skin",
  intro,
  questions,
  takeaway,
}: {
  title?: string;
  intro?: ReactNode;
  questions: string[];
  takeaway?: ReactNode;
}) {
  return (
    <section className="pick-shell py-10">
      <div className="quiet-card">
        <p className="eyebrow">{title}</p>
        {intro ? <p className="mt-3 text-ink-soft">{intro}</p> : null}
        <ul className="mt-5 space-y-3">
          {questions.map((q) => (
            <li key={q} className="flex gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
              <span aria-hidden className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full border border-rose" />
              <span className="font-display text-lg text-ink">{q}</span>
            </li>
          ))}
        </ul>
        {takeaway ? (
          <p className="mt-5 font-display text-xl text-ink sm:text-2xl">{takeaway}</p>
        ) : null}
      </div>
    </section>
  );
}

/* ============ READ YOUR SKIN ============ */
export function ReadYourSkin({
  signs,
  closing,
}: {
  signs: string[];
  closing?: ReactNode;
}) {
  return (
    <section className="pick-shell py-10">
      <p className="eyebrow">Read Your Skin</p>
      <h2 className="mt-3 text-[1.7rem] sm:text-[2.1rem]">Pay attention to:</h2>
      <ul className="mt-5 flex flex-wrap gap-2">
        {signs.map((sign) => (
          <li
            key={sign}
            className="rounded-full border border-rose/50 bg-rose-tint px-4 py-1.5 text-sm text-ink"
          >
            {sign}
          </li>
        ))}
      </ul>
      {closing ? <div className="mt-5 space-y-3 text-ink-soft">{closing}</div> : null}
    </section>
  );
}

/* ============ SAVE THIS ============ */
export function SaveThis({
  heading = "Save This — Jean's Cheat Sheet",
  rows,
}: {
  heading?: string;
  rows: { label: string; body: ReactNode }[];
}) {
  return (
    <section className="pick-shell py-7">
      <div className="rounded-lg border border-sand bg-offwhite p-5 sm:p-7">
        <p className="eyebrow text-cocoa">Save This</p>
        <h2 className="mt-2 text-[1.7rem] sm:text-[2rem]">{heading}</h2>
        <div className="mt-4 divide-y divide-line">
          {rows.map((row) => (
            <div key={row.label} className="py-3 first:pt-0 last:pb-0">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cocoa">
                {row.label}
              </p>
              <div className="mt-1.5 space-y-1.5 text-ink-soft">{row.body}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="no-print mt-4 flex justify-center">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full border border-sand px-5 py-2 text-xs uppercase tracking-[0.18em] text-taupe transition-colors hover:border-rose hover:text-cocoa"
        >
          Print / Save as PDF
        </button>
      </div>
    </section>
  );
}

/* ============ WHEN THE QUESTION HAS CHANGED ============ */
export function QuestionChanged({
  title = "When the question has changed",
  intro,
  items,
  mainLine,
  closing,
}: {
  title?: string;
  intro?: ReactNode;
  items: string[];
  mainLine: ReactNode;
  closing?: ReactNode;
}) {
  return (
    <section className="pick-shell py-7">

      <div className="border-l-2 border-rose pl-5 sm:pl-7">
        <h2 className="text-[1.6rem] sm:text-[2rem]">{title}</h2>
        {intro ? <p className="mt-3 text-ink-soft">{intro}</p> : null}
        <ul className="mt-4 space-y-2 text-ink-soft">
          {items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="text-rose">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 font-display text-xl text-ink sm:text-2xl">{mainLine}</p>
        {closing ? <p className="mt-3 text-ink-soft">{closing}</p> : null}
      </div>
    </section>
  );
}

/* ============ JEAN'S FINAL PICK ============ */
export function FinalPick({
  headline,
  looks,
  finalLine,
  extraGem,
}: {
  headline: ReactNode;
  looks: string[];
  finalLine: ReactNode;
  extraGem?: ReactNode;
}) {
  return (
    <section className="bg-cream py-10">
      <div className="pick-shell">
        <p className="eyebrow">Jean&rsquo;s Final Pick</p>
        <h2 className="mt-3 text-[2rem] leading-tight sm:text-[2.6rem]">{headline}</h2>
        <ul className="mt-5 space-y-1.5 font-display text-lg text-ink-soft">
          {looks.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className="mt-5 border-t border-sand pt-5 font-display text-xl text-ink sm:text-2xl">
          {finalLine}
        </p>
        {extraGem ? <Gem>{extraGem}</Gem> : null}
      </div>
    </section>
  );
}

/* ============ GENTLE NEXT STEP ============ */
export function NextStep({ prompt }: { prompt: string }) {
  return (
    <section className="pick-shell no-print py-9 text-center">
      <p className="font-display text-xl text-ink">{prompt}</p>
      <a
        href="https://stan.store/liveprettywellness/p/personalized-skincare-strategy-visit"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-cocoa px-6 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-espresso sm:w-auto"
      >
        Get a personalized skincare strategy →
      </a>
      <div className="mt-9 flex flex-col items-center">
        <img
          src={jeanPortrait}
          alt="Jean of Live Pretty Wellness"
          className="h-24 w-24 rounded-full border border-line bg-cream object-cover object-top"
          loading="lazy"
        />
        <p className="mt-3 text-sm text-taupe">Want to meet Jean first?</p>
        <a
          href="https://stan.store/liveprettywellness/p/meet-jean-free-live-qa"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm uppercase tracking-[0.16em] text-cocoa underline decoration-rose decoration-1 underline-offset-4"
        >
          Meet Jean →
        </a>
      </div>
    </section>
  );
}


/* ============ DISCLAIMER ============ */
export function Disclaimer({ extra }: { extra?: ReactNode }) {
  return (
    <footer className="border-t border-line bg-cream py-10">
      <div className="pick-shell space-y-3 text-[0.8125rem] leading-relaxed text-ink-soft">
        <p className="eyebrow">Disclaimer</p>
        <p>
          Jean&rsquo;s Picks provide general skincare education only. They are not medical advice,
          diagnosis, treatment, or a substitute for individualized care. Product use and skincare
          decisions may vary based on the person, skin condition, medical history, other treatments,
          and the specific product being used. Follow product directions and guidance from an
          appropriate healthcare professional.
        </p>
        {extra ? <p>{extra}</p> : null}
        <p className="pt-2 text-taupe">
          © Live Pretty Wellness · Jean&rsquo;s Picks
        </p>
      </div>
    </footer>
  );
}
