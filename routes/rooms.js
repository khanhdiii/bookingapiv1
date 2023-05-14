import express from "express"
import { createRoom, deleteRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js"
import { verifyAdmin } from "../utils/veryfyToken.js"

const router = express.Router()

//CREATE
router.post("/:hotelid", verifyAdmin, createRoom)

//UPDATE
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)

//DELETE
router.delete("/:id/:hotelid", deleteRoom)

//GET
router.get("/:id", getRooms)

//GET ALL
router.get("/", getRooms)

export default router