'use server'

import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  message: z.string().min(1, 'Message is required'),
})

export async function submitContactForm(formData: FormData) {
  const validatedFields = formSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  })

  if (!validatedFields.success) {
    return { success: false, errors: validatedFields.error.flatten().fieldErrors }
  }

  // Here you would typically send an email or save to a database
  // For this example, we'll just simulate a delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  return { success: true, message: "Your message has been sent. The pet owner will contact you soon." }
}

