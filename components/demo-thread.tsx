"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type View = "owner" | "customer";
const LEAD = {
name: "Sam Rivera",
phone: "(555) 014-2281",
want: "Morning slot after a cracked filling",
time: "Thu 9:14 p.m.",
};
export function DemoThread() {
const [view, setView] = useState<View>("owner");
return (
<div className="grid gap-5">
<div className="flex flex-wrap items-center justify-between gap-3">
<p className="text-sm text-muted-foreground">
Maple Street Dental — fictional shop, canned Thursday night.
</p>
<div className="flex rounded-sm border border-[color-mix(in_srgb,var(--paper)_35%,transparent)] p-1">
<Button
type="button"
size="sm"
variant={view === "owner" ? "default" : "ghost"}
onClick={() => setView("owner")}
>
Owner view
</Button>
<Button
type="button"
size="sm"
variant={view === "customer" ? "default" : "ghost"}
onClick={() => setView("customer")}
>
Customer view
</Button>
</div>
</div>
<ThreadMessage
who="Sam Rivera"
when="Thu 9:14 p.m."
kind="inbound"
body={`Hi — I think I cracked a filling on the lower left. The office is closed. Can someone see me first thing tomorrow? I can come at 8. Phone is ${LEAD.phone}.`}
/>
{view === "owner" ? (
<ThreadMessage
who="Draft · Shop Sitter"
when="Thu 9:15 p.m."
kind="draft"
body="Polite hold: thank Sam, confirm we logged a morning request, do not diagnose, point to opening hours. Ready to send."
/>
) : null}
<ThreadMessage
who="Maple Street Dental (after hours)"
when="Thu 9:16 p.m."
kind="sent"
body={`Hi Sam,\n\nThanks for writing after the office closed. We logged your note — cracked filling, asking for the first morning opening.\n\nThe front desk reads this log at 8 a.m. and will call ${LEAD.phone} about an early slot. This is not a medical advice line; if the pain is severe or you have swelling, use emergency care tonight.\n\n— Maple Street Dental`}
/>
{view === "owner" ? (
<Card className="paper-card">
<CardHeader className="pb-3">
<CardTitle>Lead logged</CardTitle>
</CardHeader>
<CardContent className="grid gap-2 text-sm">
<Row label="Name" value={LEAD.name} />
<Row label="Phone" value={LEAD.phone} />
<Row label="Want" value={LEAD.want} />
<Row label="Time" value={LEAD.time} />
</CardContent>
</Card>
) : (
<p className="text-sm text-muted-foreground">
The customer sees the inbound note and the sent reply. The owner also
sees the draft and the morning log card.
</p>
)}
</div>
);
}
function ThreadMessage({
who,
when,
kind,
body,
}: {
who: string;
when: string;
kind: "inbound" | "draft" | "sent";
body: string;
}) {
const label =
kind === "inbound" ? "Inbound" : kind === "draft" ? "Draft" : "Sent reply";
return (
<article className="paper-card rounded-sm p-5">
<div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
<div>
<p className="font-medium text-[var(--ink)]">{who}</p>
<p className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
{label}
</p>
</div>
<time className="text-sm text-[var(--ink-soft)]">{when}</time>
</div>
<p className="whitespace-pre-wrap text-[15px] leading-7 text-[var(--ink)]">{body}</p>
</article>
);
}
function Row({ label, value }: { label: string; value: string }) {
return (
<div className="grid grid-cols-[4.5rem_1fr] gap-3">
<dt className="text-[var(--ink-faint)]">{label}</dt>
<dd className="text-[var(--ink)]">{value}</dd>
</div>
);
}
