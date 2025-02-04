"use client";

import { createCheckoutSession } from "@/actions/stripe";
import React, { JSX, useState } from "react";


interface CheckoutFormProps {
  uiMode: "hosted";
  locale: string;
}

interface CheckoutFormProps {
    uiMode: "hosted";
    locale: string;
    priceId: string;
  }

  export default function SubscriptionCheckoutForm({
    uiMode,
    locale,
    priceId,
  }: CheckoutFormProps): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);

    const formAction = async (): Promise<void> => {
      setLoading(true);

      const formData = new FormData();
      formData.append("uiMode", uiMode);
      formData.append("priceId", priceId);
      formData.append("locale", locale);
      formData.append("purchaseType", "subscription");

      const { url } = await createCheckoutSession(formData);

      if (url) {
        window.location.assign(url);
      }

      setLoading(false);
    };

    return (
      <>
        <button
          className="w-full mt-2 py-2 text-black bg-transparent border-2 border-black hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-500"
          onClick={formAction}
          disabled={loading}
        >
          Join Now
        </button>
      </>
    );
  }