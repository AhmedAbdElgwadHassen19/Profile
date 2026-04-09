import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      "i.pinimg.com",
      "cdn.pixabay.com",
      "images.unsplash.com",
      "plus.unsplash.com",
      "res.cloudinary.com",
      "*.ngrok-free.app",
      "firebasestorage.googleapis.com",
      "i.pravatar.cc",
    ].map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;