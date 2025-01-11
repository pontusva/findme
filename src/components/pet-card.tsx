import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { LostPet } from '@/data/useGetAllLostPets'
import { Link } from 'react-router'
type PetCardProps = {
  pet: LostPet['getAllLostPets'][number]
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={pet.pet.photoUrl}
            alt={`${pet.pet.name} the ${pet.pet.breed} ${pet.pet.type}`}
            className="object-cover h-full w-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg">
          {pet.pet.name}
        </CardTitle>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary">{pet.pet.type}</Badge>
          <Badge variant="outline">
            {pet.pet.breed}
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Last seen
        </p>
        <p className="text-sm text-muted-foreground">
          {pet.location?.address}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          to={`/lost-pets-contact/${pet.id}`}
          className="w-full">
          <Button>Contact Owner</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
