import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikProps } from "formik";
import React, { useEffect } from "react";
import { FaFacebookF, FaGoogle, FaLock } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { useHistory } from "react-router-dom";
import shallow from "zustand/shallow";
import { Logo } from "../../components/Logo";
import { LoginInput, useLoginMutation } from "../../graphql";
import { useErrorHandler } from "../../hooks";
import { Path } from "../../router/modules/constants";
import { useAuthStore } from "../../stores/AuthStore";
import signinValidation from "./SigninValidation.yup";

const Signin: React.FC = () => {
  const { setToken, isLoggedIn } = useAuthStore(
    (state) => ({
      setToken: state.setToken,
      isLoggedIn: state.isLoggedIn,
    }),
    shallow
  );

  const history = useHistory();

  const { isOpen, onToggle } = useDisclosure();
  const [login, { error }] = useLoginMutation();
  const { showSuccess } = useErrorHandler(error);

  useEffect(() => {
    if (isLoggedIn) setTimeout(() => history.replace(Path.HOME), 300);
  }, [isLoggedIn, history]);

  const onSubmit = (
    values: LoginInput,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    login({
      variables: {
        input: values,
      },
    })
      .then(({ data }) => {
        if (data?.login.token) {
          actions.setSubmitting(false);
          setToken(data.login.token);
          showSuccess({
            title: "Welcome back",
            description: "You have been successfully logged in",
          });
        }
      })
      .catch(() => actions.setSubmitting(false));
  };

  return (
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box
        borderRadius={20}
        borderWidth={1}
        boxShadow="lg"
        minW="380px"
        maxW="500px"
        p={8}
      >
        <Center>
          <Logo boxSize="160px" />
        </Center>
        <Box textAlign="left">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={signinValidation}
            validateOnBlur={true}
            validateOnChange={true}
            validateOnMount={false}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }: FormikProps<LoginInput>) => (
              <Form>
                <Field name="email">
                  {({ field, meta }: FieldProps) => (
                    <FormControl isInvalid={!!meta.touched && !!meta.error}>
                      <FormLabel>Email *</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={MdEmail} color={"gray.500"} />
                        </InputLeftElement>
                        <Input placeholder="test@test.com" {...field} />
                      </InputGroup>
                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="password">
                  {({ field, meta }: FieldProps) => (
                    <FormControl
                      mt={4}
                      isInvalid={!!meta.touched && !!meta.error}
                    >
                      <FormLabel>Password *</FormLabel>
                      <InputGroup>
                        <InputLeftElement>
                          <Icon as={FaLock} color={"gray.500"} />
                        </InputLeftElement>
                        <Input
                          type={isOpen ? "text" : "password"}
                          placeholder="*******"
                          {...field}
                        />
                        <InputRightElement>
                          <Icon
                            as={isOpen ? HiEye : HiEyeOff}
                            color={"gray.500"}
                            onClick={onToggle}
                          />
                        </InputRightElement>
                      </InputGroup>

                      <FormErrorMessage>{meta.error}</FormErrorMessage>
                      <Flex align="flex-end" justify="flex-end" mt="1">
                        <Button
                          variant="link"
                          colorScheme="teal"
                          size="sm"
                          fontSize="xs"
                          fontWeight="normal"
                        >
                          Forgot your password ?
                        </Button>
                      </Flex>
                    </FormControl>
                  )}
                </Field>
                <Button
                  width="full"
                  mt={4}
                  variant="solid"
                  colorScheme="teal"
                  size="md"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Sign In
                </Button>
                <HStack
                  spacing={2}
                  mt={2}
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton
                    aria-label="Sign in with facebook"
                    colorScheme="facebook"
                    minWidth="3.7rem"
                    icon={<FaFacebookF fontSize="1.3rem" />}
                  />
                  <IconButton
                    aria-label="Sign in with google"
                    colorScheme="red"
                    minWidth="3.7rem"
                    icon={<FaGoogle fontSize="1.3rem" />}
                  />
                </HStack>
              </Form>
            )}
          </Formik>
        </Box>

        <Flex align="flex-end" justify="flex-end" mt={2}>
          <Button
            variant="link"
            colorScheme="teal"
            size="sm"
            fontSize="sm"
            fontWeight="bold"
            onClick={() => history.push(Path.REGISTER)}
          >
            Don't have an account ? Join us !
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
export default Signin;
