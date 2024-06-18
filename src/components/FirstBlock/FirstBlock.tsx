import { Dispatch, FunctionComponent, SetStateAction } from "react";
import { InputBox } from "../InputBox/InputBox";
import styles from "./FirstBlock.module.scss";

interface Props {
  firstValue: string;
  setFirstValue: Dispatch<SetStateAction<string>>;
  secondValue: string;
  setSecondValue: Dispatch<SetStateAction<string>>;
  debouncedValue: string;
  throttledValue: string;
}

export const FirstBlock: FunctionComponent<Props> = ({
  firstValue,
  setFirstValue,
  secondValue,
  setSecondValue,
  debouncedValue,
  throttledValue,
}) => {
  return (
    <div className={styles.container}>
      <InputBox
        value={firstValue}
        onChange={(e) => setFirstValue(e.target.value)}
        label="debounce test"
        onReset={() => setFirstValue("")}
      />
      <InputBox
        value={secondValue}
        onChange={(e) => setSecondValue(e.target.value)}
        label="trottling test"
        onReset={() => setSecondValue("")}
      />
      <div className={styles.test_container}>
        <span className={styles.debounce_title}>Debounce:</span>
        <span className={styles.debounce_value}>{debouncedValue}</span>
        <span className={styles.throttle_title}>Throttle:</span>
        <span className={styles.throttle_value}>{throttledValue}</span>
      </div>
    </div>
  );
};
