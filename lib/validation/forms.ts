import { z } from "zod";

export const contactFormSchema = z.object({
  locale: z.enum(["cs", "en"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  captchaToken: z.string().trim().min(10)
});

export const beginnerFormSchema = z.object({
  locale: z.enum(["cs", "en"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  ageGroup: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  captchaToken: z.string().trim().min(10)
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type BeginnerFormInput = z.infer<typeof beginnerFormSchema>;
