import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js";
import "./config/instrument.js"
import * as Sentry from "@sentry/node";

// Initialize express
const app = express();

await connectDB();

//Middlewares 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("API Working") )
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

const PORT = process.env.PORT || 5000;
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () => {
    console.log(`Server is listening of port ${PORT}`)
})

