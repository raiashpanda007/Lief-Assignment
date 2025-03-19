"use client"

import { useSession } from "next-auth/react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

function HomeButton() {
  const { data: user, status } = useSession();
  const router = useRouter();
    const userRole = user?.user?.role;
  return (
    <>
      {status === "authenticated" ? (
        <Button type="primary" onClick={()=>router.push(`/dashboard/${userRole}`)}>Welcome, {user.user?.name} as {user?.user?.role}</Button>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default HomeButton;
