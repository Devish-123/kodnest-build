import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-sp-1 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-kn-base ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        /* Primary: accent color for main CTAs */
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        /* Destructive: uses accent (dark red) for destructive actions */
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        /* Outline: neutral border, subtle hover */
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
        /* Secondary: neutral background */
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        /* Ghost: transparent with hover state */
        ghost: "hover:bg-accent hover:text-accent-foreground",
        /* Link: text only with underline */
        link: "text-primary underline-offset-4 hover:underline",
        /* Success: muted green */
        success: "bg-success text-success-foreground hover:bg-success/90",
        /* Warning: muted amber/brown */
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
      },
      size: {
        default: "h-10 px-sp-2 py-sp-1",
        sm: "h-9 rounded-md px-sp-2 text-xs",
        lg: "h-12 rounded-md px-sp-3 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
