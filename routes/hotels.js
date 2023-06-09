import express from "express";
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    getHotel,
    getHotelRooms,
    getHotels,
    updateHotel,
} from "../controllers/hotel.js";
import { verifyAdmin } from "../utils/veryfyToken.js";
import Hotel from "../models/Hotel.js";

const router = express.Router();

router.post("/", createHotel);
router.put("/:id", verifyAdmin, updateHotel);
router.delete("/:id", deleteHotel);
router.get("/find/:id", getHotel);
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
