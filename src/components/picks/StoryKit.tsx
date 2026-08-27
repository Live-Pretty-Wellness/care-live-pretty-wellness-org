import type { ReactNode } from "react";
import { useState } from "react";
import lpwLogo from "@/assets/lpw-logo.png";

/* =========================================================================
   STORY KIT — chapter primitives for the 8-chapter interactive Jean's Pick.
   Playfair headings / Arial body / ivory-cream-ink with restrained rose.
   ========================================================================= */

export function StoryTopBar() {
  return (
    <header className="border-b border-line bg-cream/70 backdrop-blur-sm">
      <div className="pick-shell flex flex-col items-center gap-2 py-4 text-center">
        <img src={lpwLogo} alt="Live Pretty Wellness" className="h-14 w-auto sm:h-16" />
        <p className="eyebrow">Jean&rsquo;s Picks</p>
      </div>
    </header>
  );
}

export const CHAPTER_TITLES = [
  "My Story",
  "The Shift",
  "Why You're Here",
  "Pretty Skin Strategist",
  "Jean's Healthy Skin Triad",
  "The Pretty Skin Strategist Field Guide",
  "Your Pretty Skin Team",
  "Your Starting Plan",
];

export function ChapterProgress({ chapter }: { chapter: number }) {
  return (
    <div className="pick-shell no-print pt-6">
      <div className="flex items-center gap-1.5">
        {CHAPTER_TITLES.map((t, i) => (
          <span
            key={t}
            className={`h-1.5 flex-1 rounded-full ${i < chapter ? "bg-rose" : "bg-line"}`}
          />
        ))}
      </div>
      <p className="eyebrow mt-3">
        {chapter} of 8 &middot; {CHAPTER_TITLES[chapter - 1]}
      </p>
    </div>
  );
}

export function Chapter({ children }: { children: ReactNode }) {
  return <section className="pick-shell py-7 sm:py-9">{children}</section>;
}

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="mt-2 text-[1.85rem] sm:text-[2.4rem]">{children}</h1>;
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-9 text-[1.5rem] sm:text-[1.9rem]">{children}</h2>;
}

