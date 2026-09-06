import Link from "next/link";
import type { ReactNode } from "react";
import type { BlogPost } from "@/lib/blog-posts";
import { PRODUCT_NAME, PRODUCT_PRICE } from "@/lib/brand";
export function BlogArticle({
post,
children,
}: {
post: BlogPost;
children: ReactNode;
}) {
return (
<article className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
<p className="closed-sign">Notes · after close</p>
<p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
{post.dateLabel} · {PRODUCT_NAME}
</p>
<h1 className="mt-2 text-[2rem] leading-tight sm:text-4xl">{post.title}</h1>
<p className="mt-3 text-sm leading-6 text-muted-foreground">
Written for local shops — dental, salon, bakery, glass, storefront.
</p>
<div className="paper-card mt-8 rounded-sm px-5 py-6 text-[1.02rem] leading-7 text-[var(--ink)] sm:px-7 sm:py-8">
<div className="blog-prose">{children}</div>
<aside className="mt-8 border-t border-dashed border-[var(--line)] pt-5 text-sm leading-6 text-[var(--ink-soft)]">
<p>
{PRODUCT_NAME} is {PRODUCT_PRICE}, display only — checkout is not
wired. Bots draft a polite hold and leave the lead on a morning
log. A reply goes out only once mail is wired.
</p>
<p className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
<Link href="/" className="underline decoration-[var(--line)] underline-offset-4">
Home
</Link>
<Link href="/demo" className="underline decoration-[var(--line)] underline-offset-4">
Maple Street Dental demo
</Link>
<Link href="/widget" className="underline decoration-[var(--line)] underline-offset-4">
Test widget
</Link>
<Link href="/blog" className="underline decoration-[var(--line)] underline-offset-4">
All notes
</Link>
</p>
</aside>
</div>
</article>
);
}
