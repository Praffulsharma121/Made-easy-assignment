import React, { createContext, useState, useContext } from "react";

const FormContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState("BASIC");
  const [personal, setPersonal] = useState({});
  const [professional, setProfessional] = useState({});
  const [account, setAccount] = useState({});

  const onClickSubmit = () => {
    const formData = { ...personal, ...professional, ...account };
    console.log(formData);
    const formattedData = {
      full_name: formData.fullName,
      email: formData.email,
      phone_number: formData.phone,
      date_of_birth: formData.dob,
      subjects: formData.subjects,
      years_of_experience: Number(formData.yearOfExperience),
      highest_qualification: formData.highestQualification,
      username: formData.username,
      password: formData.password,
    };
    sendFormData(formattedData);
  };

  const sendFormData = async (formattedData) => {
    try {
      const response = await fetch("http://localhost:5000/api/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      const result = await response.json();
      alert(result.msg);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Unable to reach the server. Please try again later.");
    }
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
