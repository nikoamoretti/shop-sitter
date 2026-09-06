export type LeadKind = "customer" | "shop";
export type StoredLead = {
id: string;
type: LeadKind;
name: string;
phone: string;
email: string;
city?: string;
want: string;
time: string;
shop: string;
source: "sample" | "session";
};
