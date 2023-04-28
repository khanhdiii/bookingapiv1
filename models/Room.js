import mongoose from "mongoose";
const RoomSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        roomNumbers: [{
            number: Number,
            unavailableDates: { type: [Date] },
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                auto: true
            }
        }],
    },
    { timestamps: true }
);

[
    { number: 101, unavailableDates: [] },
    { number: 102, unavailableDates: [] },
    { number: 103, unavailableDates: [] },
    { number: 104, unavailableDates: [] },
    { number: 105, unavailableDates: [] },
    { number: 106, unavailableDates: [] },
    { number: 107, unavailableDates: [] },
    { number: 108, unavailableDates: [] },
    { number: 109, unavailableDates: [] },
    { number: 201, unavailableDates: [] },
    { number: 202, unavailableDates: [] },
    { number: 203, unavailableDates: [] },

]

export default mongoose.model("Room", RoomSchema);
