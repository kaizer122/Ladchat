import lodashDebounce from "lodash.debounce";
import { RefObject, useCallback, useEffect, useMemo, useRef } from "react";

export type DebounceOptions = Parameters<typeof lodashDebounce>[2];

const createCallback = (
  debounce: number,
  handleOnScroll: () => void,
  options: DebounceOptions
): (() => void) => {
  if (debounce) {
    return lodashDebounce(handleOnScroll, debounce, options);
  } else {
    return handleOnScroll;
  }
};

function useBottomScrollListener<T extends HTMLElement>(
  onBottom: () => void,
  options?: {
    offset?: number;
    debounce?: number;
    debounceOptions?: DebounceOptions;
    triggerOnNoScroll?: boolean;
    inverted?: boolean;
  }
): RefObject<T> {
  const { offset, triggerOnNoScroll, debounce, debounceOptions, inverted } =
    useMemo(
      () => ({
        offset: options?.offset ?? 0,
        debounce: options?.debounce ?? 200,
        debounceOptions: options?.debounceOptions ?? { trailing: true },
        triggerOnNoScroll: options?.triggerOnNoScroll ?? false,
        inverted: options?.inverted ?? false,
      }),
      [
        options?.offset,
        options?.debounce,
        options?.debounceOptions,
        options?.triggerOnNoScroll,
        options?.inverted,
      ]
    );

  const debouncedOnBottom = useMemo(
    () => createCallback(debounce, onBottom, debounceOptions),
    [debounce, onBottom]
  );
  const containerRef = useRef<T>(null);
  const handleOnScroll = useCallback(() => {
    if (containerRef.current != null) {
      const inversionModifier = inverted ? -1 : 1;
      const scrollNode: T = containerRef.current;
      const scrollContainerBottomPosition = Math.round(
        scrollNode.scrollTop +
          (inverted
            ? scrollNode.clientHeight * inversionModifier
            : scrollNode.clientHeight)
      );
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset);
      if (scrollPosition <= scrollContainerBottomPosition * inversionModifier) {
        debouncedOnBottom();
      }
    } else {
      const scrollNode: Element =
        document.scrollingElement || document.documentElement;
      const scrollContainerBottomPosition = Math.round(
        scrollNode.scrollTop + window.innerHeight
      );
      const scrollPosition = Math.round(scrollNode.scrollHeight - offset);
      if (scrollPosition <= scrollContainerBottomPosition) {
        debouncedOnBottom();
      }
    }
  }, [offset, onBottom, containerRef.current, inverted]);

  useEffect((): (() => void) => {
    const ref: T | null = containerRef.current;
    if (ref != null) {
      ref.addEventListener("scroll", handleOnScroll);
    } else {
      window.addEventListener("scroll", handleOnScroll);
    }

    if (triggerOnNoScroll) {
      handleOnScroll();
    }

    return () => {
      if (ref != null) {
        ref.removeEventListener("scroll", handleOnScroll);
      } else {
        window.removeEventListener("scroll", handleOnScroll);
      }
    };
  }, [handleOnScroll, debounce]);

  return containerRef;
}

export default useBottomScrollListener;
