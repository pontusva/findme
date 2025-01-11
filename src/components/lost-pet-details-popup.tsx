import {
  LucideInfo,
  Info,
  Cat,
  NavigationIcon
} from 'lucide-react'
import { Link } from 'react-router'
interface LostPetDetailsPopupProps {
  id: string
  name: string
  type: string
  photoUrl: string
  ownerId: string
}

export default function LostPetDetailsPopup({
  id,
  name,
  type,
  photoUrl,
  ownerId
}: LostPetDetailsPopupProps) {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Lost Pet Details
        </h3>
        <Link to={`/pets/${id}`}>
          <NavigationIcon className="h-5 w-5" />
        </Link>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Name</p>
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-blue-500" />
            <p className="text-sm font-medium">{name}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Type</p>
          <div className="flex items-center space-x-2">
            <Cat className="h-4 w-4 text-blue-500" />
            <p className="text-sm font-medium">{type}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Tip: Click on info icon to see more details
          </p>
        </div>
      </div>
    </div>
  )
}
