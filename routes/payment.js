import express from "express";
import { paymentCheckout } from "../controllers/payment.js";

const router = express.Router();

router.post("/", paymentCheckout);

export default router;
