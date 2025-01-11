import LngLatPopup from '@/components/lng-lat-popup'

export default function LngLatPopupPage({
  coordinates,
  location
}: {
  coordinates: mapboxgl.LngLatLike
  location: string
}) {
  return (
    <LngLatPopup
      longitude={coordinates.lng}
      latitude={coordinates.lat}
      location={location}
    />
  )
}
