const items = ["24H", "7D", "30D"];

export function TimeFilter() {
  return (
    <div className="inline-flex rounded-2xl border border-white/10 bg-white/[0.03] p-1">
      {items.map((item, index) => (
        <button
          key={item}
          className={`rounded-xl px-3 py-2 text-sm font-medium ${
            index === 0 ? "bg-white/10 text-white" : "text-white/60"
          }`}
          type="button"
        >
          {item}
        </button>
      ))}
    </div>
  );
}
