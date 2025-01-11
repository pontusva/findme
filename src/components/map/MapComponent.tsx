import {
  useRef,
  useState,
  Dispatch,
  SetStateAction
} from 'react'
import { SearchBox as SearchBoxComponent } from '@mapbox/search-js-react'
import mapboxgl from 'mapbox-gl'
import Map, { Popup, MapRef, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@/css/mapbox.css'
import LostPetDetailsPopupPage from '@/app/popup/LostPetDetailsPopupPage'
import {
  LostPets,
  LostPetsWithDetails
} from '@/data/useGetPetsForMap'

interface PopupComponentProps {
  location: string
  coordinates: {
    lng: number
    lat: number
  }
}

interface MapComponentProps {
  shouldShowPopup: boolean
  LngLatPopupPage?: React.ComponentType<PopupComponentProps>
  lostPets?: LostPets
  lostPetsWithDetails?: LostPetsWithDetails
  height?: number
  setAddress?: (address: string) => void
  setCoordinates?: Dispatch<
    SetStateAction<{ lat: number; lng: number }>
  >
}

const accessToken =
  'pk.eyJ1IjoiMWh5cGVyc2xhcCIsImEiOiJjbTRwcHRtencwd2k5Mmpxc253eWhqdmhoIn0.J-9ZNZy2OADgNvunECj1aw'

export const MapComponent = ({
  lostPets,
  lostPetsWithDetails,
  LngLatPopupPage,
  height,
  setAddress,
  setCoordinates,
  shouldShowPopup
}: MapComponentProps) => {
  const mapRef = useRef<MapRef>(null)
  const [inputValue, setInputValue] = useState('')
  const [popupInfo, setPopupInfo] = useState<{
    location: string
    coordinates: { lng: number; lat: number }
  } | null>(null)
  const [hoveredPetIndex, setHoveredPetIndex] = useState<
    number | null
  >(null)

  const handleMapClick = async (e: any) => {
    if (popupInfo) {
      setPopupInfo(null)
      return
    }

    const coordinates = {
      lng: e.lngLat.lng,
      lat: e.lngLat.lat
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${accessToken}`
      )
      const data = await response.json()
      const placeName =
        data.features[0]?.place_name || 'Unknown location'

      setPopupInfo({
        location: placeName,
        coordinates: coordinates
      })
      setCoordinates && setCoordinates(coordinates)
      setAddress && setAddress(placeName)
    } catch (error) {
      console.error('Error fetching location:', error)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <SearchBoxComponent
        accessToken={accessToken}
        map={mapRef.current}
        mapboxgl={mapboxgl}
        value={inputValue}
        onChange={(d) => setInputValue(d)}
        onSubmit={(e) => e.preventDefault()}
        onRetrieve={(result) => {
          if (result) {
            const coordinates = {
              lng: result.features[0].geometry
                .coordinates[0],
              lat: result.features[0].geometry
                .coordinates[1]
            }
            const placeName =
              result.features[0].properties.full_address

            setPopupInfo({
              location: placeName,
              coordinates: coordinates
            })
            setCoordinates && setCoordinates(coordinates)
            setAddress && setAddress(placeName)

            mapRef.current?.flyTo({
              center: coordinates,
              zoom: 14
            })
          }
        }}
        marker={false}
      />
      <Map
        ref={mapRef}
        mapboxAccessToken={accessToken}
        initialViewState={{
          longitude: 18.06324,
          latitude: 59.334591,
          zoom: 10
        }}
        onClick={handleMapClick}
        style={{ height: height || 300 }}
        mapStyle="mapbox://styles/mapbox/streets-v9">
        {lostPets &&
          lostPets.length > 0 &&
          lostPets?.map((pet, index) => (
            <Marker
              key={index}
              longitude={pet.location?.longitude || 0}
              latitude={pet.location?.latitude || 0}
              color="#FF0000"
              onClick={(e) => {
                e.originalEvent.stopPropagation()
                setHoveredPetIndex(
                  index === hoveredPetIndex ? null : index
                )
              }}>
              {hoveredPetIndex === index && (
                <Popup
                  longitude={pet.location?.longitude || 0}
                  latitude={pet.location?.latitude || 0}
                  closeButton={false}
                  onClose={() => setHoveredPetIndex(null)}>
                  {lostPetsWithDetails?.[index]?.pet && (
                    <LostPetDetailsPopupPage
                      pet={lostPetsWithDetails[index].pet}
                    />
                  )}
                </Popup>
              )}
            </Marker>
          ))}
        {popupInfo && shouldShowPopup && (
          <Popup
            longitude={popupInfo.coordinates.lng}
            latitude={popupInfo.coordinates.lat}
            closeOnClick={true}
            onClose={() => setPopupInfo(null)}
            closeButton={true}>
            {LngLatPopupPage && (
              <LngLatPopupPage
                location={popupInfo.location}
                coordinates={popupInfo.coordinates}
              />
            )}
          </Popup>
        )}
      </Map>
    </div>
  )
}
