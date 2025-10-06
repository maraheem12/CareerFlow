import express from "express"
import cors from "cors"
import "dotenv/config"

// Initialize express
const app = express();

//Middlewares 
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send("API Working") )

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening of port ${PORT}`)
})

