import { useRef, useState } from "react";
import { Close } from "../../icons/Close";
import customClsx from "../../utils/customClsx";
import styles from "./InputBox.module.scss";
import { InputProps } from "./type";

export const InputBox = ({
  isError,
  // @ts-expect-error Проверка идет во время runtime на 83 строке
  errorText,
  iconAfter,
  label,
  isTextArea = false,
  ...inputProps
}: InputProps) => {
  const [isInputFocus, setIsInputFocus] = useState(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const containerClassName = customClsx({
    [styles.container]: true,
    [styles.container_textarea]: isTextArea,
    [styles.container_default]: !isError,
    [styles.container_error]: isError,
  });

  const labelClassName = customClsx({
    [styles.label]: true,
    [styles.label_default]: Boolean(inputProps.value?.trim()) && !isInputFocus,
    [styles.label_active]: Boolean(inputProps?.value?.trim()) || isInputFocus,
    [styles.label_error]: isError,
  });

  const inputClassName = customClsx({
    [styles.input]: !isTextArea,
    [styles.textarea]: isTextArea,
  });

  const Component = isTextArea ? "textarea" : "input";

  return (
    <>
      <div
        onClick={() => {
          if (inputRef.current === null) return;
          inputRef.current.focus();
        }}
        className={containerClassName}
        data-area={isTextArea}
      >
        <span className={labelClassName}>{isError ? errorText : label}</span>
        <Component
          ref={inputRef}
          onFocus={(e) => {
            inputProps.onFocus && inputProps.onFocus(e);
            setIsInputFocus(true);
          }}
          onBlur={(e) => {
            inputProps.onBlur && inputProps.onBlur(e);
            setIsInputFocus(false);
          }}
          className={inputClassName}
          {...inputProps}
        />
        {!iconAfter &&
          !isTextArea &&
          inputProps?.onReset &&
          inputProps.value.trim() !== "" && (
            <div
              onClick={(e) => {
                if (!inputProps?.onReset) return;
                if (inputRef.current === null) return;
                inputProps?.onReset();
                inputRef.current.blur();
                e.stopPropagation();
              }}
              className={styles.icon_after}
            >
              <Close />
            </div>
          )}
        {iconAfter && (
          <div tabIndex={3} className={styles.icon_after}>
            {iconAfter}
          </div>
        )}
      </div>
    </>
  );
};
