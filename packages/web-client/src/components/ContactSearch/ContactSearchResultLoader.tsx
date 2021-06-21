import {
  Flex,
  HStack,
  List,
  ListItem,
  Skeleton,
  SkeletonCircle,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { getEmbeddedListProps } from "./ContactSearchResult";

interface Props {
  embedded: boolean;
}
const ContactSearchResultLoader = ({ embedded }: Props) => {
  const { colorMode } = useColorMode();
  return (
    <Flex w="full" h="full" direction="column" pos="relative">
      <List {...getEmbeddedListProps(embedded, colorMode)}>
        {new Array(5).fill("").map((_, i) => (
          <ListItem key={i}>
            <VStack key={i}>
              <HStack d="flex" alignItems="flex-end" w={"full"} p={2}>
                <SkeletonCircle size="10" maxW={14} maxH={14} mx={2} />
                <Skeleton px={6} py={2} mx={2} w={"90%"} h={14} />
              </HStack>
            </VStack>
          </ListItem>
        ))}
      </List>
    </Flex>
  );
};

export default ContactSearchResultLoader;
