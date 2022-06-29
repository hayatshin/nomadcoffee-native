import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

export const logUserIn = async (token) => {
  try {
    await AsyncStorage.setItem("token", JSON.stringify(token));
    // ([
    //   ["token", JSON.stringify(token)],
    //   ["loggedIn", JSON.stringify("yes")],
    // ]);
    // tokenVar(token);
    isLoggedInVar(true);
    tokenVar(token);
  } catch (e) {
    console.error(e);
  }
};

const httpLink = createHttpLink({
  uri: "https://cc6a-218-147-138-163.ngrok.io/graphql",
});

const uploadHttpLink = createUploadLink({
  uri: "http://172.16.47.53:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem("token");
  return {
    headers: {
      ...headers,
      token: JSON.parse(token),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`Graphql Error`, graphQLErrors);
  }
  if (networkError) {
    console.log(`Network Error`, networkError);
  } else {
    console.log("nothing");
  }
});

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeShops: offsetLimitPagination(),
      },
    },
  },
});

const client = new ApolloClient({
  // link: ApolloLink.from([authLink, onErrorLink, uploadHttpLink]),
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});

export default client;
