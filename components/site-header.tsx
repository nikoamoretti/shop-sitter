import Link from "next/link";
import { PRODUCT_NAME } from "@/lib/brand";
export function SiteHeader() {
return (
<header className="border-b border-[var(--dusk-mid)] bg-[var(--dusk-deep)]/90 backdrop-blur">
<div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
<Link
href="/"
className="font-serif text-[1.15rem] leading-none tracking-tight text-[var(--lamp-bright)]"
>
{PRODUCT_NAME}
</Link>
<nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm text-muted-foreground">
<Link href="/blog" className="hover:text-foreground">
Blog
</Link>
<Link href="/faq" className="hover:text-foreground">
FAQ
</Link>
<Link href="/demo" className="hover:text-foreground">
Demo
</Link>
<Link href="/leads" className="hover:text-foreground">
Morning log
</Link>
<Link href="/widget" className="hover:text-foreground">
Form
</Link>
</nav>
</div>
</header>
);
}
