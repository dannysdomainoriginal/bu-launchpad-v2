type CollaborationRejectedEmailTemplateProps = {
  productName: string;
  productTagline?: string | null;

  exploreProjectsUrl: string;

  collaborationDashboardUrl: string;
};

/**
 * Escapes special characters to prevent HTML injection in email content.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function collaborationRejectedEmailTemplate({
  productName,
  productTagline,
  exploreProjectsUrl,
  collaborationDashboardUrl,
}: CollaborationRejectedEmailTemplateProps) {
  const subject = `Update on your collaboration request for ${productName}`;

  const safeProduct = escapeHtml(productName);
  const safeTagline = productTagline ? escapeHtml(productTagline) : "";

  // Encode URLs properly for href attributes
  const exploreUrl = encodeURI(exploreProjectsUrl);
  const dashboardUrl = encodeURI(collaborationDashboardUrl);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0; padding:32px 16px; background-color:#f6f7fb; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Inter, Helvetica, Arial, sans-serif; color:#1f2937; -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:640px; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:18px; overflow:hidden;">
          
          <!-- Hero Banner -->
          <tr>
            <td style="background-color:#9032F2; padding:40px; color:#ffffff;">
              <div style="font-size:24px; font-weight:800; letter-spacing:-0.02em;">🚀 BU Launchpad</div>
              <div style="margin-top:20px; font-size:28px; font-weight:800; line-height:1.25; letter-spacing:-0.01em;">
                This collaboration request wasn't accepted
              </div>
              <div style="margin-top:14px; font-size:16px; line-height:1.5; opacity:0.95;">
                The creator of <strong>${safeProduct}</strong> decided not to move forward with this collaboration at this time. Thank you for putting yourself out there and taking the initiative to reach out.
              </div>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding:36px 32px 32px 32px;">
              
              <!-- Project Section -->
              <div style="font-size:12px; text-transform:uppercase; color:#6b7280; letter-spacing:0.08em; font-weight:700;">
                Project
              </div>
              <div style="font-size:22px; font-weight:700; margin-top:6px; color:#111827;">
                ${safeProduct}
              </div>
              ${
                safeTagline
                  ? `<div style="margin-top:6px; color:#64748b; font-size:15px; line-height:1.4;">${safeTagline}</div>`
                  : ""
              }

              <!-- Encouragement Box (Grounded & Respectful Tone) -->
              <div style="margin-top:28px; padding:22px; background-color:#f8f5ff; border:1px solid #ede9fe; border-radius:12px; color:#4b5563; font-size:14px; line-height:1.65;">
                <strong style="color:#6b21a8; font-size:15px; display:block; margin-bottom:8px;">Finding the right fit takes time</strong>
                Every builder evaluates collaboration differently—sometimes the timing isn't right, bandwidth is limited, or project scope changes. One decline is simply a neutral data point and doesn't define your value or skills. Keep exploring projects and reaching out to builders whose work genuinely excites you.
              </div>

              <!-- Primary Action CTA -->
              <div style="text-align:center; margin-top:34px;">
                <a href="${exploreUrl}" target="_blank" style="display:inline-block; background-color:#9032F2; color:#ffffff; text-decoration:none; padding:16px 36px; border-radius:12px; font-weight:700; font-size:16px;">
                  Explore More Projects
                </a>
              </div>

              <!-- Secondary Link -->
              <div style="text-align:center; margin-top:18px;">
                <a href="${dashboardUrl}" target="_blank" style="color:#9032F2; text-decoration:none; font-weight:600; font-size:14px;">
                  Manage Collaboration Requests &rarr;
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px; border-top:1px solid #e5e7eb; text-align:center; color:#6b7280; font-size:13px; line-height:1.6; background-color:#fafafa;">
              <strong style="color:#111827;">BU Launchpad</strong><br />
              Helping student builders find teammates worth building with.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
