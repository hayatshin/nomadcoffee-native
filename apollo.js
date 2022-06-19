import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";

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
  uri: "https://cold-parks-mix-221-165-61-17.loca.lt/graphql",
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
