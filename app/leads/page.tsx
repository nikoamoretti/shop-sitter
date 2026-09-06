import type { Metadata } from "next";
import sampleLeads from "@/data/sample-leads.json";
import { LeadLog } from "@/components/lead-log";
import type { StoredLead } from "@/lib/lead-types";
export const metadata: Metadata = {
title: "Morning log",
description: "Shop Sitter morning log — name, phone, want, time.",
};
export default function LeadsPage() {
return (
<div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-10">
<div className="mb-5 flex flex-wrap items-end justify-between gap-3">
<div>
<p className="closed-sign">Open · 8:00 a.m.</p>
<h1 className="mt-3 text-[1.85rem] leading-tight sm:text-3xl">
Morning log
</h1>
</div>
<p className="max-w-xs text-right font-mono text-[0.7rem] uppercase leading-5 tracking-[0.12em] text-muted-foreground">
Friday, Aug 29, 2026
<br />
Opened with coffee
</p>
</div>
<p className="mb-4 text-sm text-muted-foreground">
Name, phone, want, time. Browser notes plus samples. No database.
</p>
<div className="logbook flex-1">
<LeadLog samples={sampleLeads as StoredLead[]} />
</div>
</div>
);
}
