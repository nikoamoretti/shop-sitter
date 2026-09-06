import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { PRODUCT_NAME } from "@/lib/brand";
export const metadata: Metadata = {
title: "Notes for local shops",
description:
"Shop Sitter notes on after-hours inboxes, weekend website inquiries, and customer messages after the door locks.",
};
export default function BlogIndexPage() {
return (
<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
<p className="closed-sign">Notes · after close</p>
<h1 className="mt-4 text-[2rem] leading-tight sm:text-4xl">Notes</h1>
<p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
Short pieces for local shops that still get notes after six. Not a
mailbox. Not a checkout. {PRODUCT_NAME} drafts a polite hold and
leaves the lead on a morning log.
</p>
<ol className="mt-8 space-y-4">
{BLOG_POSTS.map((post, index) => (
<li key={post.slug}>
<Link
href={`/blog/${post.slug}`}
className="paper-card block rounded-sm px-5 py-4 transition-colors hover:bg-[var(--paper)]"
>
<p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--ink-faint)]">
0{index + 1} · {post.dateLabel}
</p>
<h2 className="mt-1 text-xl text-[var(--ink)]">{post.title}</h2>
<p className="mt-1 text-sm leading-6 text-[var(--ink-soft)]">
{post.description}
</p>
</Link>
</li>
))}
</ol>
</div>
);
}
