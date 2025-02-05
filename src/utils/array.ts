export const randomizeArray = (array: unknown[]) => {
  return array.sort(() => Math.random() - 0.5);
};
