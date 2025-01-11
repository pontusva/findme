import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePushNotifications } from '@/hooks/usePushNotifications'
import { useAuth } from '@clerk/clerk-react'

const schema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  inAppNotifications: z.boolean(),
  marketingEmails: z.boolean()
})

export default function NotificationSettingsPage() {
  const { userId } = useAuth()
  const {
    subscription,
    requestNotificationPermission,
    unsubscribeFromExistingSubscription
  } = usePushNotifications({ userId: userId || '' })
  const { handleSubmit, watch, setValue } = useForm<
    z.infer<typeof schema>
  >({
    resolver: zodResolver(schema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      inAppNotifications: true,
      marketingEmails: false
    }
  })
  console.log({ subscription })
  const [isSaving, setIsSaving] = useState(false)

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <div className="flex mt-20">
      <Card className="w-full max-w-2xl mx-auto">
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>
              Manage your notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="emailNotifications"
                className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications via email
                </span>
              </Label>
              <Switch
                id="emailNotifications"
                checked={watch('emailNotifications')}
                onCheckedChange={(checked) =>
                  setValue('emailNotifications', checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="pushNotifications"
                className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive push notifications on your devices
                </span>
              </Label>
              <Switch
                id="pushNotifications"
                checked={subscription ? true : false}
                onCheckedChange={async (checked) => {
                  if (checked) {
                    await requestNotificationPermission(
                      userId || ''
                    )
                  } else {
                    await unsubscribeFromExistingSubscription(
                      userId || ''
                    )
                  }
                  setValue('emailNotifications', checked)
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="smsNotifications"
                className="flex flex-col space-y-1">
                <span>SMS Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive important updates via SMS
                </span>
              </Label>
              <Switch
                id="smsNotifications"
                checked={watch('smsNotifications')}
                onCheckedChange={(checked) =>
                  setValue('smsNotifications', checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="inAppNotifications"
                className="flex flex-col space-y-1">
                <span>In-App Notifications</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive notifications within the
                  application
                </span>
              </Label>
              <Switch
                id="inAppNotifications"
                checked={watch('inAppNotifications')}
                onCheckedChange={(checked) =>
                  setValue('inAppNotifications', checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="marketingEmails"
                className="flex flex-col space-y-1">
                <span>Marketing Emails</span>
                <span className="font-normal text-sm text-muted-foreground">
                  Receive promotional emails and offers
                </span>
              </Label>
              <Switch
                id="marketingEmails"
                checked={watch('marketingEmails')}
                onCheckedChange={(checked) =>
                  setValue('marketingEmails', checked)
                }
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
