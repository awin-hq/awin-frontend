import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./input.module.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(styles.input, className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";