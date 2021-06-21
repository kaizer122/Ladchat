import {
  ColorMode,
  Flex,
  List,
  ListItem,
  ListProps,
  useColorMode,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { themeColors } from "../../config/theme";
import { SearchContactsResponse } from "../../graphql";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import SearchResultItem from "./SearchResultItem";

interface Props {
  embedded: boolean;
  users?: SearchContactsResponse[];
  onSelectContact: (
    userId?: string | null,
    conversationId?: string | null
  ) => void;
}
export const getEmbeddedListProps = (
  embedded: boolean,
  colorMode: ColorMode
): ListProps =>
  embedded
    ? {
        pos: "absolute",
        top: -4,
        left: 10,
        bg:
          colorMode === "light"
            ? themeColors.globalBg[0]
            : themeColors.globalBg[1],
        w: "full",
        maxW: ["70vw", "60vw", "50vw", "30vw"],
        borderTopWidth: 0,
        borderWidth: 1,
        borderColor:
          colorMode === "light"
            ? themeColors.borderColor[0]
            : themeColors.borderColor[1],
        zIndex: "popover",
      }
    : {};

const ContactSearchResult = ({ users, onSelectContact, embedded }: Props) => {
  const [isVisible, setIsVisible] = useState(true);
  const { colorMode } = useColorMode();
  const ref = useRef() as React.MutableRefObject<HTMLUListElement>;
  const show = useMemo(
    () => (!embedded ? true : isVisible),
    [isVisible, embedded]
  );
  embedded && useOnClickOutside(ref, () => setIsVisible(false));

  return (
    <Flex w="full" h="full" direction="column" pos="relative">
      {show && (
        <List ref={ref} {...getEmbeddedListProps(embedded, colorMode)}>
          {users?.map((user) => (
            <ListItem
              key={user._id}
              onClick={() => {
                setIsVisible(false);
                onSelectContact(user.conversationId, user._id);
              }}
            >
              <SearchResultItem user={user} />
            </ListItem>
          ))}
        </List>
      )}
    </Flex>
  );
};

export default ContactSearchResult;
