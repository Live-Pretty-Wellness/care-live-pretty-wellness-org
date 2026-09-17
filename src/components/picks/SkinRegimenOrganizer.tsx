import { useEffect, useState } from "react";
import {
  DAYS,
  EMPTY_RESET_STATE,
  FIELD_DEFS,
  ORAL_MEDS,
  loadResetState,
  saveResetState,
  type OrganizerEntry,
  type PersistedResetState,
  type Session,
} from "@/lib/pretty-skin-reset";

function OrganizerField({
  sessionKey,
  def,
  value,
  onChange,
}: {
  sessionKey: string;
  def: (typeof FIELD_DEFS)[number];
  value: OrganizerEntry;
  onChange: (v: OrganizerEntry) => void;
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

function SessionPanel({
  session,
  title,
  state,
  setState,
}: {
  session: Session;
  title: string;
  state: PersistedResetState;
  setState: React.Dispatch<React.SetStateAction<PersistedResetState>>;
}) {
  const defs = session === "morning" ? [...FIELD_DEFS, { id: "sunscreen", label: "Sunscreen", days: false }] : FIELD_DEFS;
  const getField = (id: string) => state.organizer[`${session}-${id}`] ?? { text: "", days: [], paused: false };
  const setField = (id: string, v: OrganizerEntry) =>
    setState((s) => ({ ...s, organizer: { ...s.organizer, [`${session}-${id}`]: v } }));

  return (
    <section aria-label={`${title} regimen`} className="panel-card">
      <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
      <div className="mt-4 space-y-3">
        {defs.map((def) => (
          <OrganizerField
            key={def.id}
            sessionKey={session}
            def={def}
            value={getField(def.id)}
            onChange={(v) => setField(def.id, v)}
          />
        ))}
      </div>
    </section>
  );
}

export function SkinRegimenOrganizer() {
  const [state, setState] = useState<PersistedResetState>(EMPTY_RESET_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(loadResetState());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveResetState(state);
  }, [state, loaded]);

  const toggleMed = (med: string) =>
    setState((s) => ({
      ...s,
      meds: s.meds.includes(med) ? s.meds.filter((m) => m !== med) : [...s.meds, med],
    }));

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SessionPanel session="morning" title="Morning" state={state} setState={setState} />
        <SessionPanel session="evening" title="Evening" state={state} setState={setState} />
      </div>

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

      <div className="panel-card mt-6">
        <h2 className="font-display text-lg font-semibold text-ink">Oral Medications I Currently Use for My Skin</h2>
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

      <div className="mt-10 grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
        <div className="min-w-0">
          <h2 className="font-display text-2xl font-semibold text-ink">Now Reset What You Can See</h2>
          <div className="mt-3 space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
            <p>Take another look at your organizer.</p>
            <p>
              For this Reset, we're clearing some of the self-added extras that can make a routine harder to
              understand.
            </p>
            <p>
              Use the <span className="font-semibold text-ink">Pause</span> button beside anything you've entered to
              mark it as paused: your entry stays visible, lightly dimmed, so you can see what you started with and
              what you're pausing. Nothing gets deleted and you don't have to rewrite anything.
            </p>
            <p>
              <span className="font-semibold text-ink">Extras may include:</span> extra serums, toners, essences or
              ampoules • facial scrubs • cleansing brushes or abrasive tools • peels • exfoliating masks • extra
              exfoliating products • extra spot treatments • products being used mainly to dry out pimples • new
              products added because of a breakout • “just in case” skincare layers.
            </p>
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
            Do not stop, increase, decrease, skip or reschedule prescribed treatment because of the Pretty Skin Reset.
          </p>
          <p className="mt-2 text-[0.85rem] leading-relaxed text-ink-soft">
            If prescribed treatment is causing significant irritation, worsening symptoms or something that concerns
            you, contact the healthcare professional managing it.
          </p>
        </div>
      </div>
    </div>
  );
}
