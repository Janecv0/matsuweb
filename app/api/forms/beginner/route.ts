import { NextRequest, NextResponse } from "next/server";
import { verifyCaptcha } from "@/lib/captcha";
import { sendSubmissionNotification } from "@/lib/notifications";
import { createSupabaseServiceClient } from "@/lib/supabase/service";
import { beginnerFormSchema } from "@/lib/validation/forms";

function getRemoteIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
}

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const parsed = beginnerFormSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Validation failed",
        details: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const ip = getRemoteIp(request);
  const captcha = await verifyCaptcha(parsed.data.captchaToken, ip);

  if (!captcha.ok) {
    return NextResponse.json(
      {
        ok: false,
        message: "Captcha verification failed"
      },
      { status: 400 }
    );
  }

  const supabase = createSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json(
      {
        ok: false,
        message: "Supabase is not configured"
      },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("form_submissions").insert({
    locale: parsed.data.locale,
    form_type: "beginner",
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || null,
    age_group: parsed.data.ageGroup || null,
    message: parsed.data.message,
    metadata: {
      captchaProvider: captcha.provider
    }
  });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: "Could not save submission"
      },
      { status: 500 }
    );
  }

  await sendSubmissionNotification({
    formType: "beginner",
    locale: parsed.data.locale,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    ageGroup: parsed.data.ageGroup,
    message: parsed.data.message
  });

  return NextResponse.json({ ok: true });
}
