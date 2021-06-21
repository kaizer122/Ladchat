import { IconButton, Tooltip, VStack } from "@chakra-ui/react";
import { HiBell, HiLightningBolt, HiSearch, HiTag } from "react-icons/hi";
import { MdMail, MdSettings } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { Path } from "../router/modules/constants";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";

const Navigation = () => {
  const history = useHistory();
  return (
    <VStack p={6} justifyContent="space-between" alignItems="center" w="full">
      <VStack>
        <Logo boxSize={14} mb={6} />
        <ColorModeSwitcher />
        <Tooltip label="Actions" placement="right">
          <IconButton
            color="gray.500"
            icon={<HiLightningBolt />}
            aria-label="Actions"
          />
        </Tooltip>
        <Tooltip label="Search" placement="right">
          <IconButton
            color="gray.500"
            icon={<HiSearch />}
            aria-label="Search"
          />
        </Tooltip>
        <Tooltip label="Notifications" placement="right">
          <IconButton
            color="gray.500"
            icon={<HiBell />}
            aria-label="Notifications"
          />
        </Tooltip>
        <Tooltip label="Tags" placement="right">
          <IconButton color="gray.500" icon={<HiTag />} aria-label="Tags" />
        </Tooltip>
        <Tooltip label="Messages" placement="right">
          <IconButton
            color="gray.500"
            icon={<MdMail />}
            aria-label="Messages"
          />
        </Tooltip>
      </VStack>
      <Tooltip label="Settings" placement="right">
        <IconButton
          color="gray.500"
          icon={<MdSettings />}
          aria-label="Settings"
          onClick={() => history.replace(Path.SIGNOUT)}
        />
      </Tooltip>
    </VStack>
  );
};

export default Navigation;
