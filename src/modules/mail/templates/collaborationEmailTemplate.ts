type CollaborationEmailTemplateProps = {
  productName: string;
  senderName: string;
  collaborationMessage: string;
};

export default function collaborationEmailTemplate({
  productName,
  senderName,
  collaborationMessage,
}: CollaborationEmailTemplateProps) {
  const subject = `${senderName} wants to collaborate on ${productName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
      <h2 style="margin-bottom: 12px;">New collaboration request</h2>
      <p><strong>${senderName}</strong> wants to collaborate on <strong>${productName}</strong>.</p>
      <p style="margin: 16px 0; padding: 16px; background: #f9fafb; border-radius: 8px;">${collaborationMessage}</p>
      <p>Reply to this email to continue the conversation.</p>
    </div>
  `;

  return { subject, html };
}
