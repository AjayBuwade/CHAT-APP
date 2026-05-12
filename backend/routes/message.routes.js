import express from "express";
import { getMessages, sendMessage, deleteMessage, deleteFullChat } from "../controllers/message.controller.js"; //  deleteMessage add kiya
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/:id", protectRoute, deleteMessage); //  line add ki
router.delete("/clear/:id", protectRoute, deleteFullChat);

export default router;