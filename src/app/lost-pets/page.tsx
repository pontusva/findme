import { useState, useCallback, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { PetCard } from '@/components/pet-card'
import { useGetFilteredPets } from '@/data/useGetFilteredPets'
import { Link } from 'react-router'

export default function LostPetsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedTerm, setDebouncedTerm] = useState('')
  const { data } = useGetFilteredPets({
    searchTerm: debouncedTerm
  })
  console.log(data)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedSetSearch = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(
        () => setDebouncedTerm(value),
        500
      )
    },
    []
  )

  // Handle input change
  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
    setSearchTerm(value) // Update the input value immediately
    debouncedSetSearch(value) // Debounce the actual search
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Lost Pets</h1>
      <Input
        type="search"
        placeholder="Search by name, type, or breed..."
        className="mb-6"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.getFilteredPets.map((pet) => (
          <Link key={pet.id} to={`/pets/${pet.pet.id}`}>
            <PetCard pet={pet} />
          </Link>
        ))}
      </div>
    </div>
  )
}
