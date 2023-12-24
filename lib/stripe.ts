import Stripe from 'stripe';
let stripeApiVersion: "2023-10-16" = "2023-10-16";

export const stripe= new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: stripeApiVersion,
    typescript: true
});