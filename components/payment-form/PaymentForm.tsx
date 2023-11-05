"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../button/Button";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectCartTotal } from "@/redux-saga-store/cart/cart.selector";
import { selectCurrentUser } from "@/redux-saga-store/user/user.selector";

const isValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const [loading, setIsLoading] = useState(false);


    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        //send request to the server to get payment intent
        const response = await axios.post(`api/payment`, {
            amount: amount * 100, //stripe is expecting cents
        });

        //get client secret from the response
        //this secret is used to identify the client
        const { client_secret } = response.data;

        //we have the card element from stripe which contains the card details entered by the user
        //you can just pass it in here 

        const cardDetails = elements.getElement(CardElement);
        if (!isValidCardElement(cardDetails)) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    //The nullish coalescing operator allows you to specify a default value if the left-hand side is null or undefined.
                    //At least that is what ai said. I trust it.
                    name: currentUser?.displayName ?? "guest",
                }
            }
        });

        setIsLoading(false);

        if (paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === "succeeded") {
                alert("payment successful")
            }
        }
    }

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit card payment:</h2>
                <CardElement />
                <PaymentButton isLoading={loading} type="submit" buttonType={BUTTON_TYPE_CLASSES.base}>Pay</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    )
}

export default PaymentForm