"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { MyMapProps } from "./MyMap";
import useLocationStore from "../../store/locationStore"; // Import the store

const MyMap = dynamic<MyMapProps>(() => import("./MyMap"), { ssr: false });

export default function Page() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { setLocation } = useLocationStore(); // Zustand store

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    const userConfirmed = window.confirm("Do you want to confirm this location?");
    if (userConfirmed) {
      setSelectedLocation(location);
      setLocation(location); // Store location globally
      router.push("/dashboard/MANAGER"); // Redirect after confirmation
    }
  };

  return (
    <div>
      <h1>Map Page</h1>
      <MyMap onLocationSelect={handleLocationSelect} />
      {selectedLocation && (
        <p>Selected: {selectedLocation.lat}, {selectedLocation.lng}</p>
      )}
    </div>
  );
}
