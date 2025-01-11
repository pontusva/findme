import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  PawPrint,
  Search,
  Bell,
  MapPin,
  Plus
} from 'lucide-react'
import { MapComponent } from '@/components/map/MapComponent'
import { useGetPetsForMap } from '@/data/useGetPetsForMap'
import { useUser } from '@clerk/clerk-react'
import { useGetUserPets } from '@/data/useGetUserPets'
import { usePushNotifications } from '@/hooks/usePushNotifications'

export default function DashboardPage() {
  const { user } = useUser()
  const {
    subscription,
    error,
    requestNotificationPermission,
    sendTestNotification
  } = usePushNotifications({ userId: user?.id || '' })

  const { data } = useGetUserPets({
    userId: user?.id || ''
  })

  const { lostPets, lostPetsWithDetails } =
    useGetPetsForMap()

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={user?.imageUrl || ''}
              alt={user?.fullName || ''}
            />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.fullName}!
          </h1>
        </div>
        <Button variant="outline">
          <Bell className="mr-2 h-4 w-4" /> Notifications
        </Button>
      </header>

      <div className="flex gap-4 mb-6">
        {!subscription && (
          <Button
            onClick={() =>
              requestNotificationPermission(user?.id || '')
            }>
            Enable Push Notifications
          </Button>
        )}

        {subscription && (
          <Button onClick={sendTestNotification}>
            Send Test Notification
          </Button>
        )}

        {error && (
          <p className="text-red-500">Error: {error}</p>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Report a Lost Pet</CardTitle>
            <CardDescription>
              Quickly report a missing pet to start the
              search.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PawPrint className="h-12 w-12 text-primary mb-4" />
          </CardContent>
          <CardFooter>
            <Link to="/report" className="w-full">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Report
                Lost Pet
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Search for Lost Pets</CardTitle>
            <CardDescription>
              Help reunite pets with their owners.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Search className="h-12 w-12 text-primary mb-4" />
          </CardContent>
          <CardFooter>
            <Link to="/search">
              <Button variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" /> Search
                Nearby
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Updates on your reported pets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {data?.getUserPets
                .slice(0, 2)
                .map((pet, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center">
                    <div className="grid grid-cols-2 gap-4 w-[200px]">
                      <span>{pet.name}</span>
                      <span>{pet.type}</span>
                    </div>
                    <div>
                      <Badge
                        variant={
                          pet.lostReports.map((report) =>
                            report.status === 'OPEN'
                              ? 'default'
                              : 'destructive'
                          )[0]
                        }>
                        {pet.lostReports.map(
                          (report) => report.status
                        )}
                      </Badge>
                      <span className="text-sm text-muted-foreground ml-2">
                        {/* {pet.lostReports[0].lastSeenDate} */}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Link
              to="/my-pets"
              className="text-sm text-primary hover:underline">
              View all my pets
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Card className="mt-5">
        <MapComponent
          lostPets={lostPets}
          lostPetsWithDetails={lostPetsWithDetails}
          shouldShowPopup={false}
          height={500}
        />
      </Card>
    </div>
  )
}
