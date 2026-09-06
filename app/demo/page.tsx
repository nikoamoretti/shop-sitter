import type { Metadata } from "next";
import { DemoThread } from "@/components/demo-thread";
export const metadata: Metadata = {
title: "Demo — Maple Street Dental",
description: "Shop Sitter demo thread for Maple Street Dental, a fictional shop.",
};
export default function DemoPage() {
return (
<div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
<p className="closed-sign">Closed · Thursday night</p>
<h1 className="mt-4 text-[2rem] leading-tight sm:text-4xl">Maple Street Dental</h1>
<p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
A fictional practice. The door locked at six. At 9:14 a patient wrote
in. Shop Sitter drafts a polite hold and leaves the lead on the
morning log.
</p>
<div className="mt-8">
<DemoThread />
</div>
</div>
);
}
