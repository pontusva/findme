import { MapPin, Compass, Globe } from 'lucide-react'

interface LngLatPopupProps {
  longitude: number;
  latitude: number;
  location: string;
}

export default function LngLatPopup({ longitude, latitude, location }: LngLatPopupProps) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Location Info</h3>
        <MapPin className="h-5 w-5" />
      </div>
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Coordinates</p>
          <div className="flex items-center space-x-2">
            <Compass className="h-4 w-4 text-blue-500" />
            <p className="text-sm font-medium">
              {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
            </p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Location</p>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4 text-blue-500" />
            <p className="text-sm font-medium">{location}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Tip: Click on the map to update coordinates
          </p>
        </div>
      </div>
    </div>
  )
}

