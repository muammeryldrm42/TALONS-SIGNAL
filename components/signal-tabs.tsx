const tabs = ["Mindshare", "Gainers", "Losers", "Projects"];

export function SignalTabs() {
  return (
    <div className="flex items-center gap-6 overflow-x-auto border-b border-white/10 px-1 pb-2">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          className={`whitespace-nowrap pb-2 text-xl font-semibold tracking-tight ${
            index === 0 ? "border-b-2 border-purple text-purple" : "text-white/80"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
