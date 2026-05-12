import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

// import User from "../models/user.model.js"; // Upar check karein ki yeh import hai ya nahi

export const deleteUserFromDB = async (req, res) => {
    try {
        const userIdToDelete = req.params.id;
        
        // Database se user ko hamesha ke liye delete kar do
        await User.findByIdAndDelete(userIdToDelete);
        
        res.status(200).json({ message: "User permanently deleted " });
    } catch (error) {
        console.error("Error in deleteUserFromDB: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Profile picture update karne ka function
export const updateProfilePic = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ error: "Profile picture is required" });
        }

        // User ko dhoondo aur uski profilePic update kar do
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: profilePic },
            { new: true } // Yeh naya updated user return karega
        ).select("-password"); // Password mat bhejna security ke liye

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in updateProfilePic: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};