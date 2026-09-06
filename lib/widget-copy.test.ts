import assert from "node:assert/strict";
import { test } from "node:test";
import {
shopWaitlistSuccessCopy,
WIDGET_DEMO_DISCLAIMER,
widgetSuccessCopy,
} from "./widget-copy";
test("widget disclaimer states demo, no email, no database", () => {
assert.match(WIDGET_DEMO_DISCLAIMER, /local demo/i);
assert.match(WIDGET_DEMO_DISCLAIMER, /emailed/i);
assert.match(WIDGET_DEMO_DISCLAIMER, /database/i);
});
test("customer success does not claim mail when emailed is false", () => {
const copy = widgetSuccessCopy(false);
assert.match(copy, /Logged/i);
assert.doesNotMatch(copy, /email/i);
assert.doesNotMatch(copy, /reply/i);
});
test("customer success does not claim mail when emailed is missing", () => {
const copy = widgetSuccessCopy(undefined);
assert.match(copy, /Logged/i);
assert.doesNotMatch(copy, /email/i);
});
test("customer success may mention email only when emailed is true", () => {
const copy = widgetSuccessCopy(true);
assert.match(copy, /emailed/i);
});
test("shop waitlist success does not claim mail when emailed is false", () => {
const copy = shopWaitlistSuccessCopy(false);
assert.match(copy, /Logged/i);
assert.doesNotMatch(copy, /email/i);
});
