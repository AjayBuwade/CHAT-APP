# Real-Time Chat Application

![MERN Stack](https://img.shields.io/badge/MERN-Stack-blue)
![Socket.IO](https://img.shields.io/badge/Socket.IO-Real%20Time-black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-orange)

A full-stack, real-time messaging application built with the MERN stack. It features instant bi-directional communication, media handling for user profiles, and granular message control, designed to handle concurrent multi-user sessions efficiently.

##  Live Demo
https://chat-app-ebou.vercel.app/

##  Key Features
- **Real-Time Messaging:** Instant, bi-directional communication across concurrent sessions using Socket.IO, ensuring live state synchronization.
- **Optimized Media Delivery:** Profile picture uploads powered by Cloudinary, reducing payload bottlenecks and cutting image upload latency.
- **Message Management:** Users have full control over their data with the ability to delete specific sent messages.
- **History Clearance:** Functionality to wipe entire conversation histories cleanly.
- **Secure Authentication:** JWT-based user authentication and secure routing.
- **Responsive UI:** Clean, mobile-friendly frontend designed for a seamless user experience.

## 🛠️ Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Real-Time Communication:** Socket.IO
- **Media Storage:** Cloudinary
- **Deployment:** Vercel (Frontend), Render (Backend)

## 🏗️ Local Development Setup

### Prerequisites
- Node.js installed
- MongoDB URI
- Cloudinary Account credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AjayBuwade/CHAT-APP.git
   cd CHAT-APP
   ```

2. **Setup Environment Variables:**
   Create a `.env` file in the backend directory and add the following:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

3. **Install Dependencies:**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

4. **Run the Application:**
   ```bash
   # In the backend directory
   npm run dev

   # In the frontend directory
   npm start
   ```

## 📈 Performance Highlights
- Streamlined media handling architecture eliminated payload bottlenecks during concurrent sessions.
- Socket.IO integration guarantees zero-refresh instant message delivery.
