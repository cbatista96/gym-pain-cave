import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PLANS, type PlanId } from "@/data/site";

// Plan names for the Stripe line item, per locale (Stripe Checkout shows this
// on its own hosted page, outside the app's i18n context).
const PLAN_NAMES: Record<PlanId, Record<string, string>> = {
  basic: { es: "Pain Cave — Cave Basic", en: "Pain Cave — Cave Basic" },
  beast: { es: "Pain Cave — Cave Beast", en: "Pain Cave — Cave Beast" },
  elite: { es: "Pain Cave — Cave Elite", en: "Pain Cave — Cave Elite" }
};

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured (missing STRIPE_SECRET_KEY)" },
      { status: 500 }
    );
  }

  let body: { planId?: string; locale?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const planId = body.planId as PlanId;
  if (!planId || !(planId in PLANS)) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }
  const locale = body.locale === "en" ? "en" : "es";
  const plan = PLANS[planId];

  const stripe = new Stripe(secretKey);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    new URL(request.url).origin;

  // Prefer a pre-created Price from the dashboard; fall back to inline price_data.
  const priceId = process.env[plan.stripePriceEnv];
  const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = priceId
    ? { price: priceId, quantity: 1 }
    : {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: plan.amountCents,
          recurring: { interval: "month" },
          product_data: { name: PLAN_NAMES[planId][locale] }
        }
      };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [lineItem],
      locale: locale === "es" ? "es" : "en",
      success_url: `${baseUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${locale}/checkout/cancel`,
      metadata: { planId }
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Could not create checkout session" }, { status: 500 });
  }
}
