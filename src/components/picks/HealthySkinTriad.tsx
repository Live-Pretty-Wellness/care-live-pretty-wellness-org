import triad from "@/assets/healthy-skin-triad-v4.png";

/**
 * JEAN'S HEALTHY SKIN TRIAD — approved framework graphic.
 * Use Jean's exact uploaded image as-is. Never recreate, redraw, or restyle it.
 */
export function HealthySkinTriad({ supporting }: { supporting: string }) {
  return (
    <section className="py-7">
      <div className="pick-shell">
        <div className="mx-auto max-w-md">
          <img
            src={triad}
            alt="Jean's Healthy Skin Triad: Healthy Skin Balance, Healthy Pore Care, and Healthy Skin Barrier overlapping around Clear Skin"
            className="h-auto w-full"
          />
        </div>

        <p className="mx-auto mt-7 max-w-xl text-center font-display text-lg text-ink">
          {supporting}
        </p>
      </div>
    </section>
  );
}
