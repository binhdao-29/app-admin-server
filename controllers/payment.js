import Stripe from "stripe";

const stripe = Stripe(
  "sk_test_51Lnw5DI9vWtEconLnhpiKjemoBHZrt0rl46ChyYT0IerMcDlKV8gz5kGTKUiPclNywSRzfApxtYBriarS6fjvGtb00PmpxEsRe"
);
const YOUR_DOMAIN = "http://localhost:5000";

export const paymentCheckout = async (req, res) => {
  const params = {
    submit_type: "pay",
    mode: "payment",
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    shipping_options: [
      { shipping_rate: "shr_1Lnwe7I9vWtEconLTWXlatwt" },
      { shipping_rate: "shr_1MFwGLI9vWtEconLqwBwRI6n" },
      { shipping_rate: "shr_1MFwKaI9vWtEconLbjs319Jm" },
    ],
    line_items: req.body.map((item) => {
      const img = item.image[0].asset._ref;
      const newImage = img
        .replace("image-", "https://cdn.sanity.io/images/vvagwcqy/production/")
        .replace("-webp", ".webp");

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [newImage],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
        },
        quantity: item.quantity,
      };
    }),
    success_url: `${req.headers.origin}/success`,
    cancel_url: `${req.headers.origin}/canceled`,
  };

  const session = await stripe.checkout.sessions.create(params);

  // res.redirect(303, session.url);

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
};
