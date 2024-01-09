/** @format */

import { useContext } from "react";
import stripe from "stripe";

export async function creatIntent(subTotal) {
  return await stripe(
    "sk_test_51OWdVECDeHHARBtPE6Vu3WCgBCWfqwS9fxgq58JFNxLNq3uKcGtV3voTaaoI3zVV4YRFD6OwLgbEz4sypm7DBXwD00SRLDKvJk"
  ).paymentIntents.create({
    amount: subTotal * 100,
    currency: "usd",
    payment_method_types: ["card"],
  });
}
