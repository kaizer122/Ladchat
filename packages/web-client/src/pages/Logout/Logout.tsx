import { useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ScreenLoader from "../../components/ScreenLoader";
import { Path } from "../../router/modules/constants";
import { useAuthStore } from "../../stores/AuthStore";

const Logout: React.FC = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const client = useApolloClient();
  const history = useHistory();
  useEffect(() => {
    async function signOut() {
      await client.resetStore().catch((e) => console.log(e));
      removeToken();
      history.replace(Path.SIGNIN);
    }
    signOut();
  }, []);
  return <ScreenLoader />;
};
export default Logout;
