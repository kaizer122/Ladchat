import { EditIcon, MoonIcon, SettingsIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChangeEvent } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { Path } from "../../router/modules/constants";

const SettingsMenu = () => {
  const { colorMode, setColorMode } = useColorMode();
  const history = useHistory();
  const SwitchIcon = useColorModeValue(SunIcon, MoonIcon);
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<SettingsIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuGroup title="Settings">
          <MenuItem title="Color Mode">
            <Flex w="full" justify="space-between">
              <Flex align="center" justify="center">
                <SwitchIcon />
                <Text pl={2}>Dark Mode</Text>
              </Flex>
              <Switch
                defaultChecked={colorMode === "dark" ? true : false}
                colorScheme="teal"
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setColorMode(event.target.checked ? "dark" : "light")
                }
              />
            </Flex>
          </MenuItem>
        </MenuGroup>
        <MenuGroup title="Account">
          <MenuItem icon={<EditIcon />}>Edit Profile</MenuItem>
          <MenuItem
            icon={
              <BiLogOutCircle fontSize="1rem" style={{ marginLeft: "-2px" }} />
            }
            variant="outline"
            onClick={() => history.replace(Path.SIGNOUT)}
          >
            SignOut
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default SettingsMenu;
