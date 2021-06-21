const getRandomArrayElem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};
export default getRandomArrayElem;
