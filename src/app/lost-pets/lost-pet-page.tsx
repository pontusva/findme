import { PetCard } from '@/components/PetCard'
import { useGetUserPets } from '@/data/useGetUserPets'
import { useUser } from '@clerk/clerk-react'
import { Link } from 'react-router'

export default function LostPetsPage() {
  const { user } = useUser()
  const { data } = useGetUserPets({
    userId: user?.id || ''
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Lost Pets</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.getUserPets?.map((pet) => (
          <Link to={`/pets/${pet.id}`}>
            <PetCard key={pet.id} pet={pet} />
          </Link>
        ))}
      </div>
    </div>
  )
}
