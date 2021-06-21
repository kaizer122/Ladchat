import { Button, Center, Image, Text } from "@chakra-ui/react";
import { getRandomAvatar } from "@ladchat/shared";
import { useEffect, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

interface Props {
  setFieldValue: (field: string, value: any) => void;
}

function RegisterSecondStep({ setFieldValue }: Props) {
  const [avatarUrl, setAvatarUrl] = useState(getRandomAvatar().avatarUrl);

  useEffect(() => {
    setFieldValue("avatarUrl", avatarUrl);
  }, [avatarUrl]);
  return (
    <Center flexDir="column" px={2}>
      <Text fontSize="lg">Choose an avatar !</Text>
      <Image
        maxW="150px"
        rounded="full"
        my={2}
        src={avatarUrl}
        loading={"eager"}
      />
      <Button
        mb={4}
        variant="solid"
        colorScheme="green"
        size="md"
        rightIcon={<FiRefreshCcw />}
        onClick={() => setAvatarUrl(getRandomAvatar().avatarUrl)}
      >
        Reroll
      </Button>
    </Center>
  );
}

export default RegisterSecondStep;
