import { ApolloServer } from '@apollo/server';
  import { startServerAndCreateNextHandler } from '@as-integrations/next';
  import { resolvers, typeDefs } from '../../../graphql/index';
  import supabaseClient from '../../../src/lib/supabaseClient';
 

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const handler = startServerAndCreateNextHandler(server, {
    context: async () => ({
      supabaseClient,
    })
  });

  export default handler;