import {
  Card,
  CardContent,
  CardFooter
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UserPets } from '@/data/useGetUserPets'

type PetCardProps = {
  pet: UserPets[number]
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={pet.photoUrl}
            alt={pet.name}
            className="object-cover h-full w-full"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-semibold text-lg">
            {pet?.name}
          </h3>
          <Badge>{pet?.type}</Badge>
        </div>
        {/* <p className="text-sm text-muted-foreground">
          {pet?.getUserPets.map((pet) => pet.breed)}
        </p>
        <p className="text-sm">
          Last seen:{' '}
          {pet?.getUserPets.map((pet) => pet.lastSeen)}
        </p> */}
      </CardFooter>
    </Card>
  )
}
