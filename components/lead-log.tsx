"use client";
import { useSyncExternalStore } from "react";
import {
getServerSessionLeads,
readSessionLeads,
subscribeSessionLeads,
} from "@/lib/lead-session";
import type { StoredLead } from "@/lib/lead-types";
export function LeadLog({ samples }: { samples: StoredLead[] }) {
const sessionLeads = useSyncExternalStore(
subscribeSessionLeads,
readSessionLeads,
getServerSessionLeads,
);
const leads = [...sessionLeads, ...samples].map(normalizeLead);
if (leads.length === 0) {
return (
<div className="log-sheet rounded-sm px-5 py-6">
<div className="border-b border-dashed border-[#c4ad82] pb-3">
<p className="font-serif text-lg text-[var(--ink)]">
Friday morning · Aug 29, 2026
</p>
<p className="text-[0.68rem] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
Opened 8:00 a.m.
</p>
</div>
<p className="mt-4 text-[var(--ink-soft)]">
The log is empty. The door is still locked.
</p>
<div className="log-empty-lines mt-4" aria-hidden />
</div>
);
}
return (
<div className="log-sheet rounded-sm">
<div className="border-b border-dashed border-[#c4ad82] px-4 py-3 sm:px-5">
<div className="flex flex-wrap items-baseline justify-between gap-2">
<p className="font-serif text-lg text-[var(--ink)]">
Friday morning · Aug 29, 2026
</p>
<p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
Opened 8:00 a.m.
</p>
</div>
<p className="mt-1 text-[0.68rem] uppercase tracking-[0.14em] text-[var(--ink-faint)]">
Name · phone · want · time
</p>
</div>
<div className="log-sheet-body flex flex-1 flex-col">
<div className="hidden grid-cols-[minmax(6.5rem,1fr)_minmax(6.5rem,0.85fr)_minmax(10rem,1.7fr)_minmax(5rem,0.7fr)] gap-2 px-5 py-1.5 text-[0.65rem] uppercase tracking-[0.12em] text-[var(--ink-faint)] sm:grid">
<span>Name</span>
<span>Phone</span>
<span>Want</span>
<span>Time</span>
</div>
<ol>
{leads.map((lead) => (
<li key={lead.id} className="log-row px-4 py-1.5 sm:px-5">
<div className="grid gap-0.5 text-[0.92rem] leading-snug text-[var(--ink)] sm:grid-cols-[minmax(6.5rem,1fr)_minmax(6.5rem,0.85fr)_minmax(10rem,1.7fr)_minmax(5rem,0.7fr)] sm:items-baseline sm:gap-2">
<p>
<span className="mr-2 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--ink-faint)] sm:hidden">
Name
</span>
{lead.name}
{lead.type === "shop" ? (
<span className="ml-1.5 text-[0.6rem] uppercase tracking-[0.12em] text-[var(--ink-faint)]">
waitlist
</span>
) : null}
</p>
<p>
<span className="mr-2 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--ink-faint)] sm:hidden">
{lead.type === "shop" ? "City" : "Phone"}
</span>
{lead.type === "shop" ? lead.city || "—" : lead.phone || "—"}
</p>
<p>
<span className="mr-2 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--ink-faint)] sm:hidden">
Want
</span>
{lead.want}
</p>
<p className="text-[var(--ink-soft)]">
<span className="mr-2 text-[0.62rem] uppercase tracking-[0.12em] text-[var(--ink-faint)] sm:hidden">
Time
</span>
{formatTime(lead.time)}
</p>
</div>
</li>
))}
</ol>
<div className="log-empty-lines" aria-hidden />
</div>
</div>
);
}
function normalizeLead(lead: StoredLead): StoredLead {
return {
...lead,
type: lead.type === "shop" ? "shop" : "customer",
};
}
function formatTime(value: string) {
const date = new Date(value);
if (Number.isNaN(date.getTime())) return value;
return new Intl.DateTimeFormat("en-US", {
weekday: "short",
hour: "numeric",
minute: "2-digit",
timeZone: "America/New_York",
}).format(date);
}
