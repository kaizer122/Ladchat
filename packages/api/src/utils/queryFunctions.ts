import { DocumentDefinition, FilterQuery } from "mongoose";

export const getFieldRegexQuery = <T>(
  field: Extract<keyof T, string>,
  searchTerm: string
) => {
  return {
    [field]: {
      $regex: searchTerm.replace("+", ""),
      $options: "mi",
    },
  } as FilterQuery<DocumentDefinition<T>>;
};

export const getSearchStringQuery = <T>(
  fields: Array<Extract<keyof T, string>>,
  searchTerm: string,
  baseQuery: FilterQuery<T> = {}
): FilterQuery<T> => {
  if (!searchTerm || searchTerm.trim() === "") return baseQuery;
  if (!baseQuery.$or) baseQuery.$or = [];
  fields.forEach((field) => {
    const condition = getFieldRegexQuery<T>(field, searchTerm);
    if (condition) baseQuery.$or?.push(condition as any);
  });
  return baseQuery;
};
