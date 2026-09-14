import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import lpwLogo from "@/assets/lpw-logo.png";

const JEAN_PHOTO = "/images/jeans-picks/acneplan/jean-portrait-approved.jpeg";
const STORAGE_KEY = "lpw_pretty_skin_reset_v1";

export const Route = createFileRoute("/psr-q7m4-v9k2")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "The Pretty Skin Reset — Live Pretty Wellness" },
      {
        name: "description",
        content:
          "A free interactive reset for acne-prone skin: clear the noise, see what you're actually doing, and create a simpler starting point.",
      },
      { property: "og:title", content: "The Pretty Skin Reset" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PrettySkinReset,
});

/* ---------------------------------- types --------------------------------- */

type DayKey = "M" | "T" | "W" | "Th" | "F" | "Sa" | "Su";
const DAYS: DayKey[] = ["M", "T", "W", "Th", "F", "Sa", "Su"];

type Session = "morning" | "evening";

type OrganizerState = Record<string, { text: string; days: DayKey[]; paused: boolean }>;

const FIELD_DEFS: { id: string; label: string; days: boolean }[] = [
  { id: "precleanse", label: "Pre-Cleanse", days: false },
  { id: "cleanse", label: "Cleanse", days: false },
  { id: "toner", label: "Toner", days: false },
  { id: "serum", label: "Serum", days: false },
  { id: "treatment1", label: "Treatment / Active 1", days: true },
  { id: "treatment2", label: "Treatment / Active 2", days: true },
  { id: "treatment3", label: "Treatment / Active 3", days: true },
  { id: "other1", label: "Other 1", days: false },
  { id: "other2", label: "Other 2", days: false },
];

const ORAL_MEDS = [
  "Isotretinoin / Accutane",
  "Spironolactone",
  "Birth control used partly or primarily for acne",
  "Oral antibiotic",
  "Other",
  "None",
];

const CHECKLIST = [
  "I looked at my current routine as a whole.",
  "I identified self-added extras I'm pausing.",
  "I left prescribed and clinician-directed treatment alone.",
  "I'm not filling newly empty spaces with another acne treatment or active.",
  "I'm cleansing gently instead of scrubbing or intentionally drying out my skin.",
  "I checked the things that regularly touch my face.",
  "I looked at the foods and drinks I rely on most often.",
  "I thought about whether my current approach fits my long game.",
  "I know what I'm aiming for: soft, supple, comfortable skin—not squeaky, stripped or over-dried skin.",
];

const LONG_GAME = [
  "Pregnancy or trying to conceive",
  "breastfeeding/postpartum",
  "perimenopause or menopause",
  "a new health condition",
  "new medications",
  "side effects",
  "insurance or cost changes",
  "moving",
  "changing healthcare providers",
  "travel",
  "a busier schedule",
  "skin becoming drier or more sensitive",
  "priorities changing as I get older",
  "current treatment no longer working the way it once did",
];

type PersistedState = {
  organizer: OrganizerState;
  meds: string[];
  medOther: string;
  checklist: boolean[];
};

const EMPTY: PersistedState = { organizer: {}, meds: [], medOther: "", checklist: CHECKLIST.map(() => false) };

function loadState(): PersistedState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      organizer: parsed.organizer ?? {},
      meds: parsed.meds ?? [],
      medOther: parsed.medOther ?? "",
      checklist:
        Array.isArray(parsed.checklist) && parsed.checklist.length === CHECKLIST.length
          ? parsed.checklist
          : CHECKLIST.map(() => false),
    };
  } catch {
    return EMPTY;
  }
}

/* --------------------------------- atoms ---------------------------------- */

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{children}</h2>;
}

