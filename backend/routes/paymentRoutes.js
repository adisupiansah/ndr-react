import express from "express";
import midtransClient from "midtrans-client";

const router = express.Router();

router.post("/process-transaction", async (req, res) => {
    try {
        const { name, orderId, totalAmount } = req.body;

        // Validasi data
        if (!name || !orderId || !totalAmount || isNaN(totalAmount)) {
            return res.status(400).json({ message: 'Invalid input data' });
        }

        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: 'SB-Mid-server-Grz4IHAYJp46_dYpSKRFwGzx',
            clientKey: 'SB-Mid-client-eDfsQTa-YuStaNqi'
        });

        const parameters = {
            transaction_details: {
                order_id: orderId,
                gross_amount: totalAmount
            },
            customer_details: {
                first_name: name
            }
        };

        const transaction = await snap.createTransaction(parameters);
        const dataPayment = {
            response: JSON.stringify(transaction)
        };

        const token = transaction.token;
        res.status(200).json({ message: "berhasil bayar", dataPayment, token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
