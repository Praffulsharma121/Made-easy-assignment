import React, { useState } from "react";
import FormInput from "./FormInput";
import { StepEnum } from "../enums/StepEnum";
import { useFormContext } from "../contexts/FormContext";
import StyleCss from "./FormComponent.module.css";

const PersonalDetails = () => {
  const { personal, setPersonal, setCurrentStep } = useFormContext();
  const [details, setDetails] = useState({
    fullName: personal.fullName || "",
    email: personal.email || "",
    phone: personal.phone || "",
    dob: personal.dob || "",
  });
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!details.fullName || !details.email || !details.phone || !details.dob) {
      setError("Please fill all fields");
      return;
    }
    if (!details.email.includes("@") || !details.email.includes(".")) {
      setError("Please enter a valid email");
      return;
    }

    setPersonal(details);
    setCurrentStep(StepEnum.PROFESSIONAL);
  };

  return (
    <div className={StyleCss["form__section"]}>
      <h2 className={StyleCss["form__title"]}>Personal Information</h2>

      <FormInput
        type="text"
        placeholder="Full Name"
        value={details.fullName}
        onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
      />
      <FormInput
        type="email"
        placeholder="Email"
        value={details.email}
        onChange={(e) => setDetails({ ...details, email: e.target.value })}
      />
      <FormInput
        type="text"
        placeholder="Phone Number"
        value={details.phone}
        onChange={(e) => setDetails({ ...details, phone: e.target.value })}
      />
      <FormInput
        type="date"
        placeholder="Date of Birth"
        value={details.dob}
        onChange={(e) => setDetails({ ...details, dob: e.target.value })}
      />

      {error && <small className={StyleCss["form__error"]}>{error}</small>}

      <div className={StyleCss["form__actions"]}>
        <button className={StyleCss["form__btn"]} onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalDetails;
