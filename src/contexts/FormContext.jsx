import React, { createContext, useState, useContext } from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState("BASIC");
  const [personal, setPersonal] = useState({});
  const [professional, setProfessional] = useState({});
  const [account, setAccount] = useState({});

  const onClickSubmit = () => {
    const singleData = { ...personal, ...professional, ...account };
    console.log(singleData)
  };

  return (
    <FormContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        personal,
        setPersonal,
        professional,
        setProfessional,
        account,
        setAccount,
        onClickSubmit,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
