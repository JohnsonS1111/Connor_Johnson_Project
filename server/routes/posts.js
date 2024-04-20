import express from "express";
import {getFeedPosts, getUserPosts, likePosts} from "../controllers/posts.js"
import {verifiedToken} from "../middleware/auth.js"
const router = express.Router();


router.get("/", verifiedToken, getFeedPosts);
router.get("/:userId/posts", verifiedToken, getUserPosts);
router.patch("/:id/liked", verifiedToken, likePosts);


export default router;