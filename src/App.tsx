import { useEffect, useReducer, useState } from "react";
import styles from "./App.module.scss";
import { Button } from "./components/Button/Button";
import { FirstBlock } from "./components/FirstBlock/FirstBlock";
import { InputBox } from "./components/InputBox/InputBox";
import { ToggleBox } from "./components/ToggleBox/ToggleBox";
import { useDebounce } from "./hooks/useDebounce";
import { useThrottledValue } from "./hooks/useThrottledValue";
import { CloseEyeIcon } from "./icons/CloseEye";
import { OpenEyeIcon } from "./icons/OpenEye";

const initialState = {
  email: { value: "", error: "" },
  subtitle: { value: "", error: "" },
  password: { value: "", error: "" },
  repeatPassword: { value: "", error: "" },
};

type NAME = "email" | "subtitle" | "password" | "repeatPassword";

type ACTIONTYPE =
  | { type: "setValue"; payload: { name: NAME; value: string } }
  | { type: "setError"; payload: { name: NAME; error: string } }
  | { type: "setReset" };

function reducer(state: typeof initialState, action: ACTIONTYPE) {
  switch (action.type) {
    case "setValue":
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          value: action.payload.value,
          error: "",
        },
      };
    case "setError":
      return {
        ...state,
        [action.payload.name]: {
          ...state[action.payload.name],
          error: action.payload.error,
        },
      };

    default:
      throw new Error();
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isToggle, setIsToggle] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorIndex, setErrorIndex] = useState<null | NAME>(null);

  const debouncedValue = useDebounce(firstValue, 250);
  const throttledValue = useThrottledValue(secondValue, 1200);

  const handleValue = (name: NAME, value: string) => {
    dispatch({ type: "setValue", payload: { name, value } });
    if (isSubmitted) {
      validateAndDispatchErrors();
    }
  };

  const handleToggle = () => {
    setIsToggle(!isToggle);
  };

  const validateForm = () => {
    const errors: { [key in NAME]?: string } = {};

    if (!state.email.value) {
      errors.email = "Почта обязательна";
    } else if (!/\S+@\S+\.\S+/.test(state.email.value)) {
      errors.email = "Введите почту правильно";
    }

    if (!state.subtitle.value) {
      errors.subtitle = "Описание обязательно";
    }

    if (!state.password.value) {
      errors.password = "Пароль обязателен";
    } else if (state.password.value.length < 6) {
      errors.password = "Минимальная длина пароля 6 символов";
    }

    if (!state.repeatPassword.value) {
      errors.repeatPassword = "Подтвердить пароль обязательна";
    } else if (state.repeatPassword.value !== state.password.value) {
      errors.repeatPassword = "Пароли не совпадают";
    }

    setErrorIndex(Object.keys(errors)[0] as NAME);

    return errors;
  };

  const validateAndDispatchErrors = () => {
    const errors = validateForm();
    Object.entries(errors).forEach(([name, error]) => {
      dispatch({
        type: "setError",
        payload: { name: name as NAME, error },
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully!");
    } else {
      validateAndDispatchErrors();
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      validateAndDispatchErrors();
    }
  }, [
    state.email.value,
    state.password.value,
    state.repeatPassword.value,
    state.subtitle.value,
  ]);

  return (
    <main className={styles.container}>
      <FirstBlock
        firstValue={firstValue}
        setFirstValue={setFirstValue}
        secondValue={secondValue}
        setSecondValue={setSecondValue}
        debouncedValue={debouncedValue}
        throttledValue={throttledValue}
      />

      <form onSubmit={handleSubmit} className={styles.second_block}>
        <InputBox
          label="Эл.почта"
          value={state.email.value}
          onChange={(e) => handleValue("email", e.target.value)}
          onReset={() => handleValue("email", "")}
          isError={Boolean(state.email.error) && errorIndex === "email"}
          errorText={state.email.error}
        />
        <InputBox
          label="Описание"
          value={state.subtitle.value}
          onChange={(e) => handleValue("subtitle", e.target.value)}
          isTextArea={true}
          onReset={() => handleValue("subtitle", "")}
          isError={Boolean(state.subtitle.error) && errorIndex === "subtitle"}
          errorText={state.subtitle.error}
        />
        <InputBox
          type={isShowPassword ? "text" : "password"}
          iconAfter={
            <div onClick={() => setIsShowPassword(!isShowPassword)}>
              {isShowPassword ? <OpenEyeIcon /> : <CloseEyeIcon />}
            </div>
          }
          label="Пароль"
          value={state.password.value}
          onChange={(e) => handleValue("password", e.target.value)}
          onReset={() => handleValue("password", "")}
          isError={Boolean(state.password.error) && errorIndex === "password"}
          errorText={state.password.error}
        />
        <InputBox
          type={isShowPassword ? "text" : "password"}
          label="Подтвердите пароль"
          value={state.repeatPassword.value}
          onChange={(e) => handleValue("repeatPassword", e.target.value)}
          onReset={() => handleValue("repeatPassword", "")}
          isError={
            Boolean(state.repeatPassword.error) &&
            errorIndex === "repeatPassword"
          }
          errorText={state.repeatPassword.error}
        />
        <ToggleBox
          label="Запомнить сессию"
          setIsToggle={handleToggle}
          isToggle={isToggle}
        />
        <Button type="submit" text="Подтвердить" />
      </form>
    </main>
  );
}

export default App;
