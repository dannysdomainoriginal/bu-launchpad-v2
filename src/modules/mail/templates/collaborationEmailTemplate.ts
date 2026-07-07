type CollaborationEmailTemplateProps = {
  productName: string;
  senderName: string;
  collaborationMessage: string;
  senderAvatar?: string | null;
  productTagline?: string | null;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default function collaborationEmailTemplate({
  productName,
  senderName,
  collaborationMessage,
  senderAvatar,
  productTagline,
}: CollaborationEmailTemplateProps) {
  const subject = `🤝 ${senderName} wants to team up with you on ${productName}`;

  const safeProductName = escapeHtml(productName);
  const safeSenderName = escapeHtml(senderName);
  const safeCollaborationMessage = escapeHtml(collaborationMessage).replace(
    /\n/g,
    "<br>",
  );
  const safeProductTagline = productTagline ? escapeHtml(productTagline) : null;
  const safeSenderAvatar = senderAvatar ? escapeHtml(senderAvatar) : null;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
body {
  margin: 0;
  padding: 0;
  background: #f5f7fb;
  font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  color: #1f2937;
}
.wrapper {
  width: 100%;
  padding: 32px 16px;
  box-sizing: border-box;
}
.container {
  max-width: 640px;
  margin: 0 auto;
  background: white;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}
.hero {
  background: linear-gradient(135deg, #111827, #2563eb);
  padding: 40px 32px;
  color: white;
}
.logo {
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 12px;
}
.hero h1 {
  margin: 0;
  font-size: 26px;
  line-height: 1.3;
}
.hero p {
  margin: 12px 0 0;
  opacity: 0.9;
  font-size: 15px;
  line-height: 1.6;
}
.content {
  padding: 32px;
}
.label {
  color: #6b7280;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 6px;
}
.value {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
}
.sender-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 24px;
}
.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #dbeafe;
}
.avatar-fallback {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
}
.sender-meta strong {
  display: block;
  font-size: 16px;
  margin-bottom: 4px;
}
.sender-meta span {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
}
.message-box {
  background: #f9fafb;
  border-left: 4px solid #2563eb;
  padding: 20px;
  border-radius: 10px;
  line-height: 1.75;
  font-size: 15px;
  white-space: pre-wrap;
  margin-bottom: 24px;
}
.cta {
  background: #eff6ff;
  color: #1e3a8a;
  border-radius: 10px;
  padding: 16px 18px;
  font-size: 14px;
  line-height: 1.7;
}
.footer {
  text-align: center;
  padding: 28px;
  font-size: 13px;
  color: #6b7280;
  border-top: 1px solid #e5e7eb;
}
.footer strong {
  color: #111827;
}
@media only screen and (max-width: 600px) {
  .hero { padding: 32px 24px; }
  .content { padding: 24px; }
  .hero h1 { font-size: 22px; }
  .value { font-size: 16px; }
  .message-box { font-size: 14px; }
}
</style>
</head>
<body>
<div class="wrapper">
  <div class="container">
    <div class="hero">
      <div class="logo">🚀 BU Launchpad</div>
      <h1>${safeSenderName} wants to build with you</h1>
      <p>Someone is excited about your idea and wants to jump in on ${safeProductName}.</p>
    </div>

    <div class="content">
      <div class="label">Project</div>
      <div class="value">${safeProductName}</div>

      ${safeProductTagline ? `<div class="label">What it’s about</div><div class="value">${safeProductTagline}</div>` : ""}

      <div class="sender-card">
        ${safeSenderAvatar ? `<img src="${safeSenderAvatar}" alt="${safeSenderName}" class="avatar" />` : `<div class="avatar-fallback">${safeSenderName.charAt(0).toUpperCase()}</div>`}
        <div class="sender-meta">
          <strong>${safeSenderName}</strong>
          <span>Would love to explore this project with you and see what you could build together.</span>
        </div>
      </div>

      <div class="label">Their note</div>
      <div class="message-box">${safeCollaborationMessage}</div>

      <div class="cta">
        💬 Reply to this email to continue the conversation and turn this spark into a real collaboration.
      </div>
    </div>

    <div class="footer">
      <strong>BU Launchpad</strong><br />
      Helping student founders validate ideas, gather feedback, find collaborators, and build products people actually want.
    </div>
  </div>
</div>
</body>
</html>
`;

  return { subject, html };
}
