import express from "express"
import morgan from "morgan"
import desafioRoutes from "./routes/desafio.routes"

const app = express()

// settings
app.set("port", 4000)

// middelware
app.use(express.json())
app.use(morgan("dev"))

// routes
app.use("/api/sisnova", desafioRoutes)

export default app