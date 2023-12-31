"use client"
import React from 'react';
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/utils/stripe/stripe.utils'


export function StripeProvider({ children }: { children: React.ReactNode }) {
    return (
        <Elements stripe={stripePromise}>
            {children}
        </Elements>
    );
}


