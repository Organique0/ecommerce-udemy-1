import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2023-10-16",
    typescript: true,
});

//for some reason we only create an intent to pay and return it.
//why can't we just complete the payment? I don't know.
export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        });
        return NextResponse.json(paymentIntent);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error }, { status: 400 });
    }
}


