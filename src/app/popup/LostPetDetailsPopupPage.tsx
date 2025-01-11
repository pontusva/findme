import LostPetDetailsPopup from '@/components/lost-pet-details-popup'
import { LostPets } from '@/data/useGetPetsForMap'

interface LostPetDetailsPopupPageProps {
  pet: LostPets[number]['pet']
}

export default function LostPetDetailsPopupPage({
  pet
}: LostPetDetailsPopupPageProps) {
  return (
    <LostPetDetailsPopup
      id={pet.id}
      name={pet.name}
      type={pet.type}
      photoUrl={pet.photoUrl || ''}
      ownerId={pet.ownerId}
    />
  )
}
