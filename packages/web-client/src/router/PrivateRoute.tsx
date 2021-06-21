import { default as React, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ScreenLoader from "../components/ScreenLoader";
import { useConversationsQuery, useMeQuery } from "../graphql";
import { useErrorHandler } from "../hooks";
import { useAuthStore } from "../stores/AuthStore";
import { useLayoutStore } from "../stores/LayoutStore";
import { Path } from "./modules/constants";

const PrivateRoute: React.FC = ({ children }) => {
  const history = useHistory();

  const { removeToken, isLoggedIn } = useAuthStore(
    ({ removeToken, isLoggedIn }) => ({
      removeToken,
      isLoggedIn,
    })
  );

  const { setHasConversations, onLogout } = useLayoutStore(
    ({ setHasConversations, onLogout }) => ({ setHasConversations, onLogout })
  );

  const { data, loading, error } = useMeQuery();
  const {
    data: conversationsData,
    loading: loadingConversations,
    error: conversationsError,
  } = useConversationsQuery({
    variables: { pagination: { limit: 10, skip: 0 } },
  });

  useErrorHandler(conversationsError);

  useEffect(() => {
    if (error && !loading) {
      removeToken();
    }
  }, [data, loading, error, removeToken]);

  useEffect(() => {
    if (
      !conversationsError &&
      !loadingConversations &&
      conversationsData?.conversations
    ) {
      if (conversationsData.conversations.length > 0) setHasConversations(true);
    }
  }, [
    conversationsData,
    loadingConversations,
    conversationsError,
    setHasConversations,
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      onLogout();
      history.replace(Path.SIGNIN);
    }
  }, [isLoggedIn, history]);

  return (
    <>
      {loading || loadingConversations ? (
        <ScreenLoader />
      ) : data?.me ? (
        children
      ) : (
        <ScreenLoader />
      )}
    </>
  );
};
export default PrivateRoute;
