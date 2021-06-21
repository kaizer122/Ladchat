import {
  Avatar,
  AvatarBadge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { RiDribbbleLine, RiInstagramLine, RiTwitterFill } from "react-icons/ri";
import { useMeQuery } from "../../graphql";
import ConversationsContainer from "./Conversations/ConversationsContainer";

const onlineFriends = [
  "Lazar Nikolov",
  "Mark Chandler",
  "Segun Adebayo",
  "Tim Kolberger",
  "Folasade Agbaje",
  "Alex Gerrit",
  "Jason Hughes",
  "Jonathan Bakebwa",
  "Tioluwani Kolawole",
];

const ChatHistorySidebar = () => {
  const { data, loading } = useMeQuery();
  return (
    <VStack h="full" alignItems="center" w="full" spacing={6}>
      <Flex
        w="full"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
      >
        {!loading && (
          <Avatar
            name="Travis Taylor"
            src={data?.me.avatarUrl}
            bg={"transparent"}
            size="2xl"
          >
            <AvatarBadge bg="green.400" boxSize={8} borderWidth={4} mr={4} />
          </Avatar>
        )}
        <VStack>
          <Heading size="md" mt={{ base: 0, lg: 3 }}>
            {!loading && data?.me.fullName}
          </Heading>
          <HStack px={8} justifyContent="center" spacing={3} mt={6}>
            <IconButton
              icon={<RiDribbbleLine />}
              variant="ghost"
              rounded="full"
              color="gray.500"
              h={10}
              aria-label="Dribbble Account"
            />
            <IconButton
              icon={<RiInstagramLine />}
              variant="ghost"
              rounded="full"
              color="gray.500"
              h={10}
              aria-label="Instagram Account"
            />
            <IconButton
              icon={<RiTwitterFill />}
              variant="ghost"
              rounded="full"
              color="gray.500"
              h={10}
              aria-label="Twitter Account"
            />
          </HStack>
        </VStack>
      </Flex>
      <Box px={8} w="full">
        <Divider color="gray.100" />
      </Box>
      <ConversationsContainer />
    </VStack>
  );
};

export default ChatHistorySidebar;
