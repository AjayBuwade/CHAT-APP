import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import { useAuthContext } from "../../context/AuthContext";
import { useRef, useState } from "react";

const LogoutButton = () => {
    const { loading, logout } = useLogout();
    const { authUser, setAuthUser } = useAuthContext();
    const fileRef = useRef(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Image size limit check (Max 2MB) taaki database full na ho
        if(file.size > 2 * 1024 * 1024) {
            alert("Image size should be less than 2MB");
            return;
        }

        // Image ko Base64 String mein convert karna
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            setUploading(true);
            try {
                const res = await fetch("/api/users/profile-pic", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ profilePic: base64Image }),
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                
                // Browser ki memory aur Context update karna
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
                alert("Profile picture updated successfully!");
            } catch (error) {
                alert(error.message);
            } finally {
                setUploading(false);
            }
        };
    };

    return (
        <div className='mt-auto pt-4 flex justify-between items-center'>
            {!loading ? (
                <BiLogOut className='w-6 h-6 text-white cursor-pointer hover:text-red-500' onClick={logout} title="Logout" />
            ) : (
                <span className='loading loading-spinner'></span>
            )}

            {/* User Profile Info & Upload */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-300 font-semibold">{authUser.fullName}</span>
                
                <div className="relative group cursor-pointer" onClick={() => fileRef.current.click()} title="Change Profile Picture">
                    <img 
                        src={authUser.profilePic || "https://avatar.iran.liara.run/public/boy"} 
                        alt="profile" 
                        className={`w-9 h-9 rounded-full object-cover border-2 border-gray-500 ${uploading ? "opacity-50" : ""}`}
                    />
                    {/* Hover karne par 'Edit' dikhega */}
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full hidden group-hover:flex items-center justify-center text-[10px] text-white font-bold">
                        {uploading ? "..." : "EDIT"}
                    </div>
                    <input 
                        type="file" 
                        hidden 
                        ref={fileRef} 
                        accept="image/*" 
                        onChange={handleImageChange}
                        disabled={uploading}
                    />
                </div>
            </div>
        </div>
    );
};

export default LogoutButton;