import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/brand";
export function SiteFooter() {
return (
<footer className="mt-auto border-t border-[var(--dusk-mid)] bg-black/20">
<div className="lamp-line" aria-hidden />
<div className="mx-auto max-w-5xl px-4 py-7 text-sm leading-6 text-muted-foreground sm:px-6">
<p>
Product of {PRODUCT_NAME} · not a law firm or medical answering
service.
</p>
<p className="mt-1">The log opens at eight. No mailbox on this page.</p>
<p className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
<Link href="/blog" className="hover:text-foreground">
Blog
</Link>
<Link href="/faq" className="hover:text-foreground">
FAQ
</Link>
<Link href="/demo" className="hover:text-foreground">
Demo
</Link>
</p>
</div>
</footer>
);
}