export function Sub({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-soft">{children}</p>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[1.0125rem] leading-relaxed text-ink">{children}</p>;
}

export function Beat({ lines }: { lines: string[] }) {
  return (
    <div className="mt-4 space-y-1.5 text-[1.0125rem] leading-relaxed text-ink">
      {lines.map((l, i) => (
        <p key={`${l}-${i}`}>{l}</p>
      ))}
    </div>
  );
}

export function Statement({ children }: { children: ReactNode }) {
  return (
    <p className="my-7 font-display text-[1.6rem] leading-tight text-ink sm:text-[2.05rem]">
      {children}
    </p>
  );
}

export function PullCard({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="gem-card my-6">
      <p className="font-display text-[1.35rem] leading-snug text-ink sm:text-[1.6rem]">{title}</p>
      {children ? <div className="mt-3 text-[0.975rem] text-ink-soft">{children}</div> : null}
    </div>
  );
}

export function Byline({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-sm uppercase tracking-[0.14em] text-taupe">{children}</p>;
}

export function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-[1.0125rem] text-ink">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5">
          <span aria-hidden className="mt-[0.1rem] text-rose">
            &middot;
          </span>
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

/* Real photo with caption */
export function Photo({
  src,
  alt,
  caption,
  ratio = "aspect-[4/3]",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
}) {
  return (
    <figure className="my-7">
      <img
        src={src}
        alt={alt}
        className={`w-full rounded-lg border border-line bg-cream object-cover ${ratio}`}
        loading="lazy"
      />
      {caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-taupe">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/**
 * PHOTO SLOT — labeled placeholder for Jean's approved images that have not been
 * uploaded into the project yet (acne photo strip, lifestyle/fitness images).
 * Swap the frame for <Photo /> once the file lands in src/assets.
 */
export function PhotoSlot({ label, caption }: { label: string; caption?: string }) {
  return (
    <figure className="my-7">
      <div className="grid aspect-[4/3] w-full place-items-center rounded-lg border border-dashed border-sand bg-cream px-6 text-center">
        <p className="eyebrow text-taupe">Image placeholder &middot; {label}</p>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-taupe">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

/* Expandable educational card — no numbering, stays inside its chapter */
export function ExpandCard({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-line bg-offwhite">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-cocoa">
          {title}
        </span>
        <span aria-hidden className="shrink-0 text-rose">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className="space-y-3 border-t border-line px-5 py-4 text-[0.975rem] leading-relaxed text-ink-soft">
          {children}
        </div>
      ) : null}
    </div>
  );
}

export function QuietCard({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="quiet-card my-6">
      {label ? <p className="eyebrow text-cocoa">{label}</p> : null}
      <div className={`space-y-2.5 text-[0.975rem] leading-relaxed text-ink-soft ${label ? "mt-2.5" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export function Bridge({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 rounded-lg border-l-2 border-rose bg-cream px-5 py-4">
      <p className="eyebrow text-cocoa">Where 1:1 begins</p>
      <div className="mt-2 space-y-2 text-[0.95rem] leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

/* Single primary forward action (plus quiet back link) */
export function ChapterNav({
  onBack,
  onNext,
  nextLabel,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
}) {
  return (
    <div className="no-print mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-sand px-5 py-3 text-xs uppercase tracking-[0.18em] text-taupe transition-colors hover:border-rose hover:text-cocoa"
        >
          ← Back
        </button>
      ) : (
        <span />
      )}
      <button
        type="button"
        onClick={onNext}
        className="w-full rounded-md bg-cocoa px-6 py-4 text-sm font-semibold uppercase tracking-[0.13em] text-cream transition-colors hover:bg-espresso sm:w-auto"
      >
        {nextLabel}
      </button>
    </div>
  );
}

/* Large selection cards (single select) */
export function BigChoice({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string; lines: string[] }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label="Where are you in your acne story right now?" className="mt-6 grid gap-3">
      {options.map((o) => {
        const selected = value === o.value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(o.value)}
            className={`rounded-lg border px-5 py-5 text-left transition-colors ${
              selected ? "border-rose bg-rose-tint" : "border-line bg-offwhite hover:border-rose-soft"
            }`}
          >
            <span className="block font-display text-[1.2rem] leading-snug text-ink sm:text-[1.35rem]">
              {o.label}
            </span>
            <span className="mt-2 block space-y-1 text-[0.95rem] leading-relaxed text-ink-soft">
              {o.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* Tap-to-mark reflection cards — no score, no judgment */
export function ReflectCards({
  items,
  values,
  onChange,
}: {
  items: string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) =>
    onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  return (
    <div className="mt-5 grid gap-2.5">
      {items.map((it) => {
        const on = values.includes(it);
        return (
          <button
            key={it}
            type="button"
            role="checkbox"
            aria-checked={on}
            onClick={() => toggle(it)}
            className={`flex items-start gap-3 rounded-lg border px-4 py-4 text-left transition-colors ${
              on ? "border-rose bg-rose-tint" : "border-line bg-offwhite hover:border-rose-soft"
            }`}
          >
            <span
              aria-hidden
              className={`mt-[0.15rem] h-4 w-4 shrink-0 rounded-sm border ${
                on ? "border-rose bg-rose" : "border-sand bg-cream"
              }`}
            />
            <span className="text-[0.975rem] text-ink">{it}</span>
          </button>
        );
      })}
    </div>
  );
}

/* Choose exactly N */
export function PickThree({
  options,
  values,
  onChange,
  limit = 3,
}: {
  options: { value: string; label: string }[];
  values: string[];
  onChange: (v: string[]) => void;
  limit?: number;
}) {
  const toggle = (v: string) => {
    if (values.includes(v)) onChange(values.filter((x) => x !== v));
    else if (values.length < limit) onChange([...values, v]);
  };
  return (
    <div>
      <div className="mt-5 grid gap-2.5">
        {options.map((o) => {
          const rank = values.indexOf(o.value);
          const selected = rank > -1;
          const full = !selected && values.length >= limit;
          return (
            <button
              key={o.value}
              type="button"
              disabled={full}
              onClick={() => toggle(o.value)}
              className={`flex items-center gap-3 rounded-lg border px-4 py-4 text-left transition-colors ${
                selected
                  ? "border-rose bg-rose-tint"
                  : full
                    ? "border-line bg-cream opacity-50"
                    : "border-line bg-offwhite hover:border-rose-soft"
              }`}
            >
              <span
                aria-hidden
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${
                  selected ? "border-rose bg-rose text-offwhite" : "border-sand text-taupe"
                }`}
              >
                {selected ? rank + 1 : ""}
              </span>
              <span className="text-[0.975rem] text-ink">{o.label}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-taupe">
        {values.length} of {limit} chosen
      </p>
    </div>
  );
}

/* =========================================================================
   FIELD GUIDE PRIMITIVES — Chapter 6 (no sub-progress, expandable grouping)
   ========================================================================= */

/* One of the three Triad-aligned Field Guide sections */
export function FieldSection({
  name,
  kicker,
  intro,
  children,
  defaultOpen = false,
}: {
  name: string;
  kicker: string;
  intro: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="mt-5 overflow-hidden rounded-lg border border-line bg-offwhite">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <span>
          <span className="block font-display text-[1.35rem] leading-none text-ink sm:text-[1.55rem]">
            {name}
          </span>
          <span className="eyebrow mt-2 block text-cocoa">{kicker}</span>
        </span>
        <span aria-hidden className="shrink-0 text-lg text-rose">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className="border-t border-line px-5 pb-7 pt-5">
          <div className="text-[1rem] leading-relaxed text-ink-soft">{intro}</div>
          <div className="mt-6 space-y-7">{children}</div>
        </div>
      ) : null}
    </section>
  );
}

/* TITLE / 1-3 short sentences / YOUR MOVE / optional WHY THIS MATTERS */
export function Move({
  title,
  children,
  move,
  why,
}: {
  title: string;
  children: ReactNode;
  move: ReactNode;
  why?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p className="text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-cocoa">{title}</p>
      <div className="mt-2.5 space-y-2 text-[1rem] leading-relaxed text-ink">{children}</div>
      <div className="mt-3.5 border-l-2 border-rose-soft pl-4">
        <p className="eyebrow text-cocoa">Your move</p>
        <div className="mt-1.5 space-y-1 text-[1rem] leading-relaxed text-ink">{move}</div>
      </div>
      {why ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 text-xs uppercase tracking-[0.16em] text-taupe underline decoration-sand underline-offset-4 hover:text-cocoa"
          >
            {open ? "Hide why this matters" : "Why this matters"}
          </button>
          {open ? (
            <div className="mt-2.5 space-y-2 text-[0.95rem] leading-relaxed text-ink-soft">
              {why}
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

/* Compact list rendered as short lines inside a Move */
export function Notes({ items }: { items: string[] }) {
  return (
    <p className="text-[1rem] leading-relaxed text-ink-soft">{items.join(" · ")}</p>
  );
}

/* Simple vertical contact chains: HAIR → BONNET → SKIN */
export function ContactChains({ chains }: { chains: string[][] }) {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      {chains.map((chain) => (
        <div
          key={chain.join("-")}
          className="rounded-lg border border-line bg-cream px-4 py-4 text-center"
        >
          {chain.map((step, i) => (
            <div key={step}>
              {i > 0 ? (
                <span aria-hidden className="block text-rose">
                  ↓
                </span>
              ) : null}
              <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-cocoa">
                {step}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* Simple saved daily text field */
export function NoteField({
  label,
  hint,
  placeholder,
  value,
  onChange,
  rows = 5,
}: {
  label: string;
  hint?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="mt-5">
      <label className="eyebrow block text-cocoa" htmlFor={label}>
        {label}
      </label>
      {hint ? <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{hint}</p> : null}
      <textarea
        id={label}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-lg border border-line bg-offwhite px-4 py-3 text-[1rem] leading-relaxed text-ink outline-none placeholder:text-taupe focus:border-rose"
      />
    </div>
  );
}

/* Single-select compact action cards */
export function PickOne({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-6">
      <p className="eyebrow text-cocoa">{label}</p>
      <div role="radiogroup" aria-label={label} className="mt-3 grid gap-2">
        {options.map((o) => {
          const on = value === o;
          return (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(on ? "" : o)}
              className={`rounded-lg border px-4 py-3.5 text-left text-[0.975rem] transition-colors ${
                on
                  ? "border-rose bg-rose-tint text-ink"
                  : "border-line bg-offwhite text-ink hover:border-rose-soft"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* Movement day row */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function DayRow({
  values,
  onChange,
}: {
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (d: string) =>
    onChange(values.includes(d) ? values.filter((x) => x !== d) : [...values, d]);
  return (
    <div className="mt-3.5">
      <p className="eyebrow text-cocoa">My movement days</p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {DAYS.map((d) => {
          const on = values.includes(d);
          return (
            <button
              key={d}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(d)}
              className={`min-w-[3.1rem] rounded-full border px-3 py-2 text-xs uppercase tracking-[0.1em] transition-colors ${
                on ? "border-rose bg-rose text-offwhite" : "border-sand bg-offwhite text-taupe"
              }`}
            >
              {d}
            </button>
          );
        })}
      </div>
      <p className="mt-2.5 text-sm text-taupe">
        Movement supports whole-person health. This is not a promise that exercise clears acne.
      </p>
    </div>
  );
}

/* Team relationship node + downward connector (Chapter 7) */
export function TeamNode({
  title,
  role,
  lead,
  items,
}: {
  title: string;
  role: string;
  lead?: string;
  items: string[];
}) {
  return (
    <div className="rounded-lg border border-line bg-offwhite px-6 py-6">
      <p className="font-display text-[1.6rem] leading-none text-ink sm:text-[1.9rem]">{title}</p>
      <p className="eyebrow mt-2 text-cocoa">{role}</p>
      {lead ? <p className="mt-3 text-[1rem] leading-relaxed text-ink-soft">{lead}</p> : null}
      <ul className="mt-3 space-y-1.5 text-[1rem] text-ink">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <span aria-hidden className="mt-[0.1rem] text-rose">
              &middot;
            </span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TeamConnector() {
  return (
    <div aria-hidden className="flex flex-col items-center py-3">
      <span className="h-8 w-px bg-sand" />
      <span className="-mt-1 text-rose">▼</span>
    </div>
  );
}
