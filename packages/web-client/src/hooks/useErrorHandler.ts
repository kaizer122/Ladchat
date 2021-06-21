import { ApolloError } from "@apollo/client";
import { useToast, UseToastOptions } from "@chakra-ui/react";
import { useEffect } from "react";

type MaybeError = ApolloError | undefined;

const toastParams: UseToastOptions = {
  title: "Erreur",
  description: "Une erreur inattendue s'est produite.",
  status: "error",
  duration: 3000,
  isClosable: true,
};

const useErrorHandler = (...args: MaybeError[]) => {
  const toast = useToast();

  useEffect(() => {
    if (args?.length)
      args.forEach((error) => {
        renderError(toast, error);
      });
  }, [args, toast]);

  const showError = (err?: ApolloError) => renderError(toast, err);
  const showErrorMessage = ({
    description,
    title,
  }: {
    description: string;
    title?: string;
  }) =>
    toast({
      title: title ?? "Error",
      description,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  const showSuccess = ({
    description,
    title,
  }: {
    description: string;
    title?: string;
  }) =>
    toast({
      title: title ?? "Success",
      description,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

  return { showError, showSuccess, showErrorMessage };
};

const renderError = (
  toast: (props: UseToastOptions) => void,
  err?: ApolloError
) => {
  if (err && err.message) {
    // if (err.graphQLErrors.length > 0 && err.graphQLErrors[0].message)
    toast({ ...toastParams, description: err.message });
  }
};

export default useErrorHandler;
