import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export const handler = async () => {
  const region = process.env.SES_REGION || process.env.AWS_REGION || "ap-south-1";
  const ses = new SESClient({ region });

  const sender = process.env.SENDER_EMAIL;
    // Parse JSON array: [{"email":"user@example.com","name":"User"}]
    let recipients = [];
    try {
      recipients = JSON.parse(process.env.RECIPIENTS || "[]");
    } catch (err) {
      console.error("RECIPIENTS JSON parse error:", err);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid RECIPIENTS JSON" })
      };
    }
  // choose the env var name you actually set in Lambda. I recommend RECIPIENTS (plural).

  if (!sender || recipients.length === 0) {
    console.error("Missing SENDER_EMAIL or RECIPIENTS env vars");
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing sender or recipient email" })
    };
  }
  //[{"email":"shreedhar19oct@gmail.com","name":"Shreedhar"},{"email":"singhsudhanshu97@gmail.com","name":"Sudhanshu Singh"}]

  // Send individually so each person gets a personalized body including their email
  const results = [];
  for (const recipient of recipients) {
    const { email, name } = recipient;
    
    if (!email || !name) {
      results.push({ to, status: "error", error: "Missing email or name" });
      continue;
    }
    // personalize: use recipient name in the message
    const personalizedBody = `
      Hey ${name} 👋

      Here is your daily reminder to practice Data Structures & Algorithms.

      Consistency compounds — even 1 hour a day will build massive long-term impact.
      You’ve got this! 💪

      Best,
      Your AWS Daily Reminder Bot
    `;

    const params = {
      Destination: { ToAddresses: [email] },
      Message: {
        Body: { Text: { Data: personalizedBody } },
        Subject: { Data: "DSA Daily Reminder" }
      },
      Source: sender
    };

    try {
      const response = await ses.send(new SendEmailCommand(params));
      console.log(`SES send response for ${email}:`, response);
      results.push({ to, status: "sent", messageId: response.MessageId || null });
    } catch (err) {
      console.error(`SES send error for ${email}:`, err);
      results.push({ to: email, name , status: "error", error: err.message || String(err) });
      // continue sending to other recipients
    }
  }

  // overall response: includes per-recipient send results
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Send attempts completed", results })
  };
};