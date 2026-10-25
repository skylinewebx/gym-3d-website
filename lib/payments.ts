/**
 * Payment seam. Razorpay is NOT built yet; implement `createOrder` and call it from
 * a server (static hosting has none; use Razorpay Payment Links or move to Vercel/Netlify functions) once pricing is final.
 */
export type PaymentOrder = { provider: "razorpay"; orderId: string; amountPaise: number; currency: "INR" };

export interface PaymentProvider {
  createOrder(input: { leadId: string; amountInr: number; plan: string; billing: string }): Promise<PaymentOrder>;
  verifyWebhook(rawBody: string, signature: string): boolean;
}

export const payments: PaymentProvider | null = null; // set to a Razorpay implementation later
