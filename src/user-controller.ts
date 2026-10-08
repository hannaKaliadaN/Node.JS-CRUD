import { db } from "./prisma/db";
import type { Request, Response } from 'express';


const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await db.orm.public.User.all();
        res.json(users);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        res.status(500).json({ message: "Failed to fetch users" });
    }


}
const getUserWithArticlesandComments = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string' || !id) {
        return res.status(400).json({ message: 'Invalid user id' });
    }

    try {
        const user = await db.orm.public.User
            .select('id', 'login', 'role', 'createdAt', 'updatedAt')
            .include('articles', (articles) => articles.include('comments'))
            .first({ id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        console.error("Failed to fetch user with articles and comments:", error);
        return res.status(500).json({ message: "Failed to fetch user with articles and comments" });
    }
}


const getUserByID = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string' || !id) {
        return res.status(400).json({ message: 'Invalid user id' });
    }

    try {
        const user = await db.orm.public.User.first({ id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error("Failed to fetch user:", error);
        res.status(500).json({ message: "Failed to fetch user" });
    }
}

const createUser = async (req: Request, res: Response) => {
    try {
        const user = await db.orm.public.User.create(req.body);
        res.json(user);
    } catch (error) {
        console.error("Failed to create user:", error);
        res.status(500).json({ message: "Failed to create user" });
    }
}

const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string' || !id) {
        return res.status(400).json({ message: 'Invalid user id' });
    }
    let user
    try {
        user = await db.orm.public.User.where({ id }).update(req.body)
    } catch (error) {
        console.error("Failed to update user:", error);
    }
    if (!user) {
        return res.status(404).send({ message: 'User not found' })
    }
    res.send(user)
}

const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    if (typeof id !== 'string' || !id) {
        return res.status(400).json({ message: 'Invalid user id' });
    }

    try {
        await db.orm.public.User.where({ id }).delete();
        return res.status(204).end();
    } catch (error) {
        console.error("Failed to delete user:", error);
        return res.status(500).json({ message: "Failed to delete product" });
    }
}


export default {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    getUserWithArticlesandComments
}