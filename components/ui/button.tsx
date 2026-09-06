import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
const buttonVariants = cva(
"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50",
{
variants: {
variant: {
default: "bg-primary text-primary-foreground hover:bg-primary/90",
outline:
"border border-[color-mix(in_srgb,var(--paper)_45%,transparent)] bg-transparent text-foreground hover:bg-white/5",
ghost: "hover:bg-white/5 text-foreground",
secondary: "bg-card text-card-foreground hover:bg-[var(--paper-edge)]",
},
size: {
default: "h-10 px-4 py-2",
lg: "h-12 px-6 text-base",
sm: "h-8 px-3 text-xs",
},
},
defaultVariants: {
variant: "default",
size: "default",
},
},
);
function Button({
className,
variant,
size,
asChild = false,
...props
}: React.ComponentProps<"button"> &
VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
const Comp = asChild ? Slot : "button";
return (
<Comp
data-slot="button"
className={cn(buttonVariants({ variant, size, className }))}
{...props}
/>
);
}
export { Button, buttonVariants };
