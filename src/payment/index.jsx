/** @format */

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { creatIntent } from "./backend";
import { useContext, useEffect, useState } from "react";
import CheckoutForm from "./chekoutForm";
import { cartContext } from "../providers/cartContextProvider";

const Payment = () => {
  const [intent, setIntent] = useState();
  const { subTotal, setCartItems } = useContext(cartContext);
  const stripePromise = loadStripe(
    "pk_test_51OWdVECDeHHARBtPeTx7sMNwFrDNU8qH9otMrvSG1zNoeNISalkiH7klfQysgzx2tRUti7yOR8JOExwRui8PzP2E00qvvETHYB"
  );

  useEffect(() => {
    loadIntent();
  }, []);
  async function loadIntent() {
    const res = await creatIntent(subTotal);
    setIntent(res);
    clearCart();
  }
  async function clearCart() {
    setCartItems([]);
  }
  if (!intent) {
    return <div>Loading...</div>;
  }
  return (
    <Elements
      stripe={stripePromise}
      options={{ clientSecret: intent.client_secret }}
    >
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
