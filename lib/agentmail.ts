import { BACKEND_INBOX_ID } from "@/lib/backend-inbox";
import { BACKEND_FROM_NAME, PRODUCT_NAME } from "@/lib/brand";
import type { ValidLead } from "@/lib/lead-schema";
const SEND_URL = `https://api.agentmail.to/v0/inboxes/${encodeURIComponent(BACKEND_INBOX_ID)}/messages/send`;
export type MailResult = {
emailed: boolean;
shopLogged: boolean;
customerReplied: boolean;
};
async function sendFromBackendInbox(apiKey: string, body: {
to: string[];
subject: string;
text: string;
html: string;
}) {
const res = await fetch(SEND_URL, {
method: "POST",
headers: {
Authorization: `Bearer ${apiKey}`,
"Content-Type": "application/json",
},
body: JSON.stringify(body),
});
if (!res.ok) {
const detail = await res.text().catch(() => "");
throw new Error(`AgentMail send failed ${res.status}: ${detail.slice(0, 400)}`);
}
}
function shopLogBodies(lead: ValidLead, receivedAt: string) {
const kind = lead.type === "shop" ? "waitlist" : "customer";
const text = [
`${PRODUCT_NAME} shop log (${kind})`,
"",
`Received: ${receivedAt}`,
`Name: ${lead.name}`,
`Email: ${lead.email}`,
lead.type === "shop" ? `City: ${lead.city}` : `Phone: ${lead.phone}`,
`Want: ${lead.message}`,
].join("\n");
const html = `<p><strong>${PRODUCT_NAME} shop log (${kind})</strong></p>
<p>Received: ${escapeHtml(receivedAt)}</p>
<p>Name: ${escapeHtml(lead.name)}<br/>
Email: ${escapeHtml(lead.email)}<br/>
${lead.type === "shop" ? `City: ${escapeHtml(lead.city)}` : `Phone: ${escapeHtml(lead.phone)}`}</p>
<p>Want:</p>
<p>${escapeHtml(lead.message).replaceAll("\n", "<br/>")}</p>`;
return { text, html };
}
function customerReplyBodies(lead: ValidLead) {
const text = [
`Hi ${lead.name},`,
"",
"Thanks for writing after hours. We logged your note for the shop to read in the morning.",
"",
"Someone from the shop will follow up on the next open day. This is not a medical, legal, or emergency line.",
"",
`— ${BACKEND_FROM_NAME}`,
].join("\n");
const html = `<p>Hi ${escapeHtml(lead.name)},</p>
<p>Thanks for writing after hours. We logged your note for the shop to read in the morning.</p>
<p>Someone from the shop will follow up on the next open day. This is not a medical, legal, or emergency line.</p>
<p>— ${escapeHtml(BACKEND_FROM_NAME)}</p>`;
return { text, html };
}
function escapeHtml(value: string) {
return value
.replaceAll("&", "&amp;")
.replaceAll("<", "&lt;")
.replaceAll(">", "&gt;")
.replaceAll('"', "&quot;");
}
export async function deliverLeadMail(lead: ValidLead): Promise<MailResult> {
const apiKey = process.env.AGENTMAIL_API_KEY?.trim();
if (!apiKey) {
return { emailed: false, shopLogged: false, customerReplied: false };
}
const receivedAt = new Date().toISOString();
const shop = shopLogBodies(lead, receivedAt);
const reply = customerReplyBodies(lead);
await sendFromBackendInbox(apiKey, {
to: [BACKEND_INBOX_ID],
subject: `${PRODUCT_NAME} lead — ${lead.name}`,
text: shop.text,
html: shop.html,
});
if (lead.type === "shop") {
return { emailed: false, shopLogged: true, customerReplied: false };
}
await sendFromBackendInbox(apiKey, {
to: [lead.email],
subject: "We received your after-hours note",
text: reply.text,
html: reply.html,
});
return { emailed: true, shopLogged: true, customerReplied: true };
}
