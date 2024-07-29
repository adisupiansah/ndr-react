import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import PaymentRoutes from "./routes/paymentRoutes.js"

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api/payment", PaymentRoutes)

export default app
