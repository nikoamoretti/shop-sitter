import type { StoredLead } from "@/lib/lead-types";
const KEY = "shop-sitter.session-leads";
const listeners = new Set<() => void>();
const EMPTY_LEADS: StoredLead[] = [];
let cachedLeads: StoredLead[] = EMPTY_LEADS;
let cachedRaw: string | null | undefined = undefined;
function emit() {
cachedRaw = undefined;
cachedLeads = EMPTY_LEADS;
for (const listener of listeners) listener();
}
export function subscribeSessionLeads(listener: () => void) {
listeners.add(listener);
return () => {
listeners.delete(listener);
};
}
export function readSessionLeads(): StoredLead[] {
if (typeof window === "undefined") return EMPTY_LEADS;
try {
const raw = window.localStorage.getItem(KEY);
if (cachedRaw === raw) {
return cachedLeads;
}
if (!raw) {
cachedRaw = raw;
cachedLeads = EMPTY_LEADS;
return EMPTY_LEADS;
}
const parsed = JSON.parse(raw) as StoredLead[];
if (!Array.isArray(parsed)) {
cachedRaw = raw;
cachedLeads = EMPTY_LEADS;
return EMPTY_LEADS;
}
const normalized = parsed.map((lead) => ({
...lead,
type: lead.type === "shop" ? "shop" : "customer",
})) as StoredLead[];
cachedRaw = raw;
cachedLeads = normalized;
return normalized;
} catch {
cachedRaw = undefined;
cachedLeads = EMPTY_LEADS;
return EMPTY_LEADS;
}
}
export function getServerSessionLeads(): StoredLead[] {
return EMPTY_LEADS;
}
export function writeSessionLead(lead: StoredLead) {
const next = [lead, ...readSessionLeads().filter((item) => item.id !== lead.id)];
window.localStorage.setItem(KEY, JSON.stringify(next.slice(0, 40)));
emit();
}
