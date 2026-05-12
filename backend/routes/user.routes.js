import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar, deleteUserFromDB, updateProfilePic } from "../controllers/user.controller.js"; // 👈 updateProfilePic add kiya

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.delete("/:id", protectRoute, deleteUserFromDB);
router.put("/profile-pic", protectRoute, updateProfilePic); // Nayi line add ki

export default router;