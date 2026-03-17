"use client";

import { FormEvent, useState } from "react";
import { Locale } from "@/lib/types";
import { CaptchaField } from "@/components/forms/captcha-field";

interface BeginnerFormProps {
  locale: Locale;
}

export function BeginnerForm({ locale }: BeginnerFormProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      locale,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      ageGroup: String(data.get("ageGroup") ?? ""),
      message: String(data.get("message") ?? ""),
      captchaToken
    };

    const response = await fetch("/api/forms/beginner", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus("ok");
      setMessage(
        locale === "cs"
          ? "Děkujeme. Ozveme se vám s informacemi o prvním tréninku."
          : "Thank you. We will contact you with first-training details."
      );
      form.reset();
      setCaptchaToken("");
    } else {
      setStatus("error");
      setMessage(
        locale === "cs"
          ? "Nepodařilo se odeslat formulář. Zkuste to prosím znovu."
          : "Could not submit the form. Please try again."
      );
    }

    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="surface space-y-4 p-6" noValidate>
      <h2 className="text-2xl">{locale === "cs" ? "Přihláška pro začátečníky" : "Beginner inquiry"}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-semibold">{locale === "cs" ? "Jméno" : "Name"}</span>
          <input name="name" required className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-semibold">E-mail</span>
          <input
            name="email"
            type="email"
            required
            className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-semibold">{locale === "cs" ? "Telefon" : "Phone"}</span>
          <input name="phone" className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2" />
        </label>

        <label className="space-y-1 text-sm">
          <span className="font-semibold">{locale === "cs" ? "Věková skupina" : "Age group"}</span>
          <select
            name="ageGroup"
            className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
            defaultValue=""
          >
            <option value="">{locale === "cs" ? "Vyberte" : "Select"}</option>
            <option value={locale === "cs" ? "Děti" : "Children"}>
              {locale === "cs" ? "Děti" : "Children"}
            </option>
            <option value={locale === "cs" ? "Teenage" : "Teens"}>
              {locale === "cs" ? "Teenageři" : "Teens"}
            </option>
            <option value={locale === "cs" ? "Studenti VŠ" : "University students"}>
              {locale === "cs" ? "Studenti VŠ" : "University students"}
            </option>
            <option value={locale === "cs" ? "Dospělí" : "Adults"}>
              {locale === "cs" ? "Dospělí" : "Adults"}
            </option>
          </select>
        </label>
      </div>

      <label className="space-y-1 text-sm">
        <span className="font-semibold">{locale === "cs" ? "Zpráva" : "Message"}</span>
        <textarea
          name="message"
          required
          rows={5}
          className="focus-ring w-full rounded-lg border border-black/15 px-3 py-2"
        />
      </label>

      <CaptchaField locale={locale} onToken={setCaptchaToken} />

      <button
        type="submit"
        disabled={loading || !captchaToken}
        className="focus-ring rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? locale === "cs"
            ? "Odesílám..."
            : "Sending..."
          : locale === "cs"
            ? "Odeslat přihlášku"
            : "Submit inquiry"}
      </button>

      {status !== "idle" ? (
        <p className={status === "ok" ? "text-sm text-emerald-700" : "text-sm text-red-700"}>{message}</p>
      ) : null}
    </form>
  );
}
