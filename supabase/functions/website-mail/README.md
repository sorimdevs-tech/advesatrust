# Website Mail Function

This function stores website contact enquiries and newsletter subscriptions, then sends:

- An admin notification email to `ADMIN_EMAIL`
- A confirmation email to contact-form users
- A subscription confirmation email to newsletter subscribers

Set these as Supabase Edge Function secrets. Do not put app passwords in React or `.env` files that ship to the browser.

```bash
supabase secrets set ADMIN_EMAIL="advesatrust@hotmail.com"
supabase secrets set SMTP_HOSTNAME="smtp.gmail.com"
supabase secrets set SMTP_PORT="465"
supabase secrets set SMTP_SECURE="true"
supabase secrets set SMTP_USERNAME="your-email@gmail.com"
supabase secrets set SMTP_PASSWORD="your-new-app-password"
supabase secrets set SMTP_FROM="Advesa Trust <your-email@gmail.com>"
```

If you want the visible sender to be `advesatrust@hotmail.com`, use an SMTP account/provider that allows that address as the sender. A Gmail app password normally cannot send as a Hotmail address unless that Hotmail address is configured as an allowed Gmail sender alias.

Deploy:

```bash
supabase functions deploy website-mail --no-verify-jwt
```
