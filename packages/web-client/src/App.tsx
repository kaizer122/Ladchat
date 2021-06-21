import { ChakraProvider } from "@chakra-ui/react";
import React, { Suspense } from "react";
import ApolloProvider from "./ApolloProvider";
import ScreenLoader from "./components/ScreenLoader";
import { theme } from "./config/theme";
import MainRouter from "./router/MainRouter";
const App: React.FC = () => {
  return (
    <Suspense fallback={<ScreenLoader />}>
      <ChakraProvider theme={theme}>
        <ApolloProvider>
          <MainRouter />
        </ApolloProvider>
      </ChakraProvider>
    </Suspense>
  );
};

export default App;
