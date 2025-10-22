# Email Notification Setup Guide

This guide will help you set up email notifications for order confirmations sent to the shop owner.

## Overview

When a customer places an order, the system will automatically send a detailed email notification to the shop owner containing:

- Order details (number, date, payment method)
- Customer information (name, email, phone)
- Shipping address
- List of ordered products with quantities and prices
- Total order amount

## Prerequisites

1. A [Resend](https://resend.com) account (free tier available)
2. A verified domain or email address in Resend

## Setup Instructions

### 1. Install Dependencies

The required package has already been installed:

```bash
npm install resend
```

### 2. Get Your Resend API Key

1. Sign up for a free account at [resend.com](https://resend.com)
2. Navigate to [API Keys](https://resend.com/api-keys)
3. Create a new API key
4. Copy the API key (it starts with `re_`)

### 3. Verify Your Domain or Email

Before sending emails, you need to verify your domain or email:

**Option A: Verify a Domain (Recommended for production)**

1. Go to [Domains](https://resend.com/domains) in Resend dashboard
2. Add your domain
3. Add the provided DNS records to your domain provider
4. Wait for verification (usually takes a few minutes)

**Option B: Use Resend's Test Email (For development)**

- Resend provides a test email: `onboarding@resend.dev`
- This can only send to your verified email address
- Good for testing but not for production

### 4. Configure Environment Variables

Create a `.env.local` file in your project root (if it doesn't exist) and add:

```env
# Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here

# Email sender address (must be verified in Resend)
EMAIL_FROM=orders@yourdomain.com

# Shop owner email (where notifications will be sent)
SHOP_OWNER_EMAIL=owner@yourdomain.com
```

**Important:**

- Replace `re_your_actual_api_key_here` with your actual Resend API key
- Replace `orders@yourdomain.com` with your verified email/domain
- Replace `owner@yourdomain.com` with the email where you want to receive order notifications

### 5. Test the Setup

1. Start your development server:

```bash
npm run dev
```

2. Place a test order through your checkout page
3. Check the shop owner email inbox for the notification
4. Check the console logs for confirmation messages

## Email Template Features

The email notification includes:

- **Professional Design**: Clean, modern HTML email template
- **Order Summary**: Complete order details with order number and date
- **Customer Info**: Name, email, phone, and full shipping address
- **Product List**: Table showing all ordered items with quantities and prices
- **Total Amount**: Clearly displayed total order value
- **Action Prompt**: Reminder to process the order

## Troubleshooting

### Email Not Received

1. **Check API Key**: Ensure your Resend API key is correct in `.env.local`
2. **Verify Domain**: Make sure your sending email domain is verified in Resend
3. **Check Spam**: Look in the spam/junk folder
4. **Console Logs**: Check your server console for error messages
5. **Resend Dashboard**: Check the [Logs](https://resend.com/logs) in Resend dashboard

### Common Errors

**"API key not found"**

- Solution: Make sure `RESEND_API_KEY` is set in `.env.local`
- Restart your development server after adding environment variables

**"Domain not verified"**

- Solution: Verify your domain in Resend dashboard or use a verified email address

**"Rate limit exceeded"**

- Solution: Resend free tier has sending limits. Upgrade your plan if needed

### Testing in Development

For testing, you can:

1. Use Resend's test email `onboarding@resend.dev` as `EMAIL_FROM`
2. This will only send to your verified email address
3. Set `SHOP_OWNER_EMAIL` to your personal email for testing

## Production Considerations

1. **Domain Verification**: Always use a verified domain in production
2. **Error Handling**: The system is designed to not fail order creation if email fails
3. **Monitoring**: Regularly check Resend dashboard for email delivery status
4. **Backup Plan**: Consider setting up multiple notification emails or SMS backup

## Files Modified/Created

- `lib/email.ts` - Email service with HTML template
- `actions/createOrder.ts` - Integrated email notification in order creation
- `.env.example` - Environment variable template
- `EMAIL_SETUP.md` - This documentation file

## Email Service Details

The email functionality uses:

- **Service**: Resend (modern email API)
- **Library**: Official Resend Node.js SDK
- **Template**: Custom HTML email template
- **Error Handling**: Graceful failure (order creation continues even if email fails)

## Support

For issues with:

- **Resend Service**: Check [Resend Documentation](https://resend.com/docs)
- **Email Template**: Modify `lib/email.ts` to customize the email design
- **Integration**: Review `actions/createOrder.ts` for the email trigger logic

## Next Steps

After setup, you can:

1. Customize the email template in `lib/email.ts`
2. Add customer confirmation emails (send to customer email)
3. Set up email notifications for order status updates
4. Add SMS notifications as backup
5. Integrate with other notification services (Slack, Discord, etc.)
