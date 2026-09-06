import type { Metadata } from "next";
import { LeadForm } from "@/components/lead-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export const metadata: Metadata = {
title: "Widget",
description: "Shop Sitter contact widget for after-hours notes.",
};
export default function WidgetPage() {
return (
<div className="mx-auto max-w-md px-4 py-10 sm:px-6 sm:py-12">
<p className="closed-sign">After hours</p>
<h1 className="mt-4 text-[1.85rem] leading-tight">Leave a note</h1>
<p className="mt-2 text-sm leading-6 text-muted-foreground">
Name, email, phone, and what you need. Success copy stays honest: if
mail is off, the note is logged — not emailed.
</p>
<Card className="paper-card mt-6">
<CardHeader className="pb-3">
<CardTitle>Shop Sitter widget</CardTitle>
</CardHeader>
<CardContent>
<LeadForm compact />
</CardContent>
</Card>
</div>
);
}
