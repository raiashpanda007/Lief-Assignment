"use client";
import { Button } from "antd";
import { signIn } from "next-auth/react";

const JoinButton = ({ type, label, className }: {
  type: "primary" | "default";
  label: "Join as Manager" | "Join as Worker";
  className?: string;
}) => {
  const handleJoin = () => {
    const role = label === "Join as Manager" ? "manager" : "worker";
    
    // Store role in cookies
    document.cookie = `userRole=${role}; path=/; max-age=3600`;
    
    // Authenticate user
    signIn("google");
  };

  return (
    <Button
      type={type}
      size="large"
      className={`px-6 py-3 text-lg rounded-lg shadow-md transition duration-300 ${className}`}
      onClick={handleJoin}
    >
      {label}
    </Button>
  );
};

export default JoinButton;
