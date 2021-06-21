import { Path } from "./constants";

export const routeTo = (
  path: Path,
  params: Record<string, string> = {},
): string =>
  // @ts-ignore
  Object.entries(params).reduce(
    (accumulator, [key, value]) =>
      // @ts-ignore
      accumulator.replace(`:${key}`, value),
    path,
  );
