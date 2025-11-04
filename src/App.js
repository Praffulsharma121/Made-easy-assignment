import React from "react";
import "./App.css";
import PersonalDetails from "./form-components/PersonalDetails";
import ProfessionalDetails from "./form-components/ProfessionalDetails";
import AccountDetails from "./form-components/AccountDetails";
import { StepEnum } from "./enums/StepEnum";
import { FormProvider, useFormContext } from "./contexts/FormContext";

const AppContent = () => {
  const { currentStep } = useFormContext();

  return (
    <div>
      {currentStep === StepEnum.BASIC && <PersonalDetails />}
      {currentStep === StepEnum.PROFESSIONAL && <ProfessionalDetails />}
      {currentStep === StepEnum.ACCOUNT && <AccountDetails />}
    </div>
  );
};

function App() {
  return (
    <FormProvider>
      <AppContent />
    </FormProvider>
  );
}

export default App;
