import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import  connectDB  from './config/db.js'
import * as Sentry from "@sentry/node";
import {clerkWebhooks} from './controllers/webhooks.js'

// initialize express
const app = express()
// connect to mongodb
//await connectDB()

// middlewares
app.use(cors())
app.use(express.json())

// routes
app.get('/',(req,res)=> res.send("API Working"))

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWebhooks)

// port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);


// app.listen(PORT ,()=>{
//     console.log(`Server is running on port ${PORT}`);
// })

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
  }
}


startServer()