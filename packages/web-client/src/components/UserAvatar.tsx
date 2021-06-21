import { Avatar, AvatarBadge, Tooltip } from "@chakra-ui/react";

type Props = {
  name: string;
  avatarUrl: string;
  isOnline: boolean;
};

const UserAvatar = ({ name, isOnline, avatarUrl }: Props) => {
  return (
    <Tooltip label={name}>
      <Avatar bgColor={"transparent"} src={avatarUrl}>
        <AvatarBadge boxSize={4} bg={isOnline ? "green.500" : "gray.200"} />
      </Avatar>
    </Tooltip>
  );
};

export default UserAvatar;
