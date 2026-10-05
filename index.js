const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose')
const express = require('express');
const productRouter = require('./src/product-router')

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://hannakaliada_db_user:Hbk5jL53YvipPUgt@cluster0.pym3ryx.mongodb.net/?appName=Cluster0');
        app.listen(PORT, () => console.log(`Server started ${PORT}`));
    } catch (e) {
        console.log(e)
    }

}

const app = express();
app.use(express.json());

app.get("/", (req, res) => {res.send({ message: "Server work" })})
app.use("/products", productRouter)

start()