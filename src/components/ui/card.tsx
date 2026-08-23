import type { HTMLAttributes, ReactNode } from "react";

type CardTone = "paper" | "yellow" | "pink" | "blue" | "green" | "purple" | "dark";

type CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  tone?: CardTone;
  as?: "article" | "section" | "div";
};

export function Card({
  children,
  tone = "paper",
  as: Component = "div",
  className = "",
  ...props
}: CardProps) {
  return (
    <Component className={`nb-card nb-card--${tone} ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}
