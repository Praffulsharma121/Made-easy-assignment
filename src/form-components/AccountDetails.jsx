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

  const handleSubmit = () => {
    if (!info.username || !info.password || !info.confirm) {
      setError("Please fill all fields");
      return;
    }
    if (info.password !== info.confirm) {
      setError("Passwords do not match");
      return;
    }
    setAccount(info);
    setSendData(true);
  };

  useEffect(() => {
    if (sendData) onClickSubmit();
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
      />
      <FormInput
        type="password"
        placeholder="Confirm Password"
        value={info.confirm}
        onChange={(e) => setInfo({ ...info, confirm: e.target.value })}
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
