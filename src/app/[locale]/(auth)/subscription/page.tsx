import React, { JSX } from "react";
import type { Metadata } from "next";
import SubscriptionCheckoutForm from "../../components/Subscription/stripe/SubsctiptionCheckoutForm";

export const metadata: Metadata = {
  title: "Furniture Subscription",
};

export default async function IndexPage(props: {
  params: Promise<{ locale?: string }>;
}): Promise<JSX.Element> {
  const params = await props.params;
  const locale = (params?.locale) || "en";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 dark:text-white">
      <div className="w-full md:w-[70%] mt-[90px] p-6 bg-white border border-gray-300 rounded-lg shadow-md dark:bg-slate-700 dark:border-slate-800 max-h-[800px] overflow-y-auto scrollbar">
        <h2 className="text-2xl sm:text-3xl font-bold text-center dark:text-black text-gray-700 mb-6">
          Discover Exclusive Furniture Trends
        </h2>
        <p className="w-full text-center my-5 italic text-sm sm:text-base">
          Subscribe to our catalog service and stay ahead with the latest in
          furniture design and styling ideas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="border p-4 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold">Monthly Digital Catalogue</h2>
            <p className="text-lg font-semibold mt-2 text-green-600">$4.99/month</p>
            <ul className="min-h-[150px] mt-5 text-sm sm:text-base">
              <li>Access to exclusive online catalogues</li>
              <li>Latest furniture trends and styling tips</li>
              <li>Special member discounts</li>
            </ul>
            <SubscriptionCheckoutForm
              uiMode="hosted"
              locale={locale}
              priceId="price_1QoV05GLVuRBQn3TURaW1vn8"
            />
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold">Quarterly Print Catalogue</h2>
            <p className="text-lg font-semibold mt-2 text-green-600">$14.99/month</p>
            <ul className="min-h-[150px] mt-5 text-sm sm:text-base">
              <li>Beautifully printed furniture catalogues</li>
              <li>Delivered straight to your doorstep</li>
              <li>Exclusive styling tips from top designers</li>
            </ul>
            <SubscriptionCheckoutForm
              uiMode="hosted"
              locale={locale}
              priceId="price_1QoV2iGLVuRBQn3To7nGdImx"
            />
          </div>

          <div className="border p-4 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold">Premium VIP Catalogue</h2>
            <p className="text-lg font-semibold mt-2 text-green-600">$49.99/month</p>
            <ul className="min-h-[150px] mt-5 text-sm sm:text-base">
              <li>Annual premium furniture catalogue</li>
              <li>Exclusive early access to new collections</li>
              <li>Personalized furniture styling consultations</li>
              <li>Special discount codes for members</li>
            </ul>
            <SubscriptionCheckoutForm
              uiMode="hosted"
              locale={locale}
              priceId="price_1QoV3zGLVuRBQn3ToIPeavTc"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
