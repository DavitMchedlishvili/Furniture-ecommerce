export interface CartItems {
    id?: number;
    name?: string;
    image?: string;
    price?: number;
    name_ka?: string;  // Assuming this is the name in Georgian
    quantity?: number;
    product_id?: number;
    stripe_price_id?: string;
  }