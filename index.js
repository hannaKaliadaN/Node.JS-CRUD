const { existsSync } = require('node:fs')
const { resolve } = require('node:path')

const envFile = resolve(__dirname, '.env')
if (existsSync(envFile)) {
    process.loadEnvFile(envFile)
}

const PORT = process.env.PORT || 5000;

const MONGODB_URI = process.env.MONGODB_URI
const POSTGRESQL_URI = process.env.POSTGRESQL_URI

const mongoose = require('mongoose')
const express = require('express');
const productRouter = require('./src/product-router')

const start = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error('MONGODB_URI is not set. Add it to my-project/.env or the environment.')
        }
        await mongoose.connect(MONGODB_URI);
        app.listen(PORT, () => console.log(`Server started ${PORT}`));
    } catch (e) {
        console.log(e)
    }

}

const app = express();
app.use(express.json());

app.get("/", (req, res) => { res.send({ message: "Server work" }) })
app.use("/products", productRouter)

start()