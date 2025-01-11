import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useCreatePet } from '@/data/useCreatePet'
import { useCreateLostPetReport } from '@/data/useCreateLostPetReport'
import { useCreateLocation } from '@/data/useCreateLocation'
import { MapComponent } from './map/MapComponent'
import LngLatPopupPage from '@/app/popup/LngLatPopupPage'
import { useAuth } from '@clerk/clerk-react'

const formSchema = z.object({
  // Pet Details
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Pet type is required'),
  breed: z.string().optional(),
  age: z.number().int().positive().optional(),
  gender: z.enum(['Male', 'Female']).optional(),
  description: z.string().optional(),
  microchipId: z.string().optional(),
  photo: z.instanceof(File).optional(),

  // Lost Report Details
  lastSeenAddress: z.string().optional(),
  lastSeenDate: z.string().optional(),
  reportDetails: z.string().optional()
})

export default function LostPetRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0
  })
  const { userId } = useAuth()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: '',
      breed: '',
      age: undefined,
      gender: undefined,
      description: '',
      microchipId: '',
      lastSeenAddress: '',
      lastSeenDate: '',
      reportDetails: ''
    }
  })

  const { createPet } = useCreatePet()
  const { createLostPetReport } = useCreateLostPetReport()
  const { createLocation } = useCreateLocation()

  useEffect(() => {
    if (address) {
      form.setValue('lastSeenAddress', address)
    }
  }, [address, form])

  const onSubmit = async (
    data: z.infer<typeof formSchema>
  ) => {
    if (!data.photo) return

    setIsSubmitting(true)
    try {
      // First upload the file to get a URL
      const fileData = new FormData()
      fileData.append('file', data.photo)

      const uploadResponse = await fetch(
        'http://localhost:3000/upload',
        {
          method: 'POST',
          body: fileData
        }
      )

      const { url } = await uploadResponse.json()

      const petResult = await createPet({
        variables: {
          name: data.name,
          type: data.type,
          breed: data.breed || '',
          description: data.description || '',
          microchipId: data.microchipId || '',
          ownerId: userId || '',
          photoUrl: url
        }
      })

      if (petResult.data?.createPet) {
        const locationResult = await createLocation({
          variables: {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            address: address
          }
        })

        if (locationResult.data?.createLocation) {
          await createLostPetReport({
            variables: {
              petId: petResult.data?.createPet.id,
              locationId:
                locationResult.data?.createLocation.id,
              reportedBy: userId || ''
            }
          })
        }
      }
      form.reset()
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        Register Lost Pet
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
          <div className="space-y-8">
            <h2 className="text-xl font-semibold">
              Pet Details
            </h2>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter pet name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pet Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Dog">
                        Dog
                      </SelectItem>
                      <SelectItem value="Cat">
                        Cat
                      </SelectItem>
                      <SelectItem value="Bird">
                        Bird
                      </SelectItem>
                      <SelectItem value="Other">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter pet breed"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter pet description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="photo"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Photo</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) onChange(file)
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload a photo of your pet
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-xl font-semibold">
              Lost Report Details
            </h2>

            <MapComponent
              height={500}
              setCoordinates={setCoordinates}
              shouldShowPopup
              setAddress={setAddress}
              LngLatPopupPage={LngLatPopupPage}
            />

            <FormField
              control={form.control}
              name="lastSeenAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Seen Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter address"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setAddress('')
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastSeenDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Seen Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reportDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter any additional details about the lost pet"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? 'Submitting...'
              : 'Submit Report'}
          </Button>
        </form>
      </Form>
    </div>
  )
}
