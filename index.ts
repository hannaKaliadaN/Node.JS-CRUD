const PORT = process.env.PORT || 5000;

import express from 'express';
import productRouter from './src/product-router';
import userRouter from './src/user-router';


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started ${PORT}`));
    } catch (e) {
        console.log(e)
    }

}

const app = express();
app.use(express.json());

app.get("/", (req, res) => { res.send({ message: "Server work" }) })
app.use("/products", productRouter);
app.use("/users", userRouter);

start()