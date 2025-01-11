import React, { useState } from 'react'
import { Link } from 'react-router'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Menu, X, PawPrintIcon as Paw } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isSignedIn } = useUser()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-blue-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-bold flex items-center">
          <Paw className="mr-2" />
          PetFinder
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          {isSignedIn && (
            <>
              <NavLink to="/report">
                Report Lost Pet
              </NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/settings">Settings</NavLink>
            </>
          )}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link
              to="/sign-in"
              className="text-white hover:text-blue-200">
              Sign In
            </Link>
          )}
        </div>
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-2 mt-2">
            <MobileNavLink to="/" onClick={toggleMenu}>
              Home
            </MobileNavLink>
            <MobileNavLink
              to="/search"
              onClick={toggleMenu}>
              Search
            </MobileNavLink>
            {isSignedIn && (
              <>
                <MobileNavLink
                  to="/report"
                  onClick={toggleMenu}>
                  Report Lost Pet
                </MobileNavLink>
                <MobileNavLink
                  to="/dashboard"
                  onClick={toggleMenu}>
                  Dashboard
                </MobileNavLink>
              </>
            )}
            {!isSignedIn && (
              <MobileNavLink
                to="/sign-in"
                onClick={toggleMenu}>
                Sign In
              </MobileNavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

const NavLink: React.FC<{
  to: string
  children: React.ReactNode
}> = ({ to, children }) => (
  <Link to={to} className="text-white hover:text-blue-200">
    {children}
  </Link>
)

const MobileNavLink: React.FC<{
  to: string
  onClick: () => void
  children: React.ReactNode
}> = ({ to, onClick, children }) => (
  <Link
    to={to}
    className="text-white hover:text-blue-200 block py-2"
    onClick={onClick}>
    {children}
  </Link>
)

export default Navbar
