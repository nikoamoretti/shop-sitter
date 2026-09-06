export const WIDGET_DEMO_DISCLAIMER =
"This is a local demo. Nothing is emailed until mail is wired. Nothing is stored in a database.";
export function widgetSuccessCopy(emailed: boolean | undefined) {
if (emailed === true) {
return "A short reply was emailed to you. The shop will see this in the morning log.";
}
return "Logged. The shop will see your name, phone, and what you want when they open.";
}
export function shopWaitlistSuccessCopy(emailed: boolean | undefined) {
if (emailed === true) {
return "A short note was emailed to the address you left.";
}
return "Logged. We’ll get back to you if a seat opens.";
}
