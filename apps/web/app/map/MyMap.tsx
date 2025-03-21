"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Reuse the same Location interface
export interface Location {
  lat: number;
  lng: number;
}

export interface MyMapProps {
  onLocationSelect: (location: Location) => void;
}

function LocationPicker({ onLocationSelect }: MyMapProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userPosition: [number, number] = [
            pos.coords.latitude,
            pos.coords.longitude,
          ];
          setPosition(userPosition);
          onLocationSelect({ lat: userPosition[0], lng: userPosition[1] });
        },
        (error) => {
          console.error("Geolocation error:", error);
          const fallback: [number, number] = [51.505, -0.09];
          setPosition(fallback);
          onLocationSelect({ lat: fallback[0], lng: fallback[1] });
        }
      );
    } else {
      const fallback: [number, number] = [51.505, -0.09];
      setPosition(fallback);
      onLocationSelect({ lat: fallback[0], lng: fallback[1] });
    }
  }, [onLocationSelect]);

  // Listen for map clicks to update location
  useMapEvents({
    click(e: L.LeafletMouseEvent) {
      const userConfirmed = window.confirm("Select this location?");
      if (userConfirmed) {
        const newLoc: [number, number] = [e.latlng.lat, e.latlng.lng];
        setPosition(newLoc);
        onLocationSelect({ lat: newLoc[0], lng: newLoc[1] });
      }
    },
  });

  if (!position) return null; // Wait until we have a valid position

  return <Marker position={position} />;
}

export default function MyMap({ onLocationSelect }: MyMapProps) {
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapCenter([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {
          setMapCenter([51.505, -0.09]);
        }
      );
    } else {
      setMapCenter([51.505, -0.09]);
    }
  }, []);

  if (!mapCenter) {
    return <p style={{ color: "white" }}>Loading map...</p>;
  }

  return (
    <div className="w-full h-full">
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "800px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationPicker onLocationSelect={onLocationSelect} />
      </MapContainer>
    </div>
  );
}
