/**
 * Payment seam. Razorpay is NOT built yet; implement `createOrder` and call it from
 * app/api/lead/route.ts (or a new /api/checkout route) once pricing is final.
 */
export type PaymentOrder = { provider: "razorpay"; orderId: string; amountPaise: number; currency: "INR" };

export interface PaymentProvider {
  createOrder(input: { leadId: string; amountInr: number; plan: string; billing: string }): Promise<PaymentOrder>;
  verifyWebhook(rawBody: string, signature: string): boolean;
}

export const payments: PaymentProvider | null = null; // set to a Razorpay implementation later
