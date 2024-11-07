import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { SessionProvider } from "next-auth/react";

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>  {/* Proveedor de sesión NextAuth */}
      <ApolloProvider client={client}>    {/* Proveedor de Apollo para GraphQL */}
        <Component {...pageProps} />      {/* Componente de página */}
      </ApolloProvider>
    </SessionProvider>
  );
}
