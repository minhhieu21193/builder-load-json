"use client";

type Section = { type: string; [key: string]: any };

interface Props {
  title?: string;
  config?: any;
}

export default function DynamicSection({ title, config }: Props) {
  return (
    <section className="p-6 border rounded-xl space-y-4">
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {config?.heroBanner && (
        <div>
          <img
            src={config.heroBanner.image}
            alt="hero"
            className="rounded-lg"
          />
          <h3 className="text-lg mt-2 font-medium">
            {config.heroBanner.headline}
          </h3>
        </div>
      )}
      {Array.isArray(config?.sections) &&
        config.sections.map((s: Section, i: number) => (
          <div key={i} className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm opacity-70">Type: {s.type}</p>
            <pre className="text-xs overflow-auto">
              {JSON.stringify(s, null, 2)}
            </pre>
          </div>
        ))}
    </section>
  );
}
