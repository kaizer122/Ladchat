import { Box, Icon, InputRightElement, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import InputField from "../../components/Common/InputField";

const RegisterFirstStep: React.FC = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfPass, setShowConfPass] = useState(false);

  return (
    <>
      <SimpleGrid spacingX={4} spacingY={4} columns={[1, 1, 2]} px={8}>
        <InputField name="firstName" label="First Name" placeholder="John" />
        <InputField name="lastName" label="Last Name" placeholder="Doe" />
      </SimpleGrid>
      <Box py={2} px={8}>
        <InputField
          name="email"
          label="Email"
          placeholder="John.doe@dummy.com"
        />
      </Box>
      <SimpleGrid spacingX={4} spacingY={4} columns={[1, 1, 2]} px={8} pb={4}>
        <InputField
          name="password"
          type={showPass ? "text" : "password"}
          label="Password"
          placeholder="******"
          inputRight={
            <InputRightElement>
              <Icon
                as={showPass ? HiEye : HiEyeOff}
                color={"gray.500"}
                onClick={() => setShowPass((v) => !v)}
              />
            </InputRightElement>
          }
        />
        <InputField
          name="confPassword"
          type={showConfPass ? "text" : "password"}
          label="Confirm Password"
          placeholder="******"
          inputRight={
            <InputRightElement>
              <Icon
                as={showConfPass ? HiEye : HiEyeOff}
                color={"gray.500"}
                onClick={() => setShowConfPass((v) => !v)}
              />
            </InputRightElement>
          }
        />
      </SimpleGrid>
    </>
  );
};
export default RegisterFirstStep;
