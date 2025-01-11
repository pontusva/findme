import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/react-router'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Dashboard from './components/Dashboard.tsx'
import DashboardPage from './app/dashboard/page.tsx'
import RegisterLostPetPage from './app/register-lost-pet/page.tsx'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client/public/index.js'
import LostPetsPage from './app/lost-pets/lost-pet-page.tsx'
import PetPage from './app/pet/page.tsx'
import SearchPage from './app/lost-pets/page.tsx'
import LostPetContactPage from './app/lost-pet-contact/page.tsx'
import NotificationSettingsPage from './app/settings/notifications/page.tsx'

// Add this before initializeFirebase()
if ('serviceWorker' in navigator) {
  try {
    const registration =
      await navigator.serviceWorker.register('/sw.js', {
        scope: '/' // This makes the service worker control the whole site
      })
    console.log(
      'ServiceWorker registration successful:',
      registration
    )
  } catch (error) {
    console.error(
      'ServiceWorker registration failed:',
      error
    )
  }
}

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/graphql'
})

export const client = new ApolloClient({
  link: uploadLink,
  cache: new InMemoryCache()
})
const PUBLISHABLE_KEY = import.meta.env
  .VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}
ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <ApolloProvider client={client}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<DashboardPage />} />
              <Route
                path="report"
                element={<RegisterLostPetPage />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />
              <Route
                path="/my-pets"
                element={<LostPetsPage />}
              />
              <Route
                path="/pets/:id"
                element={<PetPage />}
              />
              <Route
                path="/search"
                element={<SearchPage />}
              />
              <Route
                path="/lost-pets-contact/:id"
                element={<LostPetContactPage />}
              />
              <Route
                path="/settings"
                element={<NotificationSettingsPage />}
              />
            </Route>
          </Routes>
        </ApolloProvider>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
)
