import { InputHTMLAttributes, LabelHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  name: string;
};

export const Input = ({ id, name, type = "text", ...rest }: InputProps) => (
  <input id={id} name={name} type={type} className="input-custom" {...rest} />
);

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  htmlFor: string;
};

export const Label = ({ htmlFor, children }: LabelProps) => (
  <label htmlFor={htmlFor} className="label-custom">
    {children}
  </label>
);
