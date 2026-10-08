import { db } from "./prisma/db";
import type { Request, Response } from 'express';


const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await db.orm.public.Product.all();
        res.json(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        res.status(500).json({ message: "Failed to fetch products" });
    }


}

const getProductByID = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ message: 'Invalid product id' });
    }

    try {
        const product = await db.orm.public.Product.first({ id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error("Failed to fetch product:", error);
        res.status(500).json({ message: "Failed to fetch product" });
    }
}

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await db.orm.public.Product.create(req.body);
        res.json(product);
    } catch (error) {
        console.error("Failed to create product:", error);
        res.status(500).json({ message: "Failed to create product" });
    }
}

const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ message: 'Invalid product id' });
    }
    let product
    try {
        product = await db.orm.public.Product.where({ id }).update(req.body)
    } catch (error) {
        console.error("Failed to update product:", error);
    }
    if (!product) {
        return res.status(404).send({ message: 'Product not found' })
    }
    res.send(product)
}

const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
        return res.status(400).json({ message: 'Invalid product id' });
    }

    try {
        await db.orm.public.Product.where({ id }).delete();
        return res.status(204).end();
    } catch (error) {
        console.error("Failed to delete product:", error);
        return res.status(500).json({ message: "Failed to delete product" });
    }
}


export default {
    getProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
}