# Shop Sitter
Bots sit the shop after you close.
Small shops miss after-hours email and web form leads. Forward mail or embed the widget. Bots draft and send replies. Every lead lands in a morning log.
## Pages
- `/` — landing, $99/month (display only), shop waitlist, test widget
- `/blog` — notes index (three locked titles)
- `/faq` — short questions
- `/demo` — Maple Street Dental (fictional) thread
- `/widget` — embeddable form (name, email, phone, message, honeypot)
- `/leads` — paper morning log (name, phone, want, time)
- `POST /api/lead` — customer leads or `type=shop` waitlist. If `AGENTMAIL_API_KEY` is set, customer replies may be emailed. If not, `{ ok: true, emailed: false }`. Success copy never claims email was sent unless `emailed` is true.
## Run locally
```bash
npm install
npm run dev
```
Open the printed local URL (port `43147`).
```bash
npm test
npm run build
```
## Notes
- No database. Session leads stay in the browser only.
- No checkout. Shop waitlist is a raised hand, not a charge.
- Not a law firm or medical answering service.
