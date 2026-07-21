import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  onNavy = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "left" | "center";
  onNavy?: boolean;
}) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col gap-4 ${centered ? "items-center text-center mx-auto max-w-2xl" : "max-w-2xl"}`}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={`text-3xl leading-[1.12] sm:text-4xl md:text-[2.7rem] ${
          onNavy ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      <span className="gold-rule" />
      {intro && (
        <p
          className={`text-[1.02rem] leading-relaxed ${
            onNavy ? "text-on-navy-muted" : "text-body"
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
