import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Dashboard from "./components/Dashboard.tsx";
import DashboardPage from "./app/dashboard/page.tsx";
import RegisterLostPetPage from "./app/register-lost-pet/page.tsx";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  ApolloLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { createUploadLink } from "apollo-upload-client/public/index.js";
import LostPetsPage from "./app/lost-pets/lost-pet-page.tsx";
import PetPage from "./app/pet/page.tsx";
import SearchPage from "./app/lost-pets/page.tsx";
import LostPetContactPage from "./app/lost-pet-contact/page.tsx";
import NotificationSettingsPage from "./app/settings/notifications/page.tsx";
import { getMainDefinition } from "@apollo/client/utilities";
import { ReactNode, useMemo } from "react";
import { setContext } from "@apollo/client/link/context";
import { ChatProvider } from "./context/ChatProvider.tsx";

if ("serviceWorker" in navigator) {
  try {
    const registration = await navigator.serviceWorker.register("/sw.js", {
      scope: "/",
    });
    console.log("ServiceWorker registration successful:", registration);
  } catch (error) {
    console.error("ServiceWorker registration failed:", error);
  }
}

// Define the props interface
interface ApolloClientProviderProps {
  children: ReactNode;
}

const ApolloClientProvider: React.FC<ApolloClientProviderProps> = ({
  children,
}) => {
  const { getToken, sessionId } = useAuth();
  console.log("Session ID:", sessionId);
  // Create the upload link for HTTP operations
  const uploadLink = useMemo(() => {
    return createUploadLink({
      uri: "http://localhost:3000/graphql",
    }) as unknown as ApolloLink;
  }, []);

  // Create the WebSocket link with Clerk authentication
  const wsLink = useMemo(() => {
    console.log("Initializing WebSocket link...");
    const client = createClient({
      url: "http://localhost:4000/graphql",
      connectionParams: async () => {
        const token = await getToken({ template: "graphql" });
        console.log("Retrieved token:", token); // Log the token for debugging
        return {
          Authorization: token ? `Bearer ${token}` : "",
          sessionId,
        };
      },
    });

    client.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    client.on("closed", () => {
      console.warn("WebSocket connection closed");
    });

    return new GraphQLWsLink(client);
  }, [getToken, sessionId]);

  const authLink = setContext(async (_, { headers }) => {
    // Get the authentication token from Clerk

    // Return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: sessionId ? `${sessionId}` : "", // Attach the token
      },
    };
  });

  // Use split to direct operations to the appropriate link
  const splitLink = useMemo(() => {
    return split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      authLink.concat(wsLink),
      authLink.concat(uploadLink)
    );
  }, [wsLink, uploadLink, authLink]);

  // Initialize Apollo Client with the combined link
  const client = useMemo(() => {
    return new ApolloClient({
      link: splitLink,
      cache: new InMemoryCache(),
    });
  }, [splitLink]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <ApolloClientProvider>
          <ChatProvider>
            <Routes>
              <Route path="/" element={<App />}>
                <Route path="/" element={<DashboardPage />} />
                <Route path="report" element={<RegisterLostPetPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/my-pets" element={<LostPetsPage />} />
                <Route path="/pets/:id" element={<PetPage />} />
                <Route path="/search" element={<SearchPage />} />
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
          </ChatProvider>
        </ApolloClientProvider>
      </BrowserRouter>
    </ClerkProvider>
  </React.StrictMode>
);
