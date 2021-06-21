import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

export interface IInputField {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  help?: string;
  type?: string;
  inputRight?: JSX.Element;
  inputLeft?: JSX.Element;
}

const InputField: React.FC<IInputField> = ({
  name,
  label,
  help,
  type = "text",
  disabled,
  placeholder,
  inputRight,
  inputLeft,
}) => {
  const labelColor = useColorModeValue("gray.600", "gray.500");
  const [field, meta] = useField(name);
  const { ...fieldProps } = field;

  return (
    <FormControl isInvalid={!!meta.touched && !!meta.error}>
      <FormLabel color={labelColor}> {label}</FormLabel>
      <InputGroup>
        {inputLeft && inputLeft}
        <Input
          {...fieldProps}
          type={type}
          isDisabled={disabled}
          placeholder={placeholder}
        />
        {inputRight && inputRight}
      </InputGroup>
      {help && <FormHelperText fontSize="xs">{help}</FormHelperText>}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
export default React.memo(InputField);
