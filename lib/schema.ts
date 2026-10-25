import { z } from "zod";
import { gym } from "@/data/gym.config";

export const planOptions = [...gym.plans.map((p) => p.name), "Personal Training", "Not sure yet"] as const;
export const billingOptions = ["monthly", "quarterly", "halfYearly", "yearly"] as const;
export const genders = ["Male", "Female", "Other", "Prefer not to say"] as const;

/** Strip spaces, dashes and brackets so "+91 98765-43210" validates. */
const cleanPhone = (v: unknown) => (typeof v === "string" ? v.replace(/[\s\-()]/g, "") : v);

/** Shared by the client form (inline errors) and the API route (authoritative check). */
export const leadSchema = z.object({
  mode: z.enum(["join", "trial"]),
  name: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.preprocess(cleanPhone, z.string().regex(/^(\+?91)?[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")),
  email: z.union([z.literal(""), z.string().trim().email("Enter a valid email").max(120)]).optional(),
  age: z.coerce.number({ message: "Enter your age" }).int().min(12, "Minimum age is 12").max(90, "Enter a valid age"),
  gender: z.enum(genders, { message: "Select an option" }),
  plan: z.enum(planOptions, { message: "Select a plan" }),
  billing: z.enum(billingOptions).optional(),
  batch: z.enum(gym.batchOptions as [string, ...string[]], { message: "Select a batch" }),
  goal: z.enum(gym.goals as [string, ...string[]], { message: "Select a goal" }),
  personalTraining: z.boolean().optional(),
  joiningDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date"),
  message: z.string().trim().max(500).optional(),
  consent: z.literal(true, { message: "Please accept to continue" }),
  website: z.string().max(0).optional(), // honeypot: real users leave it empty
});

export type LeadInput = z.infer<typeof leadSchema>;
