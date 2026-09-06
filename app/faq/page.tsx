import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT_NAME, PRODUCT_PRICE } from "@/lib/brand";
export const metadata: Metadata = {
title: "Questions from closed shops",
description:
"Short answers on after-hours inboxes, weekend website inquiries, and customer messages after a local shop locks the door.",
};
const FAQS = [
{
q: "What is an after-hours inbox for a small business?",
a: "A place to catch notes after the door locks — name, phone, what they want, and when they wrote. Bots draft a polite hold. The shop reads a morning log at eight. It is not a night desk and not a promise the shop is open.",
},
{
q: "Do you email customers right now?",
a: "Not until mail is wired. The public widget logs the note. Success copy says logged, not sent, when mail is off. A reply goes out only once mail is on.",
},
{
q: "What happens to weekend website inquiries?",
a: "Saturday and Sunday form notes should land on the same paper list as Thursday night. Monday at eight starts with those lines so they are not lost in a thread.",
},
{
q: "Who is this for?",
a: "Local shops: dental, salon, bakery, glass, storefront. Fictional examples on this site are Maple Street Dental, Harbor Pane Glass, and Willow Oven Bakery. Not a law firm or medical answering service.",
},
{
q: "What does the morning log show?",
a: "Name, phone, want, time. Dated like a shopkeeper’s 8 a.m. book. Session notes stay in this browser. Nothing is stored in a database.",
},
{
q: "How much is Shop Sitter?",
a: `${PRODUCT_PRICE}, display only. Checkout is not wired. No charge from these pages. Shops can raise a hand with shop name, city, and a way to reach them.`,
},
{
q: "Can I try it without a real mailbox?",
a: "Yes. Leave a test message on the widget, or read the Maple Street Dental demo. The disclaimer sits above the fields: local demo, nothing emailed until mail is wired.",
},
{
q: "Where are the longer notes?",
a: "The notes index lists after-hours inboxes, weekend inquiries, and after-hours customer messages for local shops.",
},
];
export default function FaqPage() {
return (
<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
<p className="closed-sign">Closed · questions</p>
<h1 className="mt-4 text-[2rem] leading-tight sm:text-4xl">Questions</h1>
<p className="mt-3 text-sm leading-6 text-muted-foreground">
Same intents as the notes. Honest about mail. {PRODUCT_NAME} drafts
a hold and keeps the log.
</p>
<dl className="mt-8 space-y-5">
{FAQS.map((item) => (
<div key={item.q} className="paper-card rounded-sm px-5 py-4">
<dt className="font-serif text-lg text-[var(--ink)]">{item.q}</dt>
<dd className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">{item.a}</dd>
</div>
))}
</dl>
<p className="mt-8 text-sm text-muted-foreground">
<Link href="/blog" className="underline decoration-[var(--line)] underline-offset-4">
Notes
</Link>
{" · "}
<Link href="/demo" className="underline decoration-[var(--line)] underline-offset-4">
Demo
</Link>
{" · "}
<Link href="/widget" className="underline decoration-[var(--line)] underline-offset-4">
Widget
</Link>
</p>
</div>
);
}
