/* Shared state for the Pretty Skin Reset + Skin Regimen Organizer.
 * Keep this key unchanged so existing organizer entries survive route moves. */
export const RESET_STORAGE_KEY = "lpw_pretty_skin_reset_v1";

export type DayKey = "M" | "T" | "W" | "Th" | "F" | "Sa" | "Su";
export const DAYS: DayKey[] = ["M", "T", "W", "Th", "F", "Sa", "Su"];

export type Session = "morning" | "evening";

export type OrganizerEntry = { text: string; days: DayKey[]; paused: boolean };
export type OrganizerState = Record<string, OrganizerEntry>;

export const FIELD_DEFS: { id: string; label: string; days: boolean }[] = [
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

export const ORAL_MEDS = [
  "Isotretinoin / Accutane",
  "Spironolactone",
  "Birth control used partly or primarily for acne",
  "Oral antibiotic",
  "Other",
  "None",
];

export const CHECKLIST = [
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

export type PersistedResetState = {
  organizer: OrganizerState;
  meds: string[];
  medOther: string;
  checklist: boolean[];
};

export const EMPTY_RESET_STATE: PersistedResetState = {
  organizer: {},
  meds: [],
  medOther: "",
  checklist: CHECKLIST.map(() => false),
};

export function loadResetState(): PersistedResetState {
  if (typeof window === "undefined") return EMPTY_RESET_STATE;
  try {
    const raw = window.localStorage.getItem(RESET_STORAGE_KEY);
    if (!raw) return EMPTY_RESET_STATE;
    const parsed = JSON.parse(raw) as Partial<PersistedResetState>;
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
    return EMPTY_RESET_STATE;
  }
}

export function saveResetState(state: PersistedResetState) {
  try {
    window.localStorage.setItem(RESET_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* private mode */
  }
}
