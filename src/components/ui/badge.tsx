import type { HTMLAttributes, ReactNode } from "react";

type BadgeTone = "ink" | "yellow" | "pink" | "blue" | "green" | "purple" | "muted";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  tone?: BadgeTone;
};

export function Badge({ children, tone = "ink", className = "", ...props }: BadgeProps) {
  return (
    <span className={`nb-badge nb-badge--${tone} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}
