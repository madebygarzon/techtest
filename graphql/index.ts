import { gql } from "graphql-tag";
import { SupabaseClient } from "@supabase/supabase-js";

interface Context {
  supabaseClient: SupabaseClient;
}

interface UserArgs {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  password?: string;
}

interface TransactionArgs {
  id: string;
  userId: string;
  type?: string;
  amount?: number;
  date?: string;
}

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    phone: String
    role: String!
    password: String!
  }

  type Transaction {
    id: ID!
    userId: User!
    type: String!
    amount: Float!
    date: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    transactions: [Transaction]
    transaction(id: ID!): Transaction
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      phone: String
      role: String!
      password: String!
    ): User
    updateUser(
      id: ID!
      name: String
      email: String
      phone: String
      role: String
      password: String
    ): User
    deleteUser(id: ID!): Boolean

    createTransaction(
      userId: ID!
      type: String!
      amount: Float!
      date: String!
    ): Transaction
    updateTransaction(
      id: ID!
      type: String
      amount: Float
      date: String
    ): Transaction
    deleteTransaction(id: ID!): Boolean
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $phone: String
    $role: String!
    $password: String!
  ) {
    createUser(
      name: $name
      email: $email
      phone: $phone
      role: $role
      password: $password
    ) {
      id
      name
      email
      phone
      role
      password
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $userId: ID!
    $type: String!
    $amount: Float!
    $date: String!
  ) {
    createTransaction(
      userId: $userId
      type: $type
      amount: $amount
      date: $date
    ) {
      id
      userId {
        id
        name
      }
      type
      amount
      date
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
    }
  }
`;

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      type
      date
      amount
      userId {
        name
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $role: String!) {
    updateUser(id: $id, role: $role) {
      id
      role
    }
  }
`;

export const resolvers = {
  Query: {
    users: async (_: unknown, __: unknown, { supabaseClient }: Context) => {
      const { data, error } = await supabaseClient.from("users").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
    user: async (_: unknown, { id }: UserArgs, { supabaseClient }: Context) => {
      const { data, error } = await supabaseClient
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    transactions: async (
      _: unknown,
      __: unknown,
      { supabaseClient }: Context
    ) => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .select("id, type, date, amount, userId(id, name)");

      if (error) {
        throw new Error(`Error al obtener transacciones: ${error.message}`);
      }
      return data;
    },
  },

  Mutation: {
    createUser: async (
      _: unknown,
      { name, email, phone, role, password }: UserArgs,
      { supabaseClient }: Context
    ) => {
      const { data, error } = await supabaseClient
        .from("users")
        .insert([{ name, email, phone, role, password }])
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    updateUser: async (
      _: unknown,
      { id, name, email, phone, role, password }: UserArgs,
      { supabaseClient }: Context
    ) => {
      const { data, error } = await supabaseClient
        .from("users")
        .update({ name, email, phone, role, password })
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    deleteUser: async (
      _: unknown,
      { id }: UserArgs,
      { supabaseClient }: Context
    ) => {
      const { error } = await supabaseClient
        .from("users")
        .delete()
        .eq("id", id);
      if (error) throw new Error(error.message);
      return true;
    },
    createTransaction: async (
      _: unknown,
      { userId, type, amount, date }: TransactionArgs,
      { supabaseClient }: Context
    ) => {
      const { data: transactionData, error: transactionError } =
        await supabaseClient
          .from("transactions")
          .insert([{ userId, type, amount, date }])
          .select()
          .single();
      if (transactionError)
        throw new Error(
          `Error al crear la transacción: ${transactionError.message}`
        );
      const { data: userData, error: userError } = await supabaseClient
        .from("users")
        .select("id, name, email")
        .eq("id", userId)
        .single();
      if (userError)
        throw new Error(`Error al obtener usuario: ${userError.message}`);
      return {
        ...transactionData,
        userId: userData,
      };
    },
    updateTransaction: async (
      _: unknown,
      { id, type, amount, date }: TransactionArgs,
      { supabaseClient }: Context
    ) => {
      const { data, error } = await supabaseClient
        .from("transactions")
        .update({ type, amount, date })
        .eq("id", id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    // deleteTransaction: async (
    //   _: unknown,
    //   { id }: TransactionArgs,
    //   { supabaseClient }: Context
    // ) => {
    //   const { error } = await supabaseClient
    //     .from("transactions")
    //     .delete()
    //     .eq("id", id);
    //   if (error) throw new Error(error.message);
    //   return true;
    // },
  },
};
