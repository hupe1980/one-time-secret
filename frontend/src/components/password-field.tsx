import React from 'react';
import {
  PasswordField as AMUPasswordField,
  PasswordFieldProps
} from 'amplify-material-ui';
import { fieldToTextField } from 'formik-material-ui';
import { FieldProps } from 'formik';

export type TextFieldProps = FieldProps &
  Omit<PasswordFieldProps, 'error' | 'name' | 'onChange' | 'value'> & {
    // Fix for the type for variant which is using union
    // https://stackoverflow.com/questions/55664421
    variant: 'standard' | 'filled' | 'outlined' | undefined;
  };

export const PasswordField: React.ComponentType<TextFieldProps> = ({
  children,
  ...props
}: TextFieldProps) => (
  <AMUPasswordField {...fieldToTextField(props)}>{children}</AMUPasswordField>
);
