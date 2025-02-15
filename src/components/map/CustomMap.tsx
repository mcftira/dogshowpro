import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface LocationSearchProps {
  onSelect: (lat: number, lng: number, address: string) => void;
}

interface CustomMapProps {
  center: [number, number];
  zoom: number;
  onLocationSelect: (lat: number, lng: number, address: string) => void;
  selectedLocation: [number, number] | null;
}

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await response.json();
        const address = data.display_name;
        onLocationSelect(lat, lng);
      } catch (error) {
        console.error('Error getting address:', error);
        onLocationSelect(lat, lng);
      }
    },
  });
  return null;
}

function UpdateMapCenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export function LocationSearch({ onSelect }: LocationSearchProps) {
  const [searchValue, setSearchValue] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [geolocating, setGeolocating] = useState(false);

  const searchLocation = async () => {
    if (!searchValue.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchValue)}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error('Error searching location:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item: any) => {
    onSelect(
      parseFloat(item.lat),
      parseFloat(item.lon),
      item.display_name
    );
    setSuggestions([]);
    setSearchValue(item.display_name);
  };

  const handleUseMyLocation = () => {
    setGeolocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            onSelect(latitude, longitude, data.display_name);
            setSearchValue(data.display_name);
          } catch (error) {
            console.error('Error getting address:', error);
            onSelect(latitude, longitude, `${latitude}, ${longitude}`);
            setSearchValue(`${latitude}, ${longitude}`);
          }
          setGeolocating(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setGeolocating(false);
        },
        { enableHighAccuracy: true }
      );
    }
  };

  return (
    <div className="relative space-y-2">
      <div className="flex gap-2">
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search locations..."
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          onClick={searchLocation}
          disabled={loading || !searchValue}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleUseMyLocation}
        disabled={geolocating}
      >
        <MapPin className="h-4 w-4 mr-2" />
        {geolocating ? 'Getting location...' : 'Use my location'}
      </Button>

      {suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-background border rounded-md shadow-lg">
          {suggestions.map((item) => (
            <li
              key={item.place_id}
              onClick={() => handleSelect(item)}
              className="px-3 py-2 hover:bg-muted cursor-pointer text-sm"
            >
              {item.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function CustomMap({ center, zoom, onLocationSelect, selectedLocation }: CustomMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <UpdateMapCenter center={center} />
      <MapEvents
        onLocationSelect={(lat, lng) => {
          onLocationSelect(lat, lng, `${lat}, ${lng}`);
        }}
      />
      {selectedLocation && (
        <Marker position={selectedLocation} icon={customIcon} />
      )}
    </MapContainer>
  );
}