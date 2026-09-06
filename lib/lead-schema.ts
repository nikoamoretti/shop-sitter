export type LeadKind = "customer" | "shop";
export type LeadInput = {
type?: unknown;
name?: unknown;
email?: unknown;
phone?: unknown;
city?: unknown;
message?: unknown;
website?: unknown;
};
export type ValidLead = {
type: LeadKind;
name: string;
email: string;
phone: string;
city: string;
message: string;
};
export type LeadParseResult =
| { ok: true; honeypot: true }
| { ok: true; honeypot: false; lead: ValidLead }
| { ok: false; error: string };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function asTrimmed(value: unknown) {
return typeof value === "string" ? value.trim() : "";
}
export function parseLeadInput(input: LeadInput): LeadParseResult {
if (asTrimmed(input.website)) {
return { ok: true, honeypot: true };
}
const type: LeadKind = asTrimmed(input.type) === "shop" ? "shop" : "customer";
const name = asTrimmed(input.name);
const email = asTrimmed(input.email);
const phone = asTrimmed(input.phone);
const city = asTrimmed(input.city);
const message = asTrimmed(input.message);
if (!name) {
return { ok: false, error: type === "shop" ? "Shop name is required." : "Name is required." };
}
if (!email || !EMAIL_RE.test(email)) {
return { ok: false, error: "A real email address is required." };
}
if (type === "shop") {
if (!city) return { ok: false, error: "City is required." };
return {
ok: true,
honeypot: false,
lead: {
type,
name,
email,
phone: "",
city,
message: message || `Shop waitlist — ${city}`,
},
};
}
if (!phone) return { ok: false, error: "Phone is required." };
if (!message) return { ok: false, error: "Message is required." };
if (message.length > 4000) {
return { ok: false, error: "Message is too long." };
}
return {
ok: true,
honeypot: false,
lead: { type, name, email, phone, city: "", message },
};
}
