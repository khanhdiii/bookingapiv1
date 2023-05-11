import express from "express"
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/veryfyToken.js";

const router = express.Router()

//UPDATE
router.put("/:id", verifyAdmin, updateUser);

//DELETE
router.delete("/:id", verifyAdmin, deleteUser);

//GET
router.get("/:id", verifyAdmin, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router