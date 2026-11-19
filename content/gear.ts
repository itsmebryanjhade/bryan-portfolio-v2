export type GearItem = {
  name: string;
  /** Short spec line under the name, e.g. "23.8-inch · 144 Hz · VA". */
  spec: string;
  /** Transparent cut-out, so it stands on the tile's stage. */
  image: string;
  imageAlt: string;
  /** Optional second cut-out that crossfades in on hover. */
  hoverImage?: string;
  /** Optional frame sequence played on hover instead (the laptop lid opening). */
  frames?: string[];
  /** How much each frame-to-frame step changes, so playback spends time where the motion is. */
  frameWeights?: number[];
  /** A light sweeps across the keys on hover (the keyboard's backlight). */
  wave?: boolean;
  /** The tile is the secret theme switch: the lamp lights up in dark theme, off in light. */
  themeLamp?: boolean;
  /** Takes two columns, so each group's rows fill evenly. */
  wide?: boolean;
};

export type GearGroup = { title: string; items: GearItem[] };

export const gear: GearGroup[] = [
  {
    title: "Workstation",
    items: [
      {
        name: "Lenovo LOQ",
        spec: "15.6-inch · gaming laptop",
        image: "/images/gear/laptop-open/0.webp",
        imageAlt: "Lenovo LOQ laptop, lid closed. Hover to open it.",
        // 40 frames from the opening video: every 4th frame through the slow lid tilt at the start,
        // then picked so each step changes the picture by the same amount.
        frames: Array.from({ length: 40 }, (_, i) => `/images/gear/laptop-open/${i}.webp`),
      },
      {
        name: "AULA SC580",
        spec: "Wireless · tri-mode",
        image: "/images/gear/mouse.webp",
        imageAlt: "Black AULA SC580 wireless mouse.",
      },
      {
        name: "KOORUI 24″",
        spec: "23.8-inch · 144 Hz · VA",
        image: "/images/gear/monitor.webp",
        // On hover the screen turns on, showing this portfolio (a screenshot warped onto the panel).
        hoverImage: "/images/gear/monitor-on.webp",
        imageAlt: "KOORUI 24-inch 144Hz monitor on its stand.",
      },
      {
        name: "AULA F75",
        spec: "Cyber Night Sky · 75%",
        image: "/images/gear/keyboard.webp",
        wave: true,
        wide: true,
        imageAlt: "AULA F75 keyboard in Cyber Night Sky, dark keycaps with pink and blue legends and a volume knob.",
      },
      {
        name: "Monitor light bar",
        spec: "Clip-on screen light",
        image: "/images/gear/light-bar.webp",
        imageAlt: "Black monitor light bar with its clip.",
      },
    ],
  },
  {
    title: "Desk",
    items: [
      {
        name: "IKEA KALLAX desk",
        spec: "Desk + KALLAX shelf",
        image: "/images/gear/desk.webp",
        wide: true,
        imageAlt: "IKEA desk joined to a KALLAX shelf unit, white-stained oak.",
      },
      {
        name: "Cordless lamp",
        spec: "Cordless · rechargeable",
        image: "/images/gear/lamp-off.webp",
        themeLamp: true,
        imageAlt: "Slim black cordless table lamp with a round head.",
      },
    ],
  },
];
