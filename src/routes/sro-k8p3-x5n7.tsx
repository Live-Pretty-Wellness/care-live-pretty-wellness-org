import { createFileRoute, Link } from "@tanstack/react-router";
import { SkinRegimenOrganizer } from "@/components/picks/SkinRegimenOrganizer";
import lpwLogo from "@/assets/lpw-logo.png";

export const Route = createFileRoute("/sro-k8p3-x5n7")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "My Skin Regimen Organizer — Live Pretty Wellness" },
      {
        name: "description",
        content: "A private-link organizer for seeing your current morning and evening skin regimen in one place.",
      },
    ],
  }),
  component: SkinRegimenOrganizerPage,
});

function SkinRegimenOrganizerPage() {
  return (
    <main className="min-h-screen bg-ivory">
      <header className="border-b border-line bg-cream/70">
        <div className="pick-shell flex flex-col items-center gap-2 py-4 text-center">
          <img src={lpwLogo} alt="Live Pretty Wellness" className="h-12 w-auto sm:h-14" />
          <p className="eyebrow">The Pretty Skin Reset</p>
        </div>
      </header>

      <section className="pick-shell py-10 sm:py-12">
        <p className="eyebrow">Your skin regimen organizer</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">My Skin Regimen Organizer</h1>
        <div className="mt-4 max-w-xl space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
          <p>Before you simplify your routine, put what you're currently using in one place.</p>
          <p>
            A blank space is okay. The organizer helps you see what you're already doing—it doesn't mean you need every
            step.
          </p>
        </div>
        <div className="mt-8">
          <SkinRegimenOrganizer />
        </div>
        <Link
          to="/psr-q7m4-v9k2"
          className="mt-10 inline-block rounded-sm border border-cocoa px-6 py-3 text-[0.75rem] font-semibold tracking-[0.18em] text-cocoa uppercase transition-colors hover:bg-cocoa hover:text-offwhite focus-visible:outline-2 focus-visible:outline-ring"
        >
          Return to the Pretty Skin Reset
        </Link>
      </section>
    </main>
  );
}
