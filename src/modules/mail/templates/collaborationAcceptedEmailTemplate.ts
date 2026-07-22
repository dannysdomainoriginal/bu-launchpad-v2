type CollaborationAcceptedEmailTemplateProps = {
  productName: string;
  productTagline?: string | null;

  ownerName: string;
  ownerAvatar?: string | null;

  builderProfileUrl: string;
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

export default function collaborationAcceptedEmailTemplate({
  productName,
  productTagline,
  ownerName,
  ownerAvatar,
  builderProfileUrl,
}: CollaborationAcceptedEmailTemplateProps) {
  const subject = `🎉 Good news! Your collaboration request for ${productName} was accepted`;

  const safeProduct = escapeHtml(productName);
  const safeTagline = productTagline ? escapeHtml(productTagline) : "";
  const safeOwnerName = escapeHtml(ownerName);
  const safeAvatar = ownerAvatar ? escapeHtml(ownerAvatar) : "";

  // Encode URL properly for href attribute
  const profileUrl = encodeURI(builderProfileUrl);

  const avatarHtml = safeAvatar
    ? `<img src="${safeAvatar}" width="56" height="56" alt="${safeOwnerName}" style="border-radius:9999px; border:3px solid #9032F2; display:block; object-fit:cover;" />`
    : `<div style="width:56px; height:56px; border-radius:9999px; background-color:#9032F2; color:#ffffff; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight:700; font-size:22px; line-height:56px; text-align:center;">${safeOwnerName.charAt(0).toUpperCase()}</div>`;

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
                Your collaboration request was accepted
              </div>
              <div style="margin-top:14px; font-size:16px; line-height:1.5; opacity:0.95;">
                Great news! <strong>${safeOwnerName}</strong> would like to continue the conversation with you and explore building <strong>${safeProduct}</strong> together.
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

              <!-- Builder Section (Using email-safe table structure) -->
              <div style="margin-top:28px; border:1px solid #e5e7eb; border-radius:14px; padding:20px; background-color:#ffffff;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="56" valign="middle">
                      ${avatarHtml}
                    </td>
                    <td style="padding-left:16px;" valign="middle">
                      <div style="font-size:17px; font-weight:700; color:#111827;">${safeOwnerName}</div>
                      <div style="color:#64748b; font-size:14px; margin-top:4px; line-height:1.4;">
                        Project creator &amp; lead builder behind ${safeProduct}.
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Main CTA -->
              <div style="text-align:center; margin-top:34px;">
                <a href="${profileUrl}" target="_blank" style="display:inline-block; background-color:#9032F2; color:#ffffff; text-decoration:none; padding:16px 36px; border-radius:12px; font-weight:700; font-size:16px;">
                  View Builder Profile &rarr;
                </a>
              </div>

              <!-- Secondary Information Box (Handoff clarity) -->
              <div style="margin-top:34px; padding:20px; background-color:#f8f5ff; border:1px solid #ede9fe; border-radius:12px; color:#4b5563; font-size:14px; line-height:1.65;">
                <strong style="color:#6b21a8; font-size:14px; display:block; margin-bottom:4px;">Next step</strong>
                BU Launchpad helps builders discover each other and express interest with context. From here, you can continue the conversation using any contact information or social links ${safeOwnerName} has shared on their public profile.
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
