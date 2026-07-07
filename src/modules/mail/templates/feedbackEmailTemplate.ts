type FeedbackEmailTemplateProps = {
  productName: string;
  senderName: string;
  feedbackMessage: string;
};

export default function feedbackEmailTemplate({
  productName,
  senderName,
  feedbackMessage,
}: FeedbackEmailTemplateProps) {
  return {
    subject: `💡 New feedback on "${productName}"`,

    html: `
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
    background: linear-gradient(135deg,#111827,#2563eb);
    padding: 40px 32px;
    color: white;
}

.logo {
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -.5px;
    margin-bottom: 12px;
}

.hero h1 {
    margin: 0;
    font-size: 26px;
    line-height: 1.3;
}

.hero p {
    margin: 12px 0 0;
    opacity: .9;
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
    letter-spacing: .08em;
    margin-bottom: 6px;
}

.value {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
}

.feedback-box {
    background: #f9fafb;
    border-left: 4px solid #2563eb;
    padding: 20px;
    border-radius: 10px;
    line-height: 1.75;
    font-size: 15px;
    white-space: pre-wrap;
}

.tip {
    margin-top: 32px;
    padding: 18px;
    background: #eff6ff;
    border-radius: 10px;
    color: #1e3a8a;
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

@media only screen and (max-width:600px){

.hero{
    padding:32px 24px;
}

.content{
    padding:24px;
}

.hero h1{
    font-size:22px;
}

.value{
    font-size:16px;
}

.feedback-box{
    font-size:14px;
}

}
</style>

</head>

<body>

<div class="wrapper">

<div class="container">

<div class="hero">

<div class="logo">
🚀 BU Launchpad
</div>

<h1>Someone left feedback on your project</h1>

<p>
Your innovation is getting attention from the community.
Here is the latest feedback received.
</p>

</div>

<div class="content">

<div class="label">
Project
</div>

<div class="value">
${productName}
</div>

<div class="label">
From
</div>

<div class="value">
${senderName}
</div>

<div class="label">
Feedback
</div>

<div class="feedback-box">
${feedbackMessage
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/\n/g, "<br>")}
</div>

<div class="tip">
💙 Every piece of feedback is an opportunity to improve your idea.
Take what resonates, iterate quickly, and keep building.
</div>

</div>

<div class="footer">

<strong>BU Launchpad</strong><br>

Helping student founders validate ideas, gather feedback, find collaborators, and build products people actually want.

</div>

</div>

</div>

</body>
</html>
`,
  };
}
