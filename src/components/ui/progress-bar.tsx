type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
};

export function ProgressBar({ value, max = 100, label = "Progres" }: ProgressBarProps) {
  const safeMax = max > 0 ? max : 100;
  const safeValue = Math.min(Math.max(value, 0), safeMax);
  const percent = Math.round((safeValue / safeMax) * 100);

  return (
    <div className="progress-stack">
      <div className="progress-copy">
        <span>{label}</span>
        <strong>{percent}%</strong>
      </div>
      <div
        aria-label={label}
        aria-valuemax={safeMax}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        className="progress-track"
        role="progressbar"
      >
        <span className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
