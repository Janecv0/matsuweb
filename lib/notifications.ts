interface NotificationPayload {
  formType: "contact" | "beginner";
  locale: "cs" | "en";
  name: string;
  email: string;
  phone?: string;
  message: string;
  ageGroup?: string;
}

export async function sendSubmissionNotification(payload: NotificationPayload) {
  const webhook = process.env.NOTIFICATION_WEBHOOK_URL;

  if (!webhook) {
    return;
  }

  try {
    await fetch(webhook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
  } catch {
    // Failing notifications should not break form handling.
  }
}
