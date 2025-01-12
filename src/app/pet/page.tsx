import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { Mail, Phone } from 'lucide-react'
import { useParams } from 'react-router'
import { useGetPet } from '@/data/useGetPet'
import { useUser } from '@clerk/clerk-react'

export default function PetDetailsPage() {
  const { id } = useParams()
  const { data } = useGetPet({ getPetId: id || '' })
  const { user } = useUser()

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {data?.getPet?.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <img
                src={data?.getPet?.photoUrl}
                alt={data?.getPet?.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">
                  Pet Details
                </h2>
                <p>Type: {data?.getPet?.type}</p>
                <p>Breed: {data?.getPet?.breed}</p>
                <p>Age: {data?.getPet?.age} years</p>
                <p>
                  Description: {data?.getPet?.description}
                </p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Owner Information
                </h2>
                <div className="flex items-center space-x-2">
                  <span>{data?.getPet.owner?.name}</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  Contact
                </h2>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start">
                    <Phone className="mr-2 h-4 w-4" />
                    {data?.getPet?.owner?.name}
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start">
                    <Mail className="mr-2 h-4 w-4" />
                    {data?.getPet?.owner?.email}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
