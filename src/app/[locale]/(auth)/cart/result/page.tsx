import type { Stripe } from "stripe";
import { createClient } from "@/utils/supabase/server";
import { stripe } from "@/lib/stripe/stripe";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import packageImage from "../../../../../../public/assets/package.png";

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

  console.log("metadata", checkoutSession.metadata);

  // Get all line items (contains product and quantity details)
  const lineItems = checkoutSession.line_items?.data || [];

  // Extract product quantities using Stripe price IDs
  const productQuantities: Record<string, number> = {};
  const stripePriceIds: string[] = [];

  lineItems.forEach((item) => {
    const priceId = item.price?.id as string;
    const quantity = item.quantity || 1;

    if (priceId) {
      productQuantities[priceId] = quantity;
      stripePriceIds.push(priceId);
    }
  });

  console.log("Product Quantities:", productQuantities);
  console.log("Stripe Price IDs:", stripePriceIds);

  // Fetch product details using the Stripe price_id (which should be mapped in Supabase)
  const { data: products, error: productError } = await supabase
    .from("products")
    .select("id, name, image, price, name_ka, stripe_price_id")
    .in("stripe_price_id", stripePriceIds);

  if (productError || !products) {
    console.error("Failed to fetch product details:", productError);
    throw new Error("Failed to fetch product details.");
  }

  console.log("Fetched products:", products);

  const userResponse = await supabase.auth.getUser();
  const userId = userResponse.data.user?.id;

  if (!userId) throw new Error("User is not authenticated.");

  // Extract payment ID from the checkout session
  const paymentId = checkoutSession.payment_intent;

  if (!paymentId) {
    console.error("Payment ID is missing from the session.");
    throw new Error("Payment ID is required.");
  }

  // Prepare order data for insertion, including the payment_id
  const ordersData = products.map((product) => ({
    stripe_price_id: product.stripe_price_id,
    user_id: userId,
    name: product.name,
    name_ka: product.name_ka,
    price: product.price,
    image: product.image,
    product_id: product.id,
    quantity: productQuantities[product.stripe_price_id] || 1, // Assign correct quantity
    created_at: new Date(), // Adding timestamp
    payment_id: paymentId, // Add the payment_id
  }));

  console.log("Orders Data:", ordersData);

  // Insert order records
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert(ordersData);

  if (orderError) {
    console.error("Error adding the order:", orderError);
    throw new Error("Failed to add the order.");
  }

  console.log("Order added:", orderData);

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
        className="w-[auto] h-[auto]"
        priority
      />

      <Link href={"/"} className="hover:underline">
        Go back to home
      </Link>
    </div>
  );
}
