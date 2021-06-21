import deb from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";

interface IUseDebouncedState {
  wait?: number;
  debounceSettings?: Parameters<typeof deb>[2];
}
type IUseDebouncedStateReturn<T> = [T, (_val: T, immediate?: boolean) => void];
function useDebouncedState<T>(
  defaultValue?: T,
  { wait, debounceSettings }: IUseDebouncedState = {
    wait: 200,
    debounceSettings: { leading: true },
  }
): IUseDebouncedStateReturn<T> {
  const [state, setState] = useState<T>(defaultValue as T);

  const setDebouncedState = (_val: T, immediate = false) => {
    if (immediate) {
      debounce.cancel();
      setState(_val);
    } else debounce(_val);
  };

  const debounce = useCallback(
    deb((_prop: T) => setState(_prop), wait, debounceSettings),
    [debounceSettings, wait, setState]
  );

  useEffect(() => {
    return () => {
      debounce.cancel();
    };
  }, []);

  return [state, setDebouncedState];
}

export default useDebouncedState;