function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-[0.95rem] leading-relaxed text-ink-soft ${className}`}>{children}</p>;
}

function SectionNumber({ n, id }: { n: string; id: string }) {
  return (
    <div id={id} className="mb-6 scroll-mt-24">
      <span className="font-display text-sm font-semibold tracking-[0.3em] text-rose">{n}</span>
    </div>
  );
}

function Pathway() {
  const steps = ["CLEAR", "ORGANIZE", "SUPPORT", "STABILIZE"];
  return (
    <p className="text-[0.72rem] font-medium tracking-[0.18em] text-taupe" aria-label="The four parts of the Reset: Clear, Organize, Support, Stabilize">
      {steps.map((s, i) => (
        <span key={s}>
          {i > 0 && <span className="mx-1.5 text-rose" aria-hidden="true">→</span>}
          {s}
        </span>
      ))}
    </p>
  );
}

function ProgressBar() {
  const items: { id: string; label: string; n: string }[] = [
    { id: "clear", label: "Clear", n: "01" },
    { id: "organize", label: "Organize", n: "02" },
    { id: "support", label: "Support", n: "03" },
    { id: "stabilize", label: "Stabilize", n: "04" },
  ];
  return (
    <nav aria-label="Reset progress" className="sticky top-0 z-40 border-b border-line bg-ivory/95 backdrop-blur-sm">
      <div className="pick-shell flex items-center justify-between gap-2 py-2.5">
        <img src={lpwLogo} alt="Live Pretty Wellness" className="h-6 w-auto" />
        <ol className="flex items-center gap-1 sm:gap-2">
          {items.map((it, i) => (
            <li key={it.id} className="flex items-center">
              {i > 0 && <span className="mx-0.5 text-[0.6rem] text-taupe" aria-hidden="true">→</span>}
              <a
                href={`#${it.id}`}
                className="rounded px-1.5 py-1 text-[0.62rem] font-medium tracking-[0.14em] text-ink-soft uppercase transition-colors hover:bg-rose-tint hover:text-ink focus-visible:outline-2 focus-visible:outline-ring sm:px-2 sm:text-[0.68rem]"
              >
                <span className="text-rose">{it.n}</span> {it.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/* ------------------------------ organizer row ------------------------------ */

function OrganizerField({
  sessionKey,
  def,
  value,
  onChange,
}: {
  sessionKey: string;
  def: (typeof FIELD_DEFS)[number];
  value: { text: string; days: DayKey[]; paused: boolean };
  onChange: (v: { text: string; days: DayKey[]; paused: boolean }) => void;
}) {
  const inputId = `${sessionKey}-${def.id}`;
  return (
    <div className="rounded-md border border-line bg-offwhite p-3">
      <div className="flex items-center justify-between gap-2">
        <label htmlFor={inputId} className="text-[0.68rem] font-semibold tracking-[0.14em] text-taupe uppercase">
          {def.label}
        </label>
        <button
          type="button"
          onClick={() => onChange({ ...value, paused: !value.paused })}
          aria-pressed={value.paused}
          className={`shrink-0 rounded-sm border px-2 py-0.5 text-[0.62rem] font-semibold tracking-[0.12em] uppercase transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
            value.paused
              ? "border-rose bg-rose-tint text-cocoa"
              : "border-line bg-cream text-taupe hover:border-rose hover:text-ink"
          }`}
        >
          {value.paused ? "Paused" : "Pause"}
        </button>
      </div>
      <input
        id={inputId}
        type="text"
        value={value.text}
        onChange={(e) => onChange({ ...value, text: e.target.value })}
        placeholder="Optional — a blank space is okay"
        className={`mt-2 w-full rounded-sm border border-line bg-ivory px-3 py-2.5 text-base text-ink placeholder:text-taupe/60 focus:border-rose focus:outline-1 focus:outline-ring ${
          value.paused ? "line-through opacity-50" : ""
        }`}
      />
      {value.paused && (
        <p className="mt-1 text-[0.62rem] font-semibold tracking-[0.12em] text-rose uppercase">Paused for this Reset</p>
      )}
      {def.days && (
        <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={`Days I currently use ${def.label}`}>
          {DAYS.map((d) => {
            const on = value.days.includes(d);
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() =>
                  onChange({ ...value, days: on ? value.days.filter((x) => x !== d) : [...value.days, d] })
                }
                className={`min-h-9 min-w-9 rounded-full border px-2 text-[0.7rem] font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                  on
                    ? "border-cocoa bg-cocoa text-offwhite"
                    : "border-line bg-cream text-ink-soft hover:border-rose"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------- page ----------------------------------- */

function PrettySkinReset() {
  const [state, setState] = useState<PersistedState>(EMPTY);

  useEffect(() => {
    setState(loadState());
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* private mode */
    }
  }, [state]);

  const getField = (session: Session, id: string) =>
    state.organizer[`${session}-${id}`] ?? { text: "", days: [], paused: false };

  const setField = (session: Session, id: string, v: { text: string; days: DayKey[]; paused: boolean }) =>
    setState((s) => ({ ...s, organizer: { ...s.organizer, [`${session}-${id}`]: v } }));

  const toggleMed = (med: string) =>
    setState((s) => ({
      ...s,
      meds: s.meds.includes(med) ? s.meds.filter((m) => m !== med) : [...s.meds, med],
    }));

  const toggleCheck = (i: number) =>
    setState((s) => ({ ...s, checklist: s.checklist.map((c, j) => (j === i ? !c : c)) }));

  const renderSession = (session: Session, title: string) => {
    const defs = session === "morning" ? [...FIELD_DEFS, { id: "sunscreen", label: "Sunscreen", days: false }] : FIELD_DEFS;
    return (
      <section aria-label={`${title} regimen`} className="panel-card">
        <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
        <div className="mt-4 space-y-3">
          {defs.map((def) => (
            <div key={def.id}>
              <OrganizerField
                sessionKey={session}
                def={def}
                value={getField(session, def.id)}
                onChange={(v) => setField(session, def.id, v)}
              />
              {def.id === "treatment3" && session === "morning" && null}
            </div>
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-ivory">
      <ProgressBar />

      {/* HERO */}
      <header className="pick-shell pt-12 pb-10 text-center">
        <img src={lpwLogo} alt="Live Pretty Wellness" className="mx-auto h-14 w-auto" />
        <div className="mt-8">
          <Eyebrow>Live Pretty Wellness</Eyebrow>
        </div>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">The Pretty Skin Reset</h1>
        <p className="mt-4 font-display text-xl text-cocoa italic">Before you add something else, reset what you're already doing.</p>
        <div className="mx-auto mt-5 max-w-xl space-y-3">
          <Body>
            Acne-prone skin can get complicated fast—products, treatments, prescriptions, advice, trends and another
            thing to try.
          </Body>
          <Body>
            The Pretty Skin Reset helps you step out of the noise, see what you're actually doing and create a simpler
            starting point.
          </Body>
        </div>
        <a
          href="#clear"
          className="mt-8 inline-block rounded-sm bg-cocoa px-8 py-3.5 text-[0.8rem] font-semibold tracking-[0.18em] text-offwhite uppercase transition-colors hover:bg-espresso focus-visible:outline-2 focus-visible:outline-ring"
        >
          Start My Reset
        </a>
        <div className="mt-6 flex justify-center">
          <Pathway />
        </div>
      </header>

      <div className="rule-hair" aria-hidden="true" />

      {/* 01 — CLEAR */}
      <section aria-labelledby="h-clear" className="pick-shell py-12">
        <SectionNumber n="01 — CLEAR" id="clear" />
        <h2 id="h-clear" className="sr-only">Clear the noise</h2>
        <H2>Clear the Noise</H2>
        <div className="mt-4 space-y-3">
          <Body>Before you decide what comes next, take a look at what's already there.</Body>
          <Body>
            The goal of this Reset isn't to add another product or build another complicated routine. We're starting by
            clearing some of the unnecessary noise around acne-prone skin.
          </Body>
        </div>

        {/* Reset pyramid */}
        <div className="mt-10" role="img" aria-label="The Pretty Skin Reset mini-framework: Clear, Organize, Support, Stabilize">
          <div className="mx-auto flex max-w-md flex-col items-stretch gap-1.5">
            {[
              { n: "4 — STABILIZE", d: "Move toward skin that feels healthier, softer, supple and comfortable.", w: "w-[58%]", dark: true },
              { n: "3 — SUPPORT", d: "Create a gentler environment for acne-prone skin.", w: "w-[72%]", dark: false },
              { n: "2 — ORGANIZE", d: "See what you're already using.", w: "w-[86%]", dark: false },
              { n: "1 — CLEAR", d: "Remove unnecessary noise.", w: "w-full", dark: false },
            ].map((lvl) => (
              <div
                key={lvl.n}
                className={`mx-auto rounded-sm border px-4 py-3 text-center ${lvl.w} ${
                  lvl.dark ? "border-cocoa bg-cocoa text-offwhite" : "border-line bg-cream text-ink"
                }`}
              >
                <p className={`text-[0.7rem] font-semibold tracking-[0.18em] ${lvl.dark ? "text-offwhite" : "text-cocoa"}`}>{lvl.n}</p>
                <p className={`mt-1 text-[0.78rem] leading-snug ${lvl.dark ? "text-offwhite/85" : "text-ink-soft"}`}>{lvl.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Pathway />
          </div>
        </div>

        {/* First rule */}
        <div className="gem-card mt-10 text-center">
          <Eyebrow>First rule of the Reset</Eyebrow>
          <p className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">Don't add something else.</p>
          <div className="mx-auto mt-3 max-w-md space-y-2">
            <Body>
              For now, don't buy another acne active, exfoliant, serum or spot treatment just because your skin
              changes.
            </Body>
            <Body className="font-semibold text-ink">An empty space in your routine doesn't need to be filled.</Body>
          </div>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      {/* 02 — ORGANIZE */}
      <section aria-labelledby="h-organize" className="pick-shell py-12">
        <SectionNumber n="02 — ORGANIZE" id="organize" />
        <h2 id="h-organize" className="sr-only">See what you're actually doing</h2>
        <H2>See What You're Actually Doing</H2>
        <div className="mt-4 space-y-3">
          <Body>Don't clean it up yet.</Body>
          <Body>First, put your current routine in one place—even if it feels like a lot.</Body>
          <Body className="rounded-md border border-line bg-cream px-4 py-3">
            A blank space is okay. This organizer is here to help you see what you're already doing—not to suggest that
            you need every step.
          </Body>
        </div>

        <h3 className="mt-10 font-display text-2xl font-semibold text-ink">My Skin Regimen Organizer</h3>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          {renderSession("morning", "Morning")}
          {renderSession("evening", "Evening")}
        </div>

        {/* Treatment helper */}
        <details className="quiet-card mt-6">
          <summary className="cursor-pointer text-[0.72rem] font-semibold tracking-[0.16em] text-cocoa uppercase focus-visible:outline-2 focus-visible:outline-ring">
            What counts as a treatment or active?
          </summary>
          <div className="mt-4 space-y-3 text-[0.9rem] leading-relaxed text-ink-soft">
            <p className="font-semibold text-ink">Examples of things you may already be using:</p>
            <div>
              <p className="font-semibold text-ink">Retinoids</p>
              <p>Tretinoin • Adapalene/Differin • Tazarotene • Trifarotene/Aklief</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Exfoliating acids</p>
              <p>Salicylic acid • Glycolic acid • Lactic acid</p>
            </div>
            <div>
              <p className="font-semibold text-ink">Other treatments + actives</p>
              <p>
                Benzoyl peroxide • Azelaic acid • Sulfur • Clascoterone/Winlevi • Topical antibiotics • Vitamin C •
                Combination acne treatments • Other prescription acne treatments
              </p>
            </div>
            <p className="rounded-md border border-line bg-ivory px-4 py-3">
              Not sure? Just write the exact product or medication name. You don't need to figure out the category.
            </p>
          </div>
        </details>

        {/* Oral medication */}
        <div className="panel-card mt-6">
          <h3 className="font-display text-lg font-semibold text-ink">Oral Medications I Currently Use for My Skin</h3>
          <div className="mt-4 space-y-2" role="group" aria-label="Oral medications I currently use for my skin">
            {ORAL_MEDS.map((med) => {
              const on = state.meds.includes(med);
              return (
                <button
                  key={med}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleMed(med)}
                  className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-[0.9rem] transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                    on ? "border-cocoa bg-rose-tint text-ink" : "border-line bg-ivory text-ink-soft hover:border-rose"
                  }`}
                >
                  <span>{med}</span>
                  <span
                    aria-hidden="true"
                    className={`ml-3 grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[0.7rem] ${
                      on ? "border-cocoa bg-cocoa text-offwhite" : "border-line text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                </button>
              );
            })}
          </div>
          {state.meds.includes("Other") && (
            <input
              type="text"
              value={state.medOther}
              onChange={(e) => setState((s) => ({ ...s, medOther: e.target.value }))}
              placeholder="Write the medication name"
              aria-label="Other oral medication name"
              className="mt-3 w-full rounded-sm border border-line bg-ivory px-3 py-2.5 text-base text-ink focus:border-rose focus:outline-1 focus:outline-ring"
            />
          )}
        </div>

        {/* Pause */}
        <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
          <div className="min-w-0">
            <h3 className="font-display text-2xl font-semibold text-ink">Now Reset What You Can See</h3>
            <div className="mt-3 space-y-3">
              <Body>Take another look at your organizer.</Body>
              <Body>
                For this Reset, we're clearing some of the self-added extras that can make a routine harder to
                understand.
              </Body>
              <Body>
                Use the <span className="font-semibold text-ink">Pause</span> button beside anything you've entered to
                mark it as paused: your entry stays visible, lightly dimmed, so you can see what you started with and
                what you're pausing. Nothing gets deleted and you don't have to rewrite anything.
              </Body>
              <Body>
                <span className="font-semibold text-ink">Extras may include:</span> extra serums, toners, essences or
                ampoules • facial scrubs • cleansing brushes or abrasive tools • peels • exfoliating masks • extra
                exfoliating products • extra spot treatments • products being used mainly to dry out pimples • new
                products added because of a breakout • “just in case” skincare layers.
              </Body>
            </div>
          </div>
          <div className="shrink-0 rounded-lg border-2 border-cocoa bg-cream p-5 md:max-w-xs">
            <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-cocoa uppercase">
              Part of a treatment plan from your healthcare provider?
            </p>
            <p className="mt-2 font-display text-xl font-semibold text-ink">Leave it alone.</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
              Keep prescribed medications and clinician-directed treatments exactly as directed.
            </p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
              Do not stop, increase, decrease, skip or reschedule prescribed treatment because of the Pretty Skin
              Reset.
            </p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
              If prescribed treatment is causing significant irritation, worsening symptoms or something that concerns
              you, contact the healthcare professional managing it.
            </p>
          </div>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      {/* 03 — SUPPORT */}
      <section aria-labelledby="h-support" className="pick-shell py-12">
        <SectionNumber n="03 — SUPPORT" id="support" />
        <h2 id="h-support" className="sr-only">Support your skin</h2>
        <H2>Support Your Skin</H2>
        <Body className="mt-4">
          Now that you can see your routine more clearly, focus on simple habits that support acne-prone skin without
          piling on more treatment.
        </Body>

        <h3 className="mt-8 text-[0.72rem] font-semibold tracking-[0.18em] text-cocoa uppercase">Gentle Cleansing</h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            { t: "Cleanse gently.", d: "Use lukewarm water and your fingertips." },
            { t: "Skip the scrub.", d: "Avoid abrasive cleansing tools and aggressive scrubbing." },
            { t: "Don't chase “squeaky clean.”", d: "Clean skin does not need to feel tight or stripped." },
            { t: "After sweating:", d: "Cleanse when you're able rather than leaving sweat sitting on the skin for long periods." },
          ].map((c) => (
            <div key={c.t} className="panel-card !p-4">
              <p className="font-display text-base font-semibold text-ink">{c.t}</p>
              <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-soft">{c.d}</p>
            </div>
          ))}
        </div>

        <h3 className="mt-8 text-[0.72rem] font-semibold tracking-[0.18em] text-cocoa uppercase">Hands + Face</h3>
        <ul className="quiet-card mt-3 space-y-2 text-[0.9rem] leading-relaxed text-ink-soft">
          {[
            "Don't pick, squeeze or pop.",
            "Keep frequently used makeup brushes and applicators clean.",
            "Remove makeup before bed.",
            "Clean items that repeatedly touch the face, such as pillowcases, headbands and hats.",
            "Be aware of oily hair products repeatedly contacting the forehead or face.",
          ].map((li) => (
            <li key={li} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 translate-y-1.5 rounded-full bg-rose" aria-hidden="true" />
              <span>{li}</span>
            </li>
          ))}
        </ul>

        <h3 className="mt-8 text-[0.72rem] font-semibold tracking-[0.18em] text-cocoa uppercase">Reset Your Food Environment</h3>
        <div className="panel-card mt-3">
          <p className="font-display text-lg font-semibold text-ink">Look at what you rely on most often.</p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-soft">
            You don't need a perfect “acne diet.” Start by making the everyday food environment a little easier to work
            with.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-rose uppercase">Have less often</p>
              <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
                Sugary soda and sweetened drinks • candy • cookies • cake • doughnuts and pastries • sugary breakfast
                cereals • white bread • potato chips • highly refined sugary snack foods
              </p>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-olive uppercase">Build more meals around</p>
              <ul className="mt-2 space-y-2 text-[0.85rem] leading-relaxed text-ink-soft">
                <li><span className="font-semibold text-ink">Vegetables:</span> leafy greens, broccoli, cauliflower, cabbage, peppers, zucchini, green beans, Brussels sprouts</li>
                <li><span className="font-semibold text-ink">Whole fruit:</span> berries, apples, pears, cherries, peaches, plums, kiwi</li>
                <li><span className="font-semibold text-ink">Protein:</span> fish, chicken, turkey, beans, lentils</li>
                <li><span className="font-semibold text-ink">Fats + add-ons:</span> avocado, walnuts, almonds, chia seeds, pumpkin seeds, extra-virgin olive oil</li>
                <li><span className="font-semibold text-ink">Carbohydrate options:</span> sweet potato, quinoa, beans, lentils</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Grocery list */}
        <div className="panel-card mt-6 !bg-offwhite">
          <h3 className="font-display text-lg font-semibold text-ink">Quick Grocery List</h3>
          <div className="mt-4 space-y-3 text-[0.88rem] leading-relaxed text-ink-soft">
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-cocoa uppercase">Produce</p>
              <p className="mt-1">Berries • apples • pears • leafy greens • broccoli • cauliflower • peppers • zucchini • green beans • sweet potatoes • avocado</p>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-cocoa uppercase">Protein</p>
              <p className="mt-1">Fish • chicken/turkey • beans • lentils</p>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-cocoa uppercase">Pantry</p>
              <p className="mt-1">Quinoa • almonds • walnuts • chia seeds • pumpkin seeds • extra-virgin olive oil</p>
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-cocoa uppercase">Milk swap, if you want one</p>
              <p className="mt-1">Cow's milk → unsweetened almond milk</p>
            </div>
          </div>
          <p className="mt-4 border-t border-line pt-3 text-[0.85rem] font-semibold text-ink">
            Build the food first. You don't need a “skin supplement” haul for this Reset.
          </p>
        </div>

        {/* Jean's optional pick */}
        <div className="gem-card mt-6">
          <Eyebrow>Jean's optional Reset pick</Eyebrow>
          <p className="mt-2 font-display text-xl font-semibold text-ink">La Roche-Posay Thermal Spring Water</p>
          <p className="mt-1 text-[0.9rem] text-ink-soft">An optional soothing mist Jean likes during the Reset.</p>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      {/* 04 — STABILIZE */}
      <section aria-labelledby="h-stabilize" className="pick-shell py-12">
        <SectionNumber n="04 — STABILIZE" id="stabilize" />
        <h2 id="h-stabilize" className="sr-only">Know what you're aiming for</h2>
        <H2>Know What You're Aiming For</H2>
        <Body className="mt-4">
          This Reset isn't about making skin perfectly smooth or forcing it to feel “clean.”
        </Body>

        <div className="gem-card mt-6 text-center">
          <Eyebrow>Think</Eyebrow>
          <p className="mt-3 font-display text-2xl font-semibold tracking-wide text-ink sm:text-3xl">
            Soft. Supple. Comfortable. Plush.
          </p>
          <div className="mx-auto mt-3 max-w-md space-y-2">
            <Body>Think soft, supple, almost baby-like skin—not squeaky-clean skin.</Body>
            <Body className="font-semibold text-ink">Perfectly smooth isn't the goal. Healthy-feeling skin is.</Body>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="panel-card !p-4">
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-olive uppercase">Look for</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
              Healthy-looking • comfortable • not stripped • not excessively dried out
            </p>
          </div>
          <div className="panel-card !p-4">
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-cocoa uppercase">Feel for</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">Soft • supple • comfortable • plush • gentle</p>
          </div>
          <div className="panel-card !p-4">
            <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-rose uppercase">Not the goal</p>
            <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
              Squeaky • tight • raw • burning • over-dried • rough from overdoing skincare
            </p>
          </div>
        </div>

        {/* Long game */}
        <div className="mt-10">
          <h3 className="font-display text-2xl font-semibold text-ink">Think About Your Long Game</h3>
          <p className="mt-4 max-w-xl font-display text-lg leading-snug text-cocoa">
            Can I see myself using my current approach to manage acne-prone skin for the next 5, 10, 15—or even 20
            years?
          </p>
          <Body className="mt-4">Have I thought about what happens to my plan if my life changes?</Body>
          <div className="mt-4 flex flex-wrap gap-2">
            {LONG_GAME.map((c) => (
              <span key={c} className="rounded-full border border-line bg-cream px-3 py-1.5 text-[0.78rem] text-ink-soft">
                {c}
              </span>
            ))}
          </div>
          <Body className="mt-4 italic">You don't need to solve any of this today. Just think about it.</Body>
        </div>

        {/* Reset check */}
        <div className="panel-card mt-10">
          <h3 className="font-display text-2xl font-semibold text-ink">Reset Check</h3>
          <ul className="mt-4 space-y-2">
            {CHECKLIST.map((item, i) => (
              <li key={item}>
                <button
                  type="button"
                  aria-pressed={state.checklist[i]}
                  onClick={() => toggleCheck(i)}
                  className={`flex w-full items-start gap-3 rounded-md border px-4 py-3 text-left text-[0.9rem] leading-relaxed transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
                    state.checklist[i] ? "border-cocoa bg-rose-tint text-ink" : "border-line bg-ivory text-ink-soft hover:border-rose"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm border text-[0.7rem] ${
                      state.checklist[i] ? "border-cocoa bg-cocoa text-offwhite" : "border-line bg-offwhite text-transparent"
                    }`}
                  >
                    ✓
                  </span>
                  <span>{item}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Clear-Skin Pyramid */}
        <div className="mt-10">
          <h3 className="font-display text-2xl font-semibold text-ink">Where This Reset Lives</h3>
          <div className="mx-auto mt-5 flex max-w-md flex-col items-stretch gap-1.5" role="img" aria-label="The Live Pretty Wellness Clear-Skin Pyramid. You are here: Stabilize Skin.">
            <p className="pb-1 text-center text-[0.72rem] font-semibold tracking-[0.2em] text-cocoa uppercase">→ Clear Skin</p>
            {[
              { n: "4 — MAINTAIN + ENHANCE", d: "Long-term control and radiance", w: "w-[58%]", here: false },
              { n: "3 — CONTROL BREAKOUTS", d: "Address bacterial and fungal triggers", w: "w-[72%]", here: false },
              { n: "2 — CALM INFLAMMATION", d: "Reduce irritation and reactivity", w: "w-[86%]", here: false },
              { n: "1 — STABILIZE SKIN", d: "Repair barrier and restore balance", w: "w-full", here: true },
            ].map((lvl) => (
              <div
                key={lvl.n}
                className={`mx-auto rounded-sm px-4 py-3 text-center ${lvl.w} ${
                  lvl.here ? "border-2 border-cocoa bg-cocoa text-offwhite" : "border border-line bg-cream text-ink"
                }`}
              >
                <p className={`text-[0.7rem] font-semibold tracking-[0.18em] ${lvl.here ? "text-offwhite" : "text-cocoa"}`}>
                  {lvl.n}
                  {lvl.here && <span className="ml-2 rounded-sm bg-rose px-1.5 py-0.5 text-[0.6rem] tracking-[0.12em] text-offwhite">You are here</span>}
                </p>
                <p className={`mt-1 text-[0.78rem] leading-snug ${lvl.here ? "text-offwhite/85" : "text-ink-soft"}`}>{lvl.d}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-4 max-w-md space-y-2 text-center">
            <Body className="font-semibold text-ink">The Pretty Skin Reset lives here.</Body>
            <Body>This Reset is a starting point—not your entire acne plan.</Body>
          </div>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      {/* WHAT COMES NEXT */}
      <section aria-labelledby="h-next" className="pick-shell py-12">
        <H2>You've Cleared Some of the Noise. What's Next?</H2>
        <div className="mt-4 space-y-3">
          <Body>Maybe seeing everything in one place made something obvious:</Body>
          <Body className="font-semibold text-ink">
            Treating the next breakout and having a long-term strategy for acne-prone skin aren't the same thing.
          </Body>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="panel-card flex flex-col">
            <Eyebrow>Pretty Skin Strategist</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">The Pretty Skin Strategist Guide</h3>
            <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
              For acne-prone skin that needs a long-term strategy.
            </p>
            <a
              href="#"
              className="mt-5 inline-block rounded-sm border border-cocoa px-6 py-3 text-center text-[0.75rem] font-semibold tracking-[0.18em] text-cocoa uppercase transition-colors hover:bg-cocoa hover:text-offwhite focus-visible:outline-2 focus-visible:outline-ring"
            >
              Get My Guide
            </a>
          </div>
          <div className="panel-card flex flex-col !border-cocoa">
            <Eyebrow>Personalized help</Eyebrow>
            <h3 className="mt-2 font-display text-xl font-semibold text-ink">Ready for Jean to Look at Your Skin With You?</h3>
            <p className="mt-2 text-[0.9rem] font-semibold text-ink">Personalized Skin Strategy Visit</p>
            <p className="mt-2 flex-1 text-[0.9rem] leading-relaxed text-ink-soft">
              Jean looks at your skin history, current routine, treatments, previous responses, goals and treatment
              preferences with you—and works with you to build your individualized:
            </p>
            <p className="mt-2 font-display text-lg font-semibold text-cocoa">Long-Term Clear Skin Game Plan</p>
            <a
              href="#"
              className="mt-5 inline-block rounded-sm bg-cocoa px-6 py-3 text-center text-[0.75rem] font-semibold tracking-[0.18em] text-offwhite uppercase transition-colors hover:bg-espresso focus-visible:outline-2 focus-visible:outline-ring"
            >
              Work With Jean 1:1
            </a>
          </div>
        </div>
      </section>

      <div className="rule-hair" aria-hidden="true" />

      {/* JEAN AUTHOR BLOCK */}
      <section aria-labelledby="h-jean" className="pick-shell py-12">
        <div className="panel-card flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <img
            src={JEAN_PHOTO}
            alt="Jean, board-certified Family Nurse Practitioner and founder of Live Pretty Wellness"
            className="h-28 w-28 shrink-0 rounded-full border border-line object-cover"
            loading="lazy"
          />
          <div className="min-w-0 text-center sm:text-left">
            <Eyebrow>A note from Jean</Eyebrow>
            <h2 id="h-jean" className="mt-2 font-display text-2xl font-semibold text-ink">
              Jean, MSN, FNP-C
            </h2>
            <p className="text-[0.85rem] text-ink-soft">Board-Certified Family Nurse Practitioner</p>
            <div className="mt-4 space-y-3 text-[0.9rem] leading-relaxed text-ink-soft">
              <p className="font-semibold text-ink">A Quick Note from Jean</p>
              <p>
                I'm a board-certified Family Nurse Practitioner, but I'm not your healthcare provider—although I'd love
                the opportunity to be. 💗 The Pretty Skin Reset is general education because I haven't personally
                evaluated you or reviewed your medical history. Keep following the treatment plan from your healthcare
                provider, and check with them before making changes to your medications or medical care.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-10 pb-4 text-center text-[0.7rem] tracking-[0.18em] text-taupe uppercase">
          Live Pretty Wellness
        </p>
      </section>
    </div>
  );
}
