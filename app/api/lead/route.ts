import { NextResponse } from "next/server";
import { deliverLeadMail } from "@/lib/agentmail";
import { parseLeadInput } from "@/lib/lead-schema";
export async function POST(request: Request) {
let body: unknown;
try {
body = await request.json();
} catch {
return NextResponse.json(
{ ok: false, error: "Send JSON with the shop or customer fields." },
{ status: 400 },
);
}
const parsed = parseLeadInput((body ?? {}) as Record<string, unknown>);
if (!parsed.ok) {
return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
}
if (parsed.honeypot) {
return NextResponse.json({ ok: true, emailed: false });
}
try {
const mail = await deliverLeadMail(parsed.lead);
return NextResponse.json({
ok: true,
emailed: mail.emailed,
});
} catch (error) {
const detail = error instanceof Error ? error.message : "mail_failed";
console.error("[api/lead] mail error", detail);
return NextResponse.json({ ok: true, emailed: false });
}
}
