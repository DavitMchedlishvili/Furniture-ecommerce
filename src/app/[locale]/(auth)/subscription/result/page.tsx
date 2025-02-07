import React, { JSX } from "react";
import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe/stripe";
import { Link } from "@/i18n/routing";
import { createClient } from "@/utils/supabase/server";
export default async function ProductResultPage(props: {
  searchParams: Promise<{ session_id: string }>;
}): Promise<JSX.Element> {
  const searchParams = await props.searchParams;
 
  if (!searchParams.session_id) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <p className="text-xl text-red-500">
          Invalid session ID. Please try again.
        </p>
      </div>
    );
  }

  try {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.retrieve(searchParams.session_id, {
        expand: ["line_items", "payment_intent", "subscription"],
      });

    const paymentIntent =
      checkoutSession.payment_intent as Stripe.PaymentIntent | null;
    const subscription =
      checkoutSession.subscription as Stripe.Subscription | null;

    if (!paymentIntent && !subscription) {
      return (
        <div className="flex items-center justify-center h-screen bg-red-100">
          <p className="text-xl text-red-500">
            Payment Intent or Subscription not found. Please contact support.
          </p>
        </div>
      );
    }

    let formattedAmount = "0.00";
    if (paymentIntent) {
      formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(paymentIntent.amount / 100);
    } else if (subscription?.items?.data?.[0]?.plan?.amount) {
      formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(subscription.items.data[0].plan.amount / 100);
    }

    
    

      

      

    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-slate-700">
        <div className="p-8 rounded-lg text-center">
          <h1 className="text-4xl font-bold black mb-4">
            Your Order is Confirmed
          </h1>
          <p className="text-2xl black mb-6">
            You will be charged <span className="font-semibold">{formattedAmount}</span>
          </p>
          <p className="text-gray-600 mb-8">
            For any questions, please contact our support team.
          </p>

          <Link
            href="/"
            className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
          >
            Go to the homepage
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error retrieving session:", error);
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <p className="text-xl text-red-500">
          An error occurred while retrieving your session. Please try again.
        </p>
      </div>
    );
  }
}