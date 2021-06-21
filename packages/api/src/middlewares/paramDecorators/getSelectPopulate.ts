import { GraphQLResolveInfo } from "graphql";
import graphQLFields from "graphql-fields";
import { createParamDecorator } from "type-graphql";
import { IContext } from "../../types/myContext";

interface IPopulateItem {
  path: string;
  select: string;
}
type SelectPath = {
  [key: string]: number | string | SelectPath;
};

export interface IQueryInfo {
  select: SelectPath;
  populate?: IPopulateItem[];
}

export const GetSelectPopulate = (
  populatedItems: string[],
  initialSelect?: SelectPath
) => {
  return createParamDecorator<IContext>(({ info }) => {
    return getQueryInfos(info, populatedItems, initialSelect);
  });
};

// const getQueryInfo = (
//   info: GraphQLResolveInfo,
//   populatedItems: string[] | null = null
// ) => {
//   const queryInfo: IQueryInfo = {
//     select: getSelectedFields(info),
//   };

//   if (populatedItems) {
//     const populate: IPopulateItem[] = [];
//     populatedItems.forEach((path: string): void => {
//       logWarning(path);
//       if (queryInfo.select.includes(`${path}.`)) {
//         // const hasPopulate = populatedItems.find()
//         populate.push({
//           path,
//           select: getNestedSelect(queryInfo, path),
//         });
//       }
//     });
//     if (populate.length > 0) queryInfo.populate = populate;
//   }

//   return queryInfo;
// };

// const getNestedSelect = (queryInfo: IQueryInfo, path: string): string => {
//   let nestedSelect = "";
//   queryInfo.select.split(" ").forEach((field: string): void => {
//     if (field.startsWith(`${path}.`)) {
//       nestedSelect += ` ${field.replace(`${path}.`, "")}`;
//       queryInfo.select = queryInfo.select.replace(field, "").trim();
//     }
//   });
//   return nestedSelect;
// };

// const createSelectedFields = (
//   select: string[],
//   selectInfo: any,
//   parentKey: string | null = null
// ) => {
//   Object.keys(selectInfo).forEach((key: string): void => {
//     if (Object.keys(selectInfo[key]).length === 0) {
//       select.push(parentKey ? `${parentKey}.${key}` : key);
//     } else
//       createSelectedFields(
//         select,
//         selectInfo[key],
//         parentKey ? `${parentKey}.${key}` : key
//       );
//   });
// };

// const getSelectedFields = (info: GraphQLResolveInfo): string => {
//   const selectedFieldsInfos = graphQLFields(info);
//   const select: string[] = [];
//   createSelectedFields(select, selectedFieldsInfos);
//   return select.join(" ");
// };

interface IQueryItem {
  parentKey: string;
  field: any;
  select: any;
  populate: any;
  populatedFields: any;
}
const queryItem = ({
  parentKey,
  field,
  select,
  populate,
  populatedFields,
}: IQueryItem) => {
  let populateItem: any = null;
  const fields = Object.keys(field);
  if (parentKey.indexOf(".") === -1 && populatedFields.includes(parentKey)) {
    populateItem = { path: parentKey };
  }
  if (fields.length > 0) {
    fields.forEach((key) => {
      const fullKey = `${parentKey}.${key}`;

      if (populateItem && populatedFields.includes(fullKey)) {
        const item = {
          path: key,
        };
        if (!populateItem.populate) populateItem.populate = [item];
        else populateItem.populate.push(item);
      }
      queryItem({
        parentKey: `${parentKey}.${key}`,
        field: field[key],
        select,
        populate,
        populatedFields,
      });
    });
  } else select[parentKey] = 1;
  if (populateItem) populate.push(populateItem);
};

export const getQueryInfos = (
  info: GraphQLResolveInfo,
  populatedFields: string[] = [],
  initialSelect?: SelectPath
): IQueryInfo => {
  const fields = graphQLFields(info);
  const select: SelectPath = { ...initialSelect };
  const populate: IPopulateItem[] = [];
  Object.keys(fields).forEach((key: string) => {
    queryItem({
      parentKey: key,
      field: fields[key],
      select,
      populate,
      populatedFields,
    });
  });
  const queryInfos = {
    select,
    populate,
  };

  return queryInfos;
};
