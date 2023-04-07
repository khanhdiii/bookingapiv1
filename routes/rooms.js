import express from "express"
import { createRoom, deleteRoom, getRooms, updateRoom } from "../controllers/room.js"
import { verifyAdmin } from "../utils/veryfyToken.js"

const router = express.Router()

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom)

//UPDATE
router.put("/:id", verifyAdmin, updateRoom)

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom)

//GET
router.get("/:id", getRooms)

//GET ALL
router.get("/", getRooms)

export default router