import { SignInButton } from '@clerk/react-router'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Logo from '@/images/undraw_walk_dreaming_u-58-a.svg'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-green-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-24 h-24 mb-4">
            <img src={Logo} alt="Logo" />
          </div>
          <CardTitle className="text-3xl font-bold">
            Welcome to Lost Pets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Sign in to help reunite lost pets with their
            families
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <SignInButton mode="modal">
            <Button className="w-full">
              Sign In / Sign Up
            </Button>
          </SignInButton>
          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to our Terms of Service
            and Privacy Policy
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
