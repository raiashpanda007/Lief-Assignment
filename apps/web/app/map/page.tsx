"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

// Define the props interface for MyMap
export interface MyMapProps {
  onLocationSelect: (location: { lat: number; lng: number }) => void;
}

// Dynamically import MyMap with SSR disabled and proper typing
const MyMap = dynamic<MyMapProps>(() => import("./MyMap"), { ssr: false });

export default function Page() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setSelectedLocation(location);
  };

  return (
    <div style={{ padding: 20, backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 style={{ color: "white" }}>Map Page</h1>
      <div style={{ marginBottom: 20 }}>
        <MyMap onLocationSelect={handleLocationSelect} />
      </div>
      <p style={{ color: "white" }}>
        <strong>Selected Location:</strong> {selectedLocation.lat}, {selectedLocation.lng}
      </p>
    </div>
  );
}
