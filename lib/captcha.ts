export async function verifyCaptcha(token: string, remoteIp?: string | null) {
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const hcaptchaSecret = process.env.HCAPTCHA_SECRET;

  if (!turnstileSecret && !hcaptchaSecret) {
    return { ok: true, provider: "none" as const };
  }

  if (turnstileSecret) {
    const body = new URLSearchParams();
    body.set("secret", turnstileSecret);
    body.set("response", token);
    if (remoteIp) {
      body.set("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    });

    const data = (await response.json()) as { success?: boolean };
    return { ok: Boolean(data.success), provider: "turnstile" as const };
  }

  const body = new URLSearchParams();
  body.set("secret", hcaptchaSecret ?? "");
  body.set("response", token);
  if (remoteIp) {
    body.set("remoteip", remoteIp);
  }

  const response = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });

  const data = (await response.json()) as { success?: boolean };
  return { ok: Boolean(data.success), provider: "hcaptcha" as const };
}
