import { InputHTMLAttributes, ReactElement } from "react";

type ErrorProps = { isError: true; errorText: string } | { isError?: false };

type TextInputProps = {
  isTextArea: boolean;
};

type IconAfterProps = { iconAfter?: ReactElement };

type LabelProps = { label: string };

interface BaseProps extends Partial<InputHTMLAttributes<HTMLInputElement>> {}

export type InputProps = TextInputProps &
  ErrorProps &
  IconAfterProps &
  LabelProps &
  BaseProps;
