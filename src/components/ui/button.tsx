import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-accent-blue text-white hover:bg-accent-blue/90 shadow-lg shadow-accent-blue/30 hover:shadow-xl hover:shadow-accent-blue/40 active:scale-[0.98] transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md active:scale-[0.98]",
        outline: "border border-border/50 bg-background hover:bg-accent-blue/5 hover:text-accent-blue hover:border-accent-blue/50 transition-all duration-300",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent-blue/10 hover:text-accent-blue transition-all duration-300",
        link: "text-accent-blue underline-offset-4 hover:underline hover:text-accent-indigo transition-colors",
      },
      size: {
        default: "h-8 px-3 py-1.5 text-sm",
        sm: "h-7 rounded-lg px-2.5 text-xs",
        lg: "h-9 rounded-lg px-5 text-sm",
        icon: "h-8 w-8",
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
