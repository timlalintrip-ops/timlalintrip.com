import type { SceneVariant } from "@/content/media";

const skyClasses: Record<SceneVariant, string> = {
  coast: "bg-linear-to-b from-scene-sky-high to-scene-sky",
  dunes: "bg-linear-to-b from-scene-sky-high to-scene-sky",
  tracks: "bg-linear-to-b from-scene-sky-high to-scene-sky",
  caravan: "bg-linear-to-b from-scene-sky-high to-scene-sky",
  sunset: "bg-linear-to-b from-scene-dusk via-scene-dune-3 to-scene-dune-2",
  canyon: "bg-linear-to-b from-scene-sky to-scene-sun",
  night: "bg-linear-to-b from-charcoal to-scene-night",
};

const STARS: [number, number, number][] = [
  [80, 90, 1.6], [190, 210, 1.2], [260, 60, 2], [410, 140, 1.3], [520, 50, 1.5],
  [640, 190, 1.1], [720, 80, 1.8], [840, 260, 1.2], [1060, 90, 1.6], [1140, 230, 1.3],
  [330, 300, 1], [600, 320, 1.2], [1000, 320, 1], [130, 360, 1.1], [760, 380, 0.9],
];

function DuneLayers() {
  return (
    <>
      <path className="fill-scene-dune-1" d="M0 430C220 360 420 360 640 420C820 470 1000 400 1200 380V800H0Z" />
      <path className="fill-scene-dune-2" d="M0 540C180 480 360 470 520 520C700 580 880 500 1200 520V800H0Z" />
      <path
        className="fill-none stroke-scene-dune-4/40"
        strokeWidth="2"
        d="M520 520C700 580 880 500 1200 520"
      />
      <path className="fill-scene-dune-3" d="M0 660C240 600 420 610 620 660C820 710 1000 640 1200 650V800H0Z" />
    </>
  );
}

function SceneShapes({ scene }: { scene: SceneVariant }) {
  switch (scene) {
    case "coast":
      return (
        <>
          <circle className="fill-scene-sun" cx="880" cy="300" r="70" />
          <rect className="fill-scene-sea" x="0" y="430" width="1200" height="370" />
          <path
            className="fill-none stroke-white/30"
            strokeWidth="2"
            d="M760 500H1200M840 540H1200M920 585H1200M980 630H1200"
          />
          <path className="fill-scene-dune-1" d="M0 420C180 380 360 380 520 430C640 468 760 540 900 600L1000 800H0Z" />
          <path className="fill-scene-dune-2" d="M0 520C160 470 320 480 460 540C580 590 700 660 820 800H0Z" />
          <path className="fill-scene-dune-3" d="M0 640C120 600 260 610 380 680C450 720 500 760 540 800H0Z" />
        </>
      );
    case "dunes":
      return (
        <>
          <circle className="fill-scene-sun" cx="300" cy="230" r="60" />
          <DuneLayers />
        </>
      );
    case "tracks":
      return (
        <>
          <circle className="fill-scene-sun" cx="940" cy="200" r="54" />
          <DuneLayers />
          <path
            className="fill-none stroke-scene-dune-4/70"
            strokeWidth="4"
            strokeDasharray="3 11"
            strokeLinecap="round"
            d="M60 800C280 660 520 610 760 575S1080 520 1200 500"
          />
          <path
            className="fill-none stroke-scene-dune-4/70"
            strokeWidth="4"
            strokeDasharray="3 11"
            strokeLinecap="round"
            d="M100 800C310 676 545 628 776 594S1090 541 1200 522"
          />
        </>
      );
    case "caravan":
      return (
        <>
          <circle className="fill-scene-sun" cx="220" cy="210" r="58" />
          <DuneLayers />
          <path
            className="fill-none stroke-scene-dune-4/60"
            strokeWidth="6"
            strokeDasharray="1 22"
            strokeLinecap="round"
            d="M1200 610C1000 600 860 640 700 700S380 780 240 800"
          />
        </>
      );
    case "sunset":
      return (
        <>
          <circle className="fill-scene-sun/90" cx="600" cy="480" r="130" />
          <path className="fill-scene-dune-4" d="M0 500C200 440 420 450 620 520C800 580 1000 500 1200 480V800H0Z" />
          <path className="fill-scene-dusk" d="M0 620C220 570 440 590 640 640C860 690 1020 620 1200 610V800H0Z" />
          <path className="fill-charcoal/80" d="M0 730C260 690 520 700 760 740C940 770 1080 740 1200 730V800H0Z" />
        </>
      );
    case "canyon":
      return (
        <>
          <path className="fill-scene-dune-2" d="M380 800L460 620H760L800 800Z" />
          <path className="fill-scene-rock-1" d="M0 0H420L380 160L440 300L400 480L470 640L430 800H0Z" />
          <path className="fill-scene-rock-2" d="M1200 0H760L800 180L740 340L800 520L730 680L780 800H1200Z" />
          <path
            className="fill-none stroke-scene-rock-2/50"
            strokeWidth="3"
            d="M0 120H395M0 260H425M0 420H415M0 580H450M0 720H445"
          />
          <path
            className="fill-none stroke-charcoal/25"
            strokeWidth="3"
            d="M790 100H1200M770 270H1200M780 450H1200M760 610H1200M760 740H1200"
          />
        </>
      );
    case "night":
      return (
        <>
          {STARS.map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} className="fill-white/70" cx={cx} cy={cy} r={r} />
          ))}
          <circle className="fill-scene-sun" cx="950" cy="170" r="34" />
          <path className="fill-charcoal-line" d="M0 520C220 460 420 470 620 520C820 570 1000 500 1200 490V800H0Z" />
          <circle className="fill-orange/20" cx="380" cy="650" r="110" />
          <circle className="fill-orange/40" cx="380" cy="650" r="40" />
          <circle className="fill-scene-sun" cx="380" cy="650" r="8" />
          <path className="fill-charcoal-soft" d="M0 680C240 640 460 660 680 700C880 735 1040 700 1200 690V800H0Z" />
        </>
      );
  }
}

type ScenePlaceholderProps = {
  scene: SceneVariant;
  brief?: string;
  showLabel?: boolean;
};

/**
 * Illustrated stand-in for photography that has not been supplied yet.
 * It is decorative and visibly labelled so it is never mistaken for a photo.
 */
export function ScenePlaceholder({ scene, brief, showLabel = true }: ScenePlaceholderProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${skyClasses[scene]}`} aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <SceneShapes scene={scene} />
      </svg>
      {showLabel && (
        <span
          className="absolute right-3 bottom-3 max-w-[calc(100%-1.5rem)] truncate bg-charcoal/75 px-2 py-1 text-[0.625rem] font-medium tracking-[0.14em] text-white/85 uppercase"
          title={brief}
        >
          Placeholder image{brief ? ` · ${brief}` : ""}
        </span>
      )}
    </div>
  );
}
