import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";

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
  uri: "https://cfed-218-147-138-163.ngrok.io/graphql",
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
  link: authLink.concat(httpLink),
  cache,
});

export default client;
