import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react'

export default function SeenButton({ petId }: { petId: string }) {
  const [seen, setSeen] = useState(false)

  const handleSeen = async () => {
    // Here you would typically send a request to your backend to update the pet's status
    // For this example, we'll just update the local state
    setSeen(true)
    
    // Simulating an API call
    console.log(`Pet ${petId} has been marked as seen`)
  }

  return (
    <Button 
      onClick={handleSeen} 
      disabled={seen}
      className="w-full"
    >
      <Eye className="mr-2 h-4 w-4" />
      {seen ? 'Pet Marked as Seen' : 'Mark Pet as Seen'}
    </Button>
  )
}

