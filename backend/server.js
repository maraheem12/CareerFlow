import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js";
import "./config/instrument.js"
import * as Sentry from "@sentry/node";

import { clerkWebhooks } from "./controllers/webhooks.js"
import { clerkMiddleware } from "@clerk/express"


import companyRoutes from "./routes/companyRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
import userRoutes from "./routes/userRoutes.js"

await connectDB();
// Initialize express

const app = express();
app.use(cors())


//Middlewares 
app.use(express.json())
app.use(clerkMiddleware())
app.use("/api/company", companyRoutes)
app.use("/api/jobs", jobRoutes)
app.use('/api/users', userRoutes)


app.get('/', (req, res) => res.send("API Working") )
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});


//Routes for backendapp.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhooks);
app.post("/webhooks", express.raw({ type: "application/json" }), clerkWebhooks);

//app.post("/webhooks", clerkWebhooks);

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
    console.log(`Server is listening of port ${PORT}`)
})

