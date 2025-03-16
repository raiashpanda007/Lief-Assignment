"use client"
import { Button } from "antd";
import {useRouter} from "next/navigation"
const JoinButton = ({ type, label, className }:{
  type: "primary" | "default",
  label: string,
  className?: string
}) => {
  const router = useRouter();
  return (
    <Button type={type} size="large" className={`px-6 py-3 text-lg rounded-lg shadow-md transition duration-300 ${className}`} onClick={() => router.push("/signup")}>
      {label}
    </Button>
  );
};

export default JoinButton;