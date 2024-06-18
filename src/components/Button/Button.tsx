import { FunctionComponent } from "react";
import styles from "./Button.module.scss";

interface Props extends Partial<HTMLButtonElement> {
  text: string;
}

export const Button: FunctionComponent<Props> = ({ text, ...props }) => {
  return (
    <button className={styles.btn} {...props}>
      {text}
    </button>
  );
};
