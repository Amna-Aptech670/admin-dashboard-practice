import mongoose from "mongoose";

const database = () => mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Database connected"))
.catch((e) => console.log(exports))

export default database