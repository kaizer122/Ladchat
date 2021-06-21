const asyncHandler =
  (fn: any) =>
  (...args: any[]) =>
    Promise.resolve(fn(...args)).catch((e) => {
      throw new Error(e);
    });

export default asyncHandler;
