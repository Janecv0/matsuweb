"use client";

import Script from "next/script";
import { useEffect, useMemo, useRef, useState } from "react";

interface CaptchaFieldProps {
  onToken: (token: string) => void;
  locale: "cs" | "en";
}

export function CaptchaField({ onToken, locale }: CaptchaFieldProps) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const hcaptchaSiteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;

  const provider = useMemo(() => {
    if (turnstileSiteKey) {
      return "turnstile" as const;
    }
    if (hcaptchaSiteKey) {
      return "hcaptcha" as const;
    }
    return "none" as const;
  }, [hcaptchaSiteKey, turnstileSiteKey]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scriptReady, setScriptReady] = useState(false);

  useEffect(() => {
    setScriptReady(provider === "none");
  }, [provider]);

  useEffect(() => {
    if (provider === "none" || scriptReady) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (provider === "turnstile" && window.turnstile) {
        setScriptReady(true);
      }

      if (provider === "hcaptcha" && window.hcaptcha) {
        setScriptReady(true);
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [provider, scriptReady]);

  useEffect(() => {
    if (provider === "none") {
      onToken("no-captcha-configured");
      return;
    }

    if (!scriptReady) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    if (provider === "turnstile" && window.turnstile && turnstileSiteKey) {
      const id = window.turnstile.render(node, {
        sitekey: turnstileSiteKey,
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken("")
      });

      return () => {
        if (window.turnstile) {
          window.turnstile.remove(id);
        }
      };
    }

    if (provider === "hcaptcha" && window.hcaptcha && hcaptchaSiteKey) {
      const id = window.hcaptcha.render(node, {
        sitekey: hcaptchaSiteKey,
        callback: (token) => onToken(token),
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken("")
      });

      return () => {
        if (window.hcaptcha) {
          window.hcaptcha.remove(id);
        }
      };
    }
  }, [hcaptchaSiteKey, onToken, provider, scriptReady, turnstileSiteKey]);

  return (
    <div className="space-y-2">
      {provider === "turnstile" ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
      ) : null}
      {provider === "hcaptcha" ? (
        <Script
          src="https://js.hcaptcha.com/1/api.js"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
      ) : null}

      {provider === "none" ? (
        <p className="text-xs text-muted">
          {locale === "cs"
            ? "Antispam ochrana není nakonfigurována (vývojový režim)."
            : "Spam protection is not configured (development mode)."}
        </p>
      ) : null}

      <div ref={containerRef} />
    </div>
  );
}
