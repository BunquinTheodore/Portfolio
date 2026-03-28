type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const textAlignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <header className={`mb-12 max-w-3xl ${textAlignment}`}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </header>
  );
}
