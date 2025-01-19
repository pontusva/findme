import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCreateNotification } from "@/data/useCreateNotification";
import { useParams } from "react-router";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { useGetLostPetReport } from "@/data/useGetLostPetReport";
import { useUser } from "@clerk/clerk-react";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  message: z.string().min(1, "Message is required"),
  showEmail: z.boolean(),
});

export default function LostPetContactPage() {
  const { id: reportId } = useParams();
  const { lostPetReport, loading } = useGetLostPetReport(reportId || "");
  const { createNotification } = useCreateNotification();
  const { user } = useUser();
  const { subscription } = usePushNotifications({
    userId: lostPetReport?.pet?.ownerId || "",
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      showEmail: true,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!lostPetReport?.pet?.ownerId) return;

    try {
      await createNotification({
        variables: {
          userId: lostPetReport.pet.ownerId,
          senderId: user?.id || "",
          ...data,
        },
      });

      if (subscription) {
        await fetch("http://localhost:3000/push/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription,
            title: "New Message About Your Pet",
            body: `Someone has sent you a message about your pet`,
          }),
        });
      }
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Contact Pet Owner</CardTitle>
          <CardDescription>
            <div>
              <p>Fill out this form to contact the owner of the lost pet.</p>
              <p className="pt-1">
                They will be able to start a chat with you.
              </p>
            </div>
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="showEmail"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Show my email</FormLabel>
                        <FormDescription>
                          This will show your email to the owner of the pet.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
