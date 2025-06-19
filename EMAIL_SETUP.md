# Email Setup Guide

The contact form is configured to send emails to `kps.18.1999@gmail.com`.

## Current Implementation

The portfolio uses a hybrid approach:

1. **Form Submission**: When users submit the form, it sends data to `/api/contact`
2. **Fallback Option**: Users can click "Open in Email Client" to send via their email app
3. **Logging**: All submissions are logged to the console in development

## Direct Email Options (No External Services)

### Option 1: Use Free SMTP Service (Recommended)

**Brevo (formerly Sendinblue)** - 300 free emails/day:

1. Sign up at [Brevo](https://www.brevo.com)
2. Get SMTP credentials
3. Install nodemailer:
   ```bash
   npm install nodemailer
   ```
4. Create `.env.local`:
   ```
   SMTP_HOST=smtp-relay.brevo.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_smtp_password
   ```
5. Update `/app/api/contact/route.ts`:
   ```typescript
   import nodemailer from 'nodemailer';

   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: process.env.SMTP_PORT,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   });

   await transporter.sendMail({
     from: email,
     to: 'kps.18.1999@gmail.com',
     subject: `Portfolio Contact: ${name}`,
     text: emailData.body,
   });
   ```

### Option 2: Gmail App Password (Direct Gmail)

1. Enable 2FA on your Gmail account
2. Generate App Password at [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Install nodemailer:
   ```bash
   npm install nodemailer
   ```
4. Create `.env.local`:
   ```
   GMAIL_USER=kps.18.1999@gmail.com
   GMAIL_APP_PASSWORD=your_16_char_app_password
   ```
5. Update the API route to use Gmail SMTP

### Option 3: Web3Forms (Free API, No Signup)

1. Get a free access key at [Web3Forms](https://web3forms.com)
2. Update the Contact component:
   ```javascript
   const response = await fetch('https://api.web3forms.com/submit', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
       access_key: 'YOUR_ACCESS_KEY',
       email: 'kps.18.1999@gmail.com',
       ...formData
     }),
   });
   ```

## Current Features

- Form validation
- Success/error messages
- Direct mailto link fallback
- Console logging for development
- Clean, user-friendly interface

## Testing

1. Run `npm run dev`
2. Fill out the contact form
3. Check console for logged messages
4. Use "Open in Email Client" link to test direct email