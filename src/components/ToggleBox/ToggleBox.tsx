import { FunctionComponent } from "react";
import styles from "./ToggleBox.module.scss";

interface Props {
  isToggle: boolean;
  setIsToggle: () => void;
  label: string;
}

export const ToggleBox: FunctionComponent<Props> = ({
  isToggle,
  setIsToggle,
  label,
}) => {
  return (
    <div className={styles.container}>
      <div>
        <input
          checked={isToggle}
          onChange={setIsToggle}
          className={styles.toggle_input}
          id={`ios-check`}
          type="checkbox"
        />
        <label
          style={{ background: isToggle ? "#0a84ff" : "#fff" }}
          className={styles.toggle_label}
          htmlFor={`ios-check`}
        >
          <span className={styles.toggle_button} />
        </label>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};
