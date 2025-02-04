// import type { Stripe } from "stripe";
// import { stripe } from "../../../../../lib/stripe/stripe";
// import PrintObject from "../../../components/Subscription/stripe/PrintObj"



// export default async function ProductResultPage({
//   searchParams,
// }: {
//   searchParams: { session_id: string };
// }): Promise<JSX.Element> {
//   if (!searchParams.session_id)
//     throw new Error("Please provide a valid session_id (`cs_test_...`)");

//   const checkoutSession: Stripe.Checkout.Session =
//     await stripe.checkout.sessions.retrieve(searchParams.session_id, {
//       expand: ["line_items", "payment_intent"],
//     });

//   const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent | null;

//   if (!paymentIntent) {
//     throw new Error("PaymentIntent not found");
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="p-8 rounded-lg text-center">
//         <h1 className="text-4xl font-bold text-purple-700 mb-4">
//           🎉 Your Order is Confirmed
//         </h1>
//         <p className="text-4xl text-gray-700 mb-6">
//           You will be charged{" "}
//           <span className="font-semibold">
//             {(paymentIntent.amount - (paymentIntent.amount % 100)) / 100}.
//             {paymentIntent.amount % 100} $
//           </span>
//         </p>
//         <p className="text-gray-600 mb-8">
//           For any questions, please contact our support team.
//         </p>

//         {/* Using PrintObject to display the PaymentIntent or CheckoutSession */}
//         <PrintObject content={checkoutSession} />

//         <a
//           href="/"
//           className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 px-8 rounded-full transition-all"
//         >
//           Go to the homepage
//         </a>
//       </div>
//     </div>
//   );
// }


import React, { JSX } from "react";
import type { Stripe } from "stripe";
import { stripe } from "@/lib/stripe/stripe";
import { Link } from "@/i18n/routing";

interface ProductResultPageProps {
  searchParams: { session_id?: string };
}

export default async function ProductResultPage({
  searchParams,
}: ProductResultPageProps): Promise<JSX.Element> {
  if (!searchParams.session_id) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <p className="text-xl text-red-500">
          Invalid session ID. Please try again.
        </p>
      </div>
    );
  }

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
    const amountInDollars = paymentIntent.amount / 100; // Convert from cents to dollars
    formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amountInDollars); // Format it into USD
  } else if (subscription?.items?.data?.[0]?.plan?.amount) {
    const amountInDollars = subscription.items.data[0].plan.amount / 100; // Same for subscription
    formattedAmount = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amountInDollars);
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
}
