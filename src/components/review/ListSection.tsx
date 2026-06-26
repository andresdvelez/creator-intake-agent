interface ListSectionProps {
  title: string;
  items: string[];
}

export function ListSection({ title, items }: ListSectionProps) {
  if (items.length === 0) return null;
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
        {title}
      </p>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-gray-600"
          >
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-300 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
