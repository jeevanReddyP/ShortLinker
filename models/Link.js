import mongoose from "mongoose";


const linkSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortId: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.model("Link", linkSchema);