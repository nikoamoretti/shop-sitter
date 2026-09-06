import * as React from "react";
import { cn } from "@/lib/utils";
function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
return (
<textarea
data-slot="textarea"
className={cn(
"flex min-h-28 w-full rounded-md border border-border bg-input px-3 py-2 text-sm text-card-foreground shadow-sm placeholder:text-[var(--ink-faint)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
className,
)}
{...props}
/>
);
}
export { Textarea };
