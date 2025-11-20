import express from "express";
import { createShortUrl, redirectUrl, getAllLinks } from "../controllers/linkController.js";


const router = express.Router();


router.post("/shorten", createShortUrl);
router.get("/links", getAllLinks);
router.get("/:shortId", redirectUrl);


export default router;