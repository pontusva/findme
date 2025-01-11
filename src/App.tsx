import { SignedIn, SignedOut } from '@clerk/react-router'
import { Outlet } from 'react-router'
import LoginPage from '@/app/login/page'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <header>
      <SignedOut>
        <LoginPage />
      </SignedOut>
      <SignedIn>
        <Navbar />
        <Outlet />
      </SignedIn>
    </header>
  )
}
