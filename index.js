import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const handler = async () => {
  const region = process.env.SES_REGION || process.env.AWS_REGION || "ap-south-1";
  const ses = new SESClient({ region });

  const sender = process.env.SENDER_EMAIL;
  // choose the env var name you actually set in Lambda. I recommend RECIPIENTS (plural).
  const recipients = (process.env.RECIPIENTS || "").split(",").map(s => s.trim()).filter(Boolean);

  if (!sender || recipients.length === 0) {
    console.error("Missing SENDER_EMAIL or RECIPIENTS env vars");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing sender or recipient email" })
    };
  }

  const params = {
    Destination: { ToAddresses: recipients },
    Message: {
      Body: { Text: { Data: "Start solving DSA for a better Tomorrow." } },
      Subject: { Data: "DSA Daily Reminder" }
    },
    Source: sender
  };

  try {
    // use the ses variable we created
    const response = await ses.send(new SendEmailCommand(params));
    console.log("SES send response:", response);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully", messageId: response.MessageId || null })
    };
  } catch (err) {
    console.error("SES send error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error sending email", error: err.message || err.toString() })
    };
  }
};
