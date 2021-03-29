const stripe = require("stripe")(
  "pk_test_51I9klBJkXS0TaPcZHJu2V0mU4pT3DyisEK9SQdkBHiB6AbxHlVADlpuYdeHBTL1vDfgzYwQzxVZ37zdCSIsa5JKR00YYyO9jzX"
);
const express = require("express");
const app = express();
app.use(express.static("."));

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    customer_email: "customer@example.com",
    submit_type: "donate",
    billing_address_collection: "auto",
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Stubborn Attachments",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${viankabeauty.com}/success.html`,
    cancel_url: `${viankabeauty.com}/cancel.html`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log("Running on port 4242"));
