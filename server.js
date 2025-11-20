import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import linkRoutes from "./routes/linkRoutes.js";
import Link from "./models/Link.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB()
app.use("/api", linkRoutes)
app.get("/:shortId", async (req, res) => {
    try {
        const link = await Link.findOne({ shortId: req.params.shortId });

        if (!link) return res.status(404).send("Link not found");

        link.clicks += 1;
        await link.save();

        return res.redirect(link.originalUrl);

    } catch (err) {
        res.status(500).send("Server error");
    }
});

app.get("/", (req, res) => {
    res.send("URL Shortener API Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));
