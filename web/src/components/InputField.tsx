import React from 'react'
import { useField } from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea } from "@chakra-ui/core";


type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  textarea?: boolean; 
};

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  textarea,
  size: _, 
  ...props 
}) => {
  let InputorTextarea = Input;
  if (textarea) {
    InputorTextarea = Textarea;
  }
  const [field, { error }] = useField(props);
  return (
      <FormControl isInvalid={!!error}>
        <FormLabel htmlFor={field.name}>{label}</FormLabel>
        <InputorTextarea {...field} {...props} id={field.name} placeholder={props.placeholder} />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
   );
  }
