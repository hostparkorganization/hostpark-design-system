/**
 * Motion tokens — from project/README.md (round 2):
 *   "Durations 150–220ms, easing cubic-bezier(0.2, 0, 0, 1) (ease-out).
 *    Fades and short slides (sheets rise 12–16px).
 *    No bounce, no spring overshoot, no parallax."
 *
 * Press feedback specifically: ~120ms, scale to 0.98.
 */

export const motion = {
  duration: {
    fast: 120,
    base: 180,
    slow: 220,
  },
  easing: {
    /** ease-out, Material standard. Use for most transitions. */
    standard: [0.2, 0, 0, 1] as const,
    /** Slightly more emphatic curve for hero / large surfaces. */
    emphasized: [0.2, 0, 0.1, 1] as const,
  },
  press: {
    scale: 0.98,
    duration: 120,
  },
  sheet: {
    /** Vertical rise on sheet open, in px. */
    riseOffset: 14,
  },
} as const;
