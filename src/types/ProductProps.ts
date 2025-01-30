export interface ProductProps {
  name?: string; // Product name (optional)
  name_ka?:string,
  price?: number; // Price of the product (optional)
  image?: string; // URL to product image (optional)
  user_id?: string; // ID of the user who created the product (optional)
  color?: string; // Color of the product (optional)
  height?: number; // Height of the product (optional)
  total_height?: number; // Total height (if applicable) (optional)
  seat_height?: number; // Height of the seat (for chairs, etc.) (optional)
  width?: number; // Width of the product (optional)
  weight?: number; // Weight of the product (optional)
  wood_type?: string; // Type of wood used (optional)
  category?: string; // Category of the product (optional)
  description?: string; // Description of the product (optional)
  stripe_product_id?: string; // Stripe product ID (optional)
  stripe_price_id?: string; // Stripe price ID (optional)
  id?: number; // Unique product identifier (required)
}
