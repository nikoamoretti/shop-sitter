"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { writeSessionLead } from "@/lib/lead-session";
import type { StoredLead } from "@/lib/lead-types";
import { WIDGET_DEMO_DISCLAIMER, widgetSuccessCopy } from "@/lib/widget-copy";
type FormState =
| { status: "idle" }
| { status: "submitting" }
| { status: "error"; message: string }
| { status: "success"; emailed: boolean };
const empty = { name: "", email: "", phone: "", message: "", website: "" };
export function LeadForm({ compact = false }: { compact?: boolean }) {
const [fields, setFields] = useState(empty);
const [state, setState] = useState<FormState>({ status: "idle" });
const [hydrated, setHydrated] = useState(false);
useEffect(() => {
setHydrated(true);
}, []);
async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
event.preventDefault();
event.stopPropagation();
if (!hydrated || state.status === "submitting") return;
setState({ status: "submitting" });
try {
const response = await fetch("/api/lead", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ ...fields, type: "customer" }),
});
const data = (await response.json()) as {
ok?: boolean;
emailed?: boolean;
error?: string;
};
if (!response.ok || !data.ok) {
setState({
status: "error",
message: data.error ?? "Could not log that note. Try again.",
});
return;
}
const sessionLead: StoredLead = {
id: `session-${Date.now()}`,
type: "customer",
name: fields.name.trim(),
phone: fields.phone.trim(),
email: fields.email.trim(),
want: fields.message.trim(),
time: new Date().toISOString(),
shop: "This session",
source: "session",
};
writeSessionLead(sessionLead);
setFields(empty);
setState({ status: "success", emailed: data.emailed === true });
} catch {
setState({
status: "error",
message: "Network error. The note was not logged.",
});
}
}
if (state.status === "success") {
return (
<div
className="space-y-3 rounded-sm border-2 border-[var(--ok,#2f6b45)] bg-[#e7f0e4] px-4 py-4"
role="status"
aria-live="polite"
data-testid="lead-success"
>
<p className="font-serif text-2xl text-[var(--ink)]">Logged.</p>
<p className="text-sm font-medium leading-relaxed text-[var(--ink)]">
{widgetSuccessCopy(state.emailed)}
</p>
<Button
type="button"
variant="outline"
className="border-[var(--ink-soft)] text-[var(--ink)] hover:bg-[var(--paper)]"
onClick={() => setState({ status: "idle" })}
>
Leave another note
</Button>
</div>
);
}
return (
<form
onSubmit={onSubmit}
className="relative grid gap-3.5"
noValidate
>
<p
className="rounded-sm border border-[var(--line)] bg-[var(--input)] px-3 py-2.5 text-sm leading-relaxed text-[var(--ink-soft)]"
role="note"
>
{WIDGET_DEMO_DISCLAIMER}
</p>
<div className="grid gap-1.5">
<Label htmlFor="lead-name">Name</Label>
<Input
id="lead-name"
name="name"
autoComplete="name"
required
value={fields.name}
onChange={(event) => setFields((f) => ({ ...f, name: event.target.value }))}
/>
</div>
<div className={compact ? "grid gap-3.5" : "grid gap-3.5 sm:grid-cols-2"}>
<div className="grid gap-1.5">
<Label htmlFor="lead-email">Email</Label>
<Input
id="lead-email"
name="email"
type="email"
autoComplete="email"
required
value={fields.email}
onChange={(event) =>
setFields((f) => ({ ...f, email: event.target.value }))
}
/>
</div>
<div className="grid gap-1.5">
<Label htmlFor="lead-phone">Phone</Label>
<Input
id="lead-phone"
name="phone"
type="tel"
autoComplete="tel"
required
value={fields.phone}
onChange={(event) =>
setFields((f) => ({ ...f, phone: event.target.value }))
}
/>
</div>
</div>
<div className="grid gap-1.5">
<Label htmlFor="lead-message">What do you need?</Label>
<Textarea
id="lead-message"
name="message"
required
value={fields.message}
onChange={(event) =>
setFields((f) => ({ ...f, message: event.target.value }))
}
/>
</div>
<div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
<Label htmlFor="lead-website">Website</Label>
<Input
id="lead-website"
name="website"
tabIndex={-1}
autoComplete="off"
value={fields.website}
onChange={(event) =>
setFields((f) => ({ ...f, website: event.target.value }))
}
/>
</div>
{state.status === "error" ? (
<p className="text-sm font-medium text-destructive" role="alert">
{state.message}
</p>
) : null}
<Button
type="submit"
size="lg"
disabled={!hydrated || state.status === "submitting"}
>
{!hydrated
? "Preparing…"
: state.status === "submitting"
? "Logging…"
: "Leave a test message"}
</Button>
</form>
);
}
