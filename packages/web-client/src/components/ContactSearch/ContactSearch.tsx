import { ColorMode, Flex, FlexProps, useColorMode } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { themeColors } from "../../config/theme";
import { SearchContactsResponse, useSearchContactsQuery } from "../../graphql";
import { useLayoutStore } from "../../stores/LayoutStore";
import Empty from "../Empty";
import GraphQLRequest from "../GraphqlResult";
import { GraphqlResultProps } from "../GraphqlResult/GraphqlResult";
import ContactSearchBar from "./ContactSearchBar";
import ContactSearchResult from "./ContactSearchResult";
import ContactSearchResultLoader from "./ContactSearchResultLoader";

interface Props {
  embedded?: boolean;
}
const embeddedFlexProps = (colorMode: ColorMode): FlexProps => ({
  px: 4,
  py: 4,
  borderBottomColor:
    colorMode === "light"
      ? themeColors.borderColor[0]
      : themeColors.borderColor[1],
  borderBottomWidth: 1,
  flexDirection: "column",
});
const normalFlexProps: FlexProps = {
  width: "full",
  height: "full",
  mt: 4,
  flexDirection: "column",
};

const ContactSearch = ({ embedded = false }: Props) => {
  const [search, setSearch] = useState<string | null | undefined>();
  const { colorMode } = useColorMode();
  const { data, loading, error } = useSearchContactsQuery({
    variables: { search },
    skip: search && search.trim().length > 0 ? false : true,
  });
  const setConversation = useLayoutStore((state) => state.setConversation);
  const onSearch = useCallback(
    (v: string) => {
      setSearch(v.trim());
    },
    [setSearch]
  );

  const queryProps: GraphqlResultProps = {
    data: data?.searchContacts,
    loading,
    error,
    LoadingCp: <ContactSearchResultLoader embedded={embedded} />,
    EmptyCp: (
      <Empty
        emptyMessage={
          search && search.trim().length > 0
            ? "No results found, please try another search."
            : ""
        }
      />
    ),
  };
  const getFlexProps = embedded
    ? embeddedFlexProps(colorMode)
    : normalFlexProps;
  return (
    <Flex {...getFlexProps}>
      <ContactSearchBar onSearch={onSearch} />
      <GraphQLRequest {...queryProps}>
        <ContactSearchResult
          users={data?.searchContacts as SearchContactsResponse[]}
          onSelectContact={(conversationId: any, userId: any) =>
            setConversation(conversationId, userId)
          }
          embedded={embedded}
        />
      </GraphQLRequest>
    </Flex>
  );
};

export default ContactSearch;
