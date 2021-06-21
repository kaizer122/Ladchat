const removeDuplicates = (array?: any[], uniquekey = "_id") => {
  if (!array || array.length === 0) return [];
  const flag: any[] = [];
  const unique: any[] = [];
  array.forEach((elem) => {
    const elemId = elem[uniquekey];
    if (!flag[elemId]) {
      flag[elemId] = true;
      unique.push(elem);
    }
  });
  return unique;
};

export { removeDuplicates };
