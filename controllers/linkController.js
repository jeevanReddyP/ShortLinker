import Link from "../models/Link.js";
import { nanoid } from "nanoid";


export const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl) return res.status(400).json({ msg: "URL required" });


        const shortId = nanoid(6);


        const newLink = await Link.create({ originalUrl, shortId });


        res.json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
    } catch (err) {
        res.status(500).json(err);
    }
};


export const redirectUrl = async (req, res) => {
    try {
        const { shortId } = req.params;
        const link = await Link.findOne({ shortId });


        if (!link) return res.status(404).send("Invalid URL");


        link.clicks += 1;
        await link.save();


        return res.redirect(link.originalUrl);
    } catch (err) {
        res.status(500).json(err);
    }
};


export const getAllLinks = async (req, res) => {
    try {
        const links = await Link.find().sort({ createdAt: -1 });
        res.json(links);
    } catch (err) {
        res.status(500).json(err);
    }
};