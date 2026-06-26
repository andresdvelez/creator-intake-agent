interface FitScoreBarProps {
  score: number;
}

function getScoreInfo(score: number): { color: string; label: string } {
  if (score >= 8) return { color: "#22c55e", label: "Strong fit" };
  if (score >= 6) return { color: "#ff5a00", label: "Good fit" };
  if (score >= 4) return { color: "#f59e0b", label: "Partial fit" };
  return { color: "#ef4444", label: "Poor fit" };
}

export function FitScoreBar({ score }: FitScoreBarProps) {
  const { color, label } = getScoreInfo(score);
  const percentage = score * 10;

  return (
    <div className="space-y-2.5">
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-4xl sm:text-5xl font-black leading-none"
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-base text-gray-300 font-normal">/10</span>
        </div>
        <span className="text-sm font-semibold pb-1" style={{ color }}>
          {label}
        </span>
      </div>

      <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}
