import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { StepEnum } from "../enums/StepEnum";
import { useFormContext } from "../contexts/FormContext";
import StyleCss from "./FormComponent.module.css";

const AccountDetails = () => {
  const { account, setAccount, setCurrentStep, onClickSubmit } =
    useFormContext();
  const [info, setInfo] = useState({
    username: account.username ?? "",
    password: account.password ?? "",
    confirm: account.password ?? "",
  });
  const [error, setError] = useState("");
  const [sendData, setSendData] = useState(false);
  const [invalidConfirm, setInvalidConfirm] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);

  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    return password.length >= 6 && hasUppercase && hasSpecial;
  };

  const handleSubmit = () => {
    if (!info.username || !info.password || !info.confirm) {
      setError("Please fill all fields");
      setInvalidConfirm(false);
      return;
    }

    if (info.password !== info.confirm) {
      setError("Passwords do not match");
      setInvalidConfirm(true);
      return;
    }

    if (!validatePassword(info.password)) {
      setError(
        "Password must be at least 6 characters, include 1 capital letter and 1 special character"
      );
      setInvalidPassword(true);
      setInvalidConfirm(false);
      return;
    }

    setInvalidConfirm(false);
    setError("");
    setAccount(info);
    setSendData(true);
  };

  useEffect(() => {
    if (sendData) {
      onClickSubmit();
      setSendData(false);
    }
  }, [sendData]);

  return (
    <div className={StyleCss["form__section"]}>
      <h2 className={StyleCss["form__title"]}>Account Details</h2>
      <FormInput
        type="text"
        placeholder="Username"
        value={info.username}
        onChange={(e) => setInfo({ ...info, username: e.target.value })}
      />
      <FormInput
        type="password"
        placeholder="Password"
        value={info.password}
        onChange={(e) => setInfo({ ...info, password: e.target.value })}
        invalid={invalidPassword}
      />
      <FormInput
        type="password"
        placeholder="Confirm Password"
        value={info.confirm}
        onChange={(e) => setInfo({ ...info, confirm: e.target.value })}
        invalid={invalidConfirm}
      />

      {error && <small className={StyleCss["form__error"]}>{error}</small>}

      <div className={StyleCss["form__actions"]}>
        <button
          className={StyleCss["form__btn"]}
          onClick={() => setCurrentStep(StepEnum.PROFESSIONAL)}
        >
          Back
        </button>
        <button className={StyleCss["form__btn"]} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
