"use client";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { writeSessionLead } from "@/lib/lead-session";
import type { StoredLead } from "@/lib/lead-types";
import { shopWaitlistSuccessCopy } from "@/lib/widget-copy";
type FormState =
| { status: "idle" }
| { status: "submitting" }
| { status: "error"; message: string }
| { status: "success"; emailed: boolean };
export function ShopWaitlistForm() {
const [state, setState] = useState<FormState>({ status: "idle" });
const [hydrated, setHydrated] = useState(false);
useEffect(() => {
setHydrated(true);
}, []);
async function onSubmit(event: FormEvent<HTMLFormElement>) {
event.preventDefault();
event.stopPropagation();
if (!hydrated || state.status === "submitting") return;
const form = event.currentTarget;
const data = new FormData(form);
setState({ status: "submitting" });
const payload = {
type: "shop",
name: String(data.get("name") ?? ""),
city: String(data.get("city") ?? ""),
email: String(data.get("email") ?? ""),
website: String(data.get("website") ?? ""),
};
try {
const response = await fetch("/api/lead", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload),
});
const json = (await response.json()) as {
ok?: boolean;
emailed?: boolean;
error?: string;
};
if (!response.ok || !json.ok) {
setState({
status: "error",
message: json.error ?? "Could not log that. Try again.",
});
return;
}
const sessionLead: StoredLead = {
id: `session-shop-${Date.now()}`,
type: "shop",
name: payload.name.trim(),
phone: "",
email: payload.email.trim(),
city: payload.city.trim(),
want: `Shop waitlist — ${payload.city.trim()}`,
time: new Date().toISOString(),
shop: payload.name.trim(),
source: "session",
};
writeSessionLead(sessionLead);
form.reset();
setState({ status: "success", emailed: json.emailed === true });
} catch {
setState({
status: "error",
message: "Could not reach the shop. Check the connection and try again.",
});
}
}
if (state.status === "success") {
return (
<div
className="space-y-2 rounded-sm border-2 border-[var(--ok,#2f6b45)] bg-[#e7f0e4] px-3 py-3"
role="status"
aria-live="polite"
data-testid="shop-waitlist-success"
>
<p className="font-serif text-xl text-[var(--ink)]">Hand raised.</p>
<p className="text-sm font-medium leading-relaxed text-[var(--ink)]">
{shopWaitlistSuccessCopy(state.emailed)}
</p>
</div>
);
}
return (
<form onSubmit={onSubmit} className="relative grid gap-3.5" noValidate>
<div className="grid gap-1.5">
<Label htmlFor="shop-name">Shop name</Label>
<Input
id="shop-name"
name="name"
autoComplete="organization"
required
placeholder="Harbor Pane Glass"
/>
</div>
<div className="grid gap-3.5 sm:grid-cols-2">
<div className="grid gap-1.5">
<Label htmlFor="shop-city">City</Label>
<Input
id="shop-city"
name="city"
autoComplete="address-level2"
required
placeholder="Portland, ME"
/>
</div>
<div className="grid gap-1.5">
<Label htmlFor="shop-email">Email</Label>
<Input
id="shop-email"
name="email"
type="email"
autoComplete="email"
required
placeholder="you@theshop.com"
/>
</div>
</div>
<div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
<Label htmlFor="shop-website">Website</Label>
<Input id="shop-website" name="website" tabIndex={-1} autoComplete="off" />
</div>
{state.status === "error" ? (
<p className="text-sm text-destructive" role="alert">
{state.message}
</p>
) : null}
<Button type="submit" disabled={!hydrated || state.status === "submitting"}>
{!hydrated
? "Preparing…"
: state.status === "submitting"
? "Logging…"
: "Raise a hand"}
</Button>
</form>
);
}
