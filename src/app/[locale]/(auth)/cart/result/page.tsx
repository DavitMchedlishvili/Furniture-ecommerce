import type { Stripe } from "stripe";
import { createClient } from "@/utils/supabase/server";
import { stripe } from "@/lib/stripe/stripe";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import packageImage from "../../../../../../public/assets/package.png"
export default async function ResultPage(props: {
  searchParams: Promise<{ session_id: string }>;
}): Promise<JSX.Element> {
  const supabase = await createClient();

  const searchParams = await props.searchParams;
  if (!searchParams.session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });
    console.log("metadata",checkoutSession.metadata)

  const productIdsString = checkoutSession.metadata?.product_ids;
  if (!productIdsString) {
    throw new Error("No product IDs found in the session metadata.");
  }

  const productIds = productIdsString.split(",");

  console.log("productIds:", productIds);
  console.log("productIdsString:", productIdsString);

  const userResponse = await supabase.auth.getUser();
  const userId = userResponse.data.user?.id;

  if (!userId) throw new Error("User is not authenticated.");


  const { error: clearCartError } = await supabase
    .from("cartItem")
    .delete()
    .in("product_id", productIds); // Use the product IDs for deletion

  if (clearCartError) {
    console.error("Error clearing the cart:", clearCartError);
    throw new Error("Failed to clear the cart.");
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-slate-700 dark:text-white p-6 space-y-8">
  <p className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
    Thanks for your order!
  </p>

  <Image
    src={packageImage}
    alt="orderBox"
    width={300}
    height={300}
    priority
    
  />

  <Link
    href={"/"}
    className="hover:underline"
  >
    Go back to home
  </Link>
</div>

  );
}