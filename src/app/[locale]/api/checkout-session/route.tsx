import { NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

interface PostRequestBody {
    sessionId: string;
}

interface StripeSession {
    payment_status: string;
    client_reference_id: string | null;
}

export async function POST(request: Request): Promise<Response> {
    const { sessionId }: PostRequestBody = await request.json();

    try {
        const session: StripeSession = await stripe.checkout.sessions.retrieve(sessionId);

        console.log(session);
        if (session.payment_status === 'paid') {
            // Update your database to mark the user as subscribed
            // await updateUserSubscriptionStatus(session.client_reference_id, 'active');
        }

        return NextResponse.json({ session });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 400 });
    }
}