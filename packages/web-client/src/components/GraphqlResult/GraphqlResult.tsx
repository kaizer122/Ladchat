import { ApolloError } from "@apollo/client";
import { useEffect, useState } from "react";
import { useDebouncedState, useErrorHandler } from "../../hooks";

export interface GraphqlResultProps {
  debounce?: boolean;
  loading: boolean;
  error: ApolloError | undefined;
  data?: any[];
  LoadingCp: JSX.Element;
  EmptyCp: JSX.Element;
}
enum State {
  LOADING = "LOADING",
  EMPTY = "EMPTY",
  HAS_DATA = "HAS_DATA",
}
const GraphqlResult: React.FC<GraphqlResultProps> = ({
  debounce = true,
  loading,
  error,
  data,
  children,
  LoadingCp,
  EmptyCp,
}) => {
  const [currentState, setCurrentState] = useDebouncedState<State>(
    State.LOADING,
    {
      debounceSettings: { trailing: true },
      wait: 200,
    }
  );
  const [nextState, setNextState] = useState<State>();

  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setNextState(State.EMPTY);
      } else setNextState(State.HAS_DATA);
    } else if (loading && nextState !== State.LOADING)
      setNextState(State.LOADING);
  }, [data, loading, setNextState]);

  useEffect(() => {
    if (!nextState) return;
    if (nextState === State.HAS_DATA) setCurrentState(nextState, !debounce);
    else setCurrentState(nextState, true);
  }, [nextState]);

  useErrorHandler(error);

  if (currentState === State.HAS_DATA) return <> {children} </>;
  if (nextState === State.LOADING || nextState === State.HAS_DATA)
    return LoadingCp;
  if (nextState === State.EMPTY) return EmptyCp;

  return EmptyCp;
};

export default GraphqlResult;
