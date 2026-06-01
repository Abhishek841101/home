import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";

// FIX DEFAULT MARKER ICON ISSUE
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

function LocationMarker({ setForm }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;

      setPosition(e.latlng);

      // 🌍 FREE REVERSE GEOCODING (NO CARD)
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      )
        .then((res) => res.json())
        .then((data) => {
          setForm((prev) => ({
            ...prev,
            location: data.display_name,
            lat,
            lng,
          }));
        });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function MapPicker({ setForm }) {
  return (
    <div className="w-full h-[450px] rounded-xl overflow-hidden border shadow">

      <MapContainer
        center={[20.5937, 78.9629]} // India center
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >

        {/* FREE MAP TILES */}
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker setForm={setForm} />

      </MapContainer>

    </div>
  );
}