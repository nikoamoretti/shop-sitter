import assert from "node:assert/strict";
import { test } from "node:test";
import { parseLeadInput } from "./lead-schema";
test("rejects missing fields", () => {
const result = parseLeadInput({});
assert.equal(result.ok, false);
});
test("treats honeypot as silent success", () => {
const result = parseLeadInput({
name: "Sam Rivera",
email: "sam.rivera@example.com",
phone: "5550142281",
message: "Morning slot",
website: "https://spam.example",
});
assert.deepEqual(result, { ok: true, honeypot: true });
});
test("accepts a complete customer lead", () => {
const result = parseLeadInput({
name: " Sam Rivera ",
email: "sam.rivera@example.com",
phone: "(555) 014-2281",
message: "Morning slot after a cracked filling",
});
assert.equal(result.ok, true);
if (result.ok && !result.honeypot) {
assert.equal(result.lead.name, "Sam Rivera");
assert.equal(result.lead.type, "customer");
}
});
test("accepts a shop waitlist without phone", () => {
const result = parseLeadInput({
type: "shop",
name: "Harbor Pane Glass",
city: "Portland",
email: "owner@example.com",
});
assert.equal(result.ok, true);
if (result.ok && !result.honeypot) {
assert.equal(result.lead.type, "shop");
assert.equal(result.lead.city, "Portland");
assert.equal(result.lead.phone, "");
}
});
test("rejects a shop waitlist without city", () => {
const result = parseLeadInput({
type: "shop",
name: "Harbor Pane Glass",
email: "owner@example.com",
});
assert.equal(result.ok, false);
});
