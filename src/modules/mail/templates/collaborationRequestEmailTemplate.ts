type CollaborationEmailTemplateProps = {
  productName: string;
  productTagline?: string | null;
  requesterName: string;
  requesterAvatar?: string | null;
  collaborationMessage: string;
  reviewRequestUrl: string;
  builderProfileUrl: string;
};

/**
 * Escapes special characters to prevent HTML injection.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function collaborationEmailTemplate({
  productName,
  productTagline,
  requesterName,
  requesterAvatar,
  collaborationMessage,
  reviewRequestUrl,
  builderProfileUrl,
}: CollaborationEmailTemplateProps) {
  const subject = `${requesterName} wants to collaborate on ${productName}`;

  const safeProduct = escapeHtml(productName);
  const safeTagline = productTagline ? escapeHtml(productTagline) : "";
  const safeName = escapeHtml(requesterName);
  const safeMessage = escapeHtml(collaborationMessage).replace(/\n/g, "<br />");
  const safeAvatar = requesterAvatar ? escapeHtml(requesterAvatar) : "";

  // Keep URLs clean for href attributes
  const reviewUrl = encodeURI(reviewRequestUrl);
  const profileUrl = encodeURI(builderProfileUrl);

  const avatarHtml = safeAvatar
    ? `<img src="${safeAvatar}" width="56" height="56" alt="${safeName}" style="border-radius:9999px; border:3px solid #9032F2; display:block; object-fit:cover;" />`
    : `<div style="width:56px; height:56px; border-radius:9999px; background:#9032F2; color:#ffffff; font-family:Arial, sans-serif; font-weight:700; font-size:22px; line-height:56px; text-align:center;">${safeName.charAt(0).toUpperCase()}</div>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0; padding:32px 16px; background-color:#f6f7fb; font-family:Inter, Helvetica, Arial, sans-serif; color:#1f2937;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:640px; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:18px; overflow:hidden;">
          
          <!-- Header Header -->
          <tr>
            <td style="background-color:#9032F2; padding:40px; color:#ffffff;">
              <div style="font-size:24px; font-weight:800;">🚀 BU Launchpad</div>
              <div style="margin-top:18px; font-size:26px; font-weight:700; line-height:1.3;">
                Someone believes they can help move your project forward.
              </div>
              <div style="margin-top:12px; font-size:16px; opacity:0.95;">
                <strong>${safeName}</strong> wants to collaborate on <strong>${safeProduct}</strong>.
              </div>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding:32px;">
              <div style="font-size:12px; text-transform:uppercase; color:#6b7280; letter-spacing:0.08em; font-weight:600;">
                Project
              </div>
              <div style="font-size:22px; font-weight:700; margin-top:6px; color:#111827;">
                ${safeProduct}
              </div>
              ${
                safeTagline
                  ? `<div style="margin-top:8px; color:#64748b; font-size:15px; line-height:1.4;">${safeTagline}</div>`
                  : ""
              }

              <!-- Requester Card (Email-safe table layout instead of flexbox) -->
              <div style="margin-top:28px; border:1px solid #e5e7eb; border-radius:14px; padding:18px; background-color:#ffffff;">
                <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td width="56" valign="middle">
                      ${avatarHtml}
                    </td>
                    <td style="padding-left:16px;" valign="middle">
                      <div style="font-size:17px; font-weight:700; color:#111827;">${safeName}</div>
                      <div style="color:#64748b; font-size:14px; margin-top:4px;">
                        Interested in helping build this project.
                      </div>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Reach Out Section -->
              <div style="margin-top:28px; font-size:12px; text-transform:uppercase; color:#6b7280; letter-spacing:0.08em; font-weight:600;">
                Why they're reaching out
              </div>

              <div style="margin-top:10px; background-color:#fafafa; border-left:4px solid #9032F2; padding:20px; border-radius:10px; line-height:1.7; color:#374151; font-size:15px;">
                ${safeMessage}
              </div>

              <!-- Action CTAs -->
              <div style="text-align:center; margin-top:34px;">
                <a href="${reviewUrl}" target="_blank" style="display:inline-block; background-color:#9032F2; color:#ffffff; text-decoration:none; padding:15px 34px; border-radius:10px; font-weight:700; font-size:16px;">
                  Review Request
                </a>
              </div>

              <div style="text-align:center; margin-top:16px;">
                <a href="${profileUrl}" target="_blank" style="color:#9032F2; text-decoration:none; font-weight:600; font-size:14px;">
                  View Builder Profile &rarr;
                </a>
              </div>

              <!-- Disclaimer Callout -->
              <div style="margin-top:30px; padding:18px; background-color:#f8f5ff; border-radius:12px; color:#4b5563; font-size:14px; line-height:1.6;">
                Accepting a collaboration request doesn't lock you into anything. It simply lets the builder know you're interested in continuing the conversation.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:26px; border-top:1px solid #e5e7eb; text-align:center; color:#6b7280; font-size:13px; line-height:1.5;">
              <strong style="color:#111827;">BU Launchpad</strong><br />
              Copyright &copy; 2026 - Dannys Domain. All Rights Reserved
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
