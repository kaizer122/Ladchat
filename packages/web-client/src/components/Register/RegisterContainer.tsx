import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FormikProvider, useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import shallow from "zustand/shallow";
import { RegisterInput, useRegisterMutation } from "../../graphql";
import { useErrorHandler } from "../../hooks";
import { Path } from "../../router/modules/constants";
import { useAuthStore } from "../../stores/AuthStore";
import { Logo } from "../Logo";
import RegisterFirstStep from "./RegisterFirstStep";
import RegisterSecondStep from "./RegisterSecondStep";
import registerValidation from "./registerValidation.yup";

const RegisterContainer = () => {
  const [isFirstStep, setIsFirstStep] = useState(true);

  const { setToken, isLoggedIn } = useAuthStore(
    (state) => ({
      setToken: state.setToken,
      isLoggedIn: state.isLoggedIn,
    }),
    shallow
  );

  const history = useHistory();

  const [register, { error, loading }] = useRegisterMutation();
  const { showSuccess } = useErrorHandler(error);

  useEffect(() => {
    if (isLoggedIn) setTimeout(() => history.replace(Path.HOME), 300);
  }, [isLoggedIn, history]);

  const onFirstStepSubmit = (
    values: RegisterInput & { confPassword: string },
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    actions.setSubmitting(false);
    setIsFirstStep(false);
  };

  const onSecondStepSubmit = (
    values: Partial<RegisterInput & { confPassword: string }>,
    actions: { setSubmitting: (arg0: boolean) => void }
  ) => {
    if (!loading) {
      const input = { ...values };
      delete input.confPassword;
      actions.setSubmitting(true);
      register({
        variables: { input: input as RegisterInput },
      })
        .then(({ data, errors }) => {
          actions.setSubmitting(false);
          if (data?.register.token?.length && !errors?.length) {
            setToken(data.register.token);
            showSuccess({
              title: "Welcome aboard",
              description: "You have been successfully registered",
            });
          }
        })
        .catch(() => actions.setSubmitting(false));
    }
  };

  const formik = useFormik<RegisterInput & { confPassword: string }>({
    initialValues: {
      avatarUrl: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confPassword: "",
    },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: registerValidation(isFirstStep),
    onSubmit: isFirstStep ? onFirstStepSubmit : onSecondStepSubmit,
  });

  return (
    <Flex width="full" height="full" align="center" justifyContent="center">
      <Box
        borderRadius={20}
        borderWidth={1}
        boxShadow="lg"
        minW="380px"
        maxW="450px"
      >
        <Center p={8}>
          <Logo boxSize="160px" />
        </Center>
        <FormikProvider value={formik}>
          {isFirstStep ? (
            <RegisterFirstStep />
          ) : (
            <RegisterSecondStep setFieldValue={formik.setFieldValue} />
          )}

          <Box px={8}>
            <Button
              width="full"
              variant="solid"
              colorScheme="teal"
              size="md"
              isLoading={formik.isSubmitting}
              onClick={formik.submitForm}
            >
              {isFirstStep ? "Register" : "Finish Registration"}
            </Button>
          </Box>
        </FormikProvider>

        {isFirstStep && (
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
        )}
        <Flex align="flex-end" justify="flex-end" m={4}>
          <Button
            variant="link"
            colorScheme="teal"
            size="sm"
            fontSize="sm"
            onClick={() => history.replace(Path.SIGNIN)}
          >
            Already have an account? Sign in
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RegisterContainer;
