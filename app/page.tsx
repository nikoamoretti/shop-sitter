import Link from "next/link";
import { LeadForm } from "@/components/lead-form";
import { ShopWaitlistForm } from "@/components/shop-waitlist-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PRODUCT_NAME, PRODUCT_PRICE, PRODUCT_TAGLINE } from "@/lib/brand";
export default function HomePage() {
return (
<div>
<div className="lamp-line" aria-hidden />
<section className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
<div className="space-y-5">
<p className="closed-sign">Closed · after six</p>
<h1 className="max-w-xl text-[2.05rem] leading-[1.15] text-foreground sm:text-5xl">
You lock the door at six. The notes keep coming.
</h1>
<p className="max-w-lg text-[1.05rem] leading-7 text-muted-foreground sm:leading-8">
{PRODUCT_TAGLINE} Forward mail or embed the widget. Bots draft a
polite hold. Every lead lands on a paper log you read at eight.
</p>
<div className="flex flex-wrap gap-3">
<Button asChild size="lg">
<Link href="/demo">See a demo</Link>
</Button>
<Button asChild size="lg" variant="outline">
<a href="#test-message">Leave a test message</a>
</Button>
</div>
</div>
<Card className="paper-card relative">
<span className="hero-stamp" aria-hidden>
Closed
</span>
<CardHeader className="pb-3">
<p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-[var(--ink-faint)]">
Thursday, 9:14 p.m.
</p>
<CardTitle>A note under the door</CardTitle>
</CardHeader>
<CardContent className="space-y-3 text-sm leading-6 text-[var(--ink-soft)]">
<p>The shop is closed. Someone writes anyway.</p>
<p className="rounded-sm border border-[var(--line)] bg-[var(--input)] px-3 py-2 text-[var(--ink)]">
“Can someone see me first thing? I think I cracked a filling.”
</p>
<p>
{PRODUCT_NAME} drafts a polite hold and logs the lead — name,
phone, want, time — for morning. A reply goes out only once mail
is wired.
</p>
</CardContent>
</Card>
</section>
<section className="border-y border-[var(--dusk-mid)] bg-black/25">
<div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-3">
<Step
n="1"
title="Forward or embed"
body="The shop forwards after-hours mail, or drops the Shop Sitter widget on the site."
/>
<Step
n="2"
title="Bots sit the shop"
body="When a customer writes at nine, bots draft a calm hold — not silence, not a diagnosis."
/>
<Step
n="3"
title="Morning log"
body="Every lead is listed with name, phone, what they want, and when they wrote."
/>
</div>
</section>
<section className="mx-auto grid max-w-5xl gap-6 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2">
<div className="space-y-4">
<h2 className="text-3xl text-foreground">One shop, one price</h2>
<p className="max-w-md text-muted-foreground">
One inbox and the morning log. {PRODUCT_PRICE}, display only —
checkout is not wired. No charge from this page.
</p>
<p className="font-serif text-4xl text-[var(--lamp-bright)]">
{PRODUCT_PRICE}
</p>
</div>
<Card id="raise-hand" className="paper-card">
<CardHeader className="pb-3">
<CardTitle>Got a shop?</CardTitle>
<p className="text-sm text-[var(--ink-soft)]">
Raise a hand. Shop name, city, and a way to reach you. Not a
checkout.
</p>
</CardHeader>
<CardContent>
<ShopWaitlistForm />
</CardContent>
</Card>
</section>
<section className="mx-auto max-w-5xl px-4 pb-14 sm:px-6 sm:pb-20">
<Card id="test-message" className="paper-card">
<CardHeader className="pb-3">
<CardTitle>Leave a test message</CardTitle>
<p className="text-sm text-[var(--ink-soft)]">
Try the widget the way a customer would after close.
</p>
</CardHeader>
<CardContent>
<LeadForm />
</CardContent>
</Card>
</section>
</div>
);
}
function Step({ n, title, body }: { n: string; title: string; body: string }) {
return (
<div className="space-y-2">
<p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--lamp)]">
0{n}
</p>
<h2 className="text-2xl text-foreground">{title}</h2>
<p className="text-sm leading-6 text-muted-foreground sm:text-[0.95rem]">{body}</p>
</div>
);
}
