import Link from "next/link";
export default function NotFound() {
return (
<div className="mx-auto max-w-lg px-4 py-20 text-center">
<p className="closed-sign">Closed</p>
<h1 className="mt-4 text-3xl">That page is not here</h1>
<p className="mt-3 text-muted-foreground">
Shop Sitter has the home page, notes, questions, the demo thread, the
form, and the morning log.
</p>
<Link href="/" className="mt-6 inline-block text-[var(--lamp)] underline">
Back home
</Link>
</div>
);
}
