import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors duration-kn-base ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        /* Default: accent color for primary badges */
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/85",
        /* Secondary: neutral background */
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        /* Destructive: same as accent */
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/85",
        /* Success: muted green */
        success: "border-transparent bg-success text-success-foreground hover:bg-success/85",
        /* Warning: muted amber/brown */
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/85",
        /* Outline: border only */
        outline: "text-foreground border-border bg-transparent",
        /* Muted: subtle gray */
        muted: "border-transparent bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };