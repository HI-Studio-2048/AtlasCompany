import { Resend } from 'resend'

// Lazy instantiation — avoids build-time crash when RESEND_API_KEY is not set
function getResend() {
  return new Resend(process.env.RESEND_API_KEY!)
}

const FROM = 'Atlas <noreply@atlas.co>'

export async function sendCompanyConfirmation({
  to,
  name,
  companyName,
  jurisdiction,
  businessType,
}: {
  to: string
  name?: string
  companyName: string
  jurisdiction: string
  businessType: string
}) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: `Your company formation request has been received — ${companyName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;">
        <div style="margin-bottom:32px;">
          <strong style="font-size:20px;color:#DC2626;">Atlas</strong>
        </div>
        <h1 style="font-size:24px;font-weight:700;color:#111;margin-bottom:8px;">
          Application Received
        </h1>
        <p style="color:#555;margin-bottom:24px;">
          Hi ${name ?? 'there'}, we've received your company formation request. Our team will review it and get back to you within 24 hours.
        </p>
        <div style="background:#f9f9f9;border-radius:8px;padding:20px;margin-bottom:24px;">
          <div style="margin-bottom:8px;"><strong>Company:</strong> ${companyName}</div>
          <div style="margin-bottom:8px;"><strong>Jurisdiction:</strong> ${jurisdiction}</div>
          <div><strong>Type:</strong> ${businessType.toUpperCase()}</div>
        </div>
        <p style="color:#555;font-size:14px;">
          Track your progress in your <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="color:#DC2626;">dashboard</a>.
        </p>
        <hr style="margin:32px 0;border:none;border-top:1px solid #eee;" />
        <p style="color:#999;font-size:12px;">Atlas Company Formation · hello@atlas.co</p>
      </div>
    `,
  })
}

export async function sendContactConfirmation({
  to,
  name,
  inquiryType,
}: {
  to: string
  name: string
  inquiryType?: string
}) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: 'We received your message — Atlas',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;">
        <strong style="font-size:20px;color:#DC2626;">Atlas</strong>
        <h1 style="font-size:24px;font-weight:700;color:#111;margin:24px 0 8px;">Message Received</h1>
        <p style="color:#555;">Hi ${name}, thanks for reaching out${inquiryType ? ` about <strong>${inquiryType}</strong>` : ''}. Our team will reply within 2 business hours.</p>
        <hr style="margin:32px 0;border:none;border-top:1px solid #eee;" />
        <p style="color:#999;font-size:12px;">Atlas Company Formation · hello@atlas.co</p>
      </div>
    `,
  })
}

export async function sendAffiliateWelcome({
  to,
  name,
}: {
  to: string
  name: string
}) {
  return getResend().emails.send({
    from: FROM,
    to,
    subject: 'Your affiliate application is under review — Atlas',
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:40px 24px;">
        <strong style="font-size:20px;color:#DC2626;">Atlas</strong>
        <h1 style="font-size:24px;font-weight:700;color:#111;margin:24px 0 8px;">Application Received!</h1>
        <p style="color:#555;">Hi ${name}, we've received your affiliate application. You'll hear from us within 24 hours once it's been reviewed.</p>
        <p style="color:#555;margin-top:16px;">Once approved, you'll get a unique referral link and access to your affiliate portal to track earnings in real time.</p>
        <hr style="margin:32px 0;border:none;border-top:1px solid #eee;" />
        <p style="color:#999;font-size:12px;">Atlas Company Formation · affiliates@atlas.co</p>
      </div>
    `,
  })
}
