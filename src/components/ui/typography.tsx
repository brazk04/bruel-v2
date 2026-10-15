import type { ComponentProps } from "react";

export function Eyebrow({ className = "", ...props }: ComponentProps<"span">) {
  return <span className={`eyebrow ${className}`} {...props} />;
}

export function Tag({ className = "", ...props }: ComponentProps<"span">) {
  return <span className={`tag ${className}`} {...props} />;
}
