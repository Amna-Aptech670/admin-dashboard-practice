import express from 'express'
import "dotenv/config"
import cors from "cors";
import database from './src/config/dbConfig.js'
import authRouter from './src/routes/authRoute.js'

const app = express()
const allowedOrigin = "http://localhost:5173"
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

app.use(express.json())
app.use("/auth", authRouter)

const port = process.env.PORT

database()

app.listen(port, ()=> {
    console.log(`http://localhost:${port}`);
})