import React, { useState } from "react";
import { StepEnum } from "../enums/StepEnum";
import FormInput from "./FormInput";
import { useFormContext } from "../contexts/FormContext";
import StyleCss from "./FormComponent.module.css";

const ProfessionalDetails = () => {
  const { professional, setProfessional, setCurrentStep } = useFormContext();
  const [selectedSubjects, setSelectedSubjects] = useState(
    professional.subjects ?? []
  );
  const [yearOfExperience, setExperience] = useState(
    professional.yearOfExperience ?? ""
  );
  const [highestQualification, setQualification] = useState(
    professional.highestQualification ?? ""
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState("");

  const subjects = [
    "Maths",
    "English",
    "Science",
    "Physics",
    "Chemistry",
    "Biology",
  ];

  const handleSelect = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleNext = () => {
    if (
      selectedSubjects.length === 0 ||
      !yearOfExperience ||
      !highestQualification
    ) {
      setError("All fields are required");
      return;
    }

    setProfessional({
      subjects: selectedSubjects,
      yearOfExperience,
      highestQualification,
    });

    setCurrentStep(StepEnum.ACCOUNT);
  };

  const handleBack = () => {
    setCurrentStep(StepEnum.BASIC);
  };

  return (
    <div className={StyleCss["form-container"]}>
      <h2 className={StyleCss["form-title"]}>Professional Details</h2>
      <div className={StyleCss["form-group"]}>
        <label className={StyleCss["form-label"]}>Subjects</label>
        <div
          className={StyleCss["dropdown"]}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className={StyleCss["dropdown-display"]}>
            {selectedSubjects.length > 0
              ? selectedSubjects.join(", ")
              : "Select subjects"}
          </div>
          {dropdownOpen && (
            <div
              className={StyleCss["dropdown-list"]}
              onClick={(e) => e.stopPropagation()}
            >
              {subjects.map((subject) => (
                <label key={subject} className={StyleCss["dropdown-option"]}>
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSelect(subject)}
                  />
                  {subject}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={StyleCss["form-group"]}>
        <label className={StyleCss["form-label"]}>Year of Experience</label>
        <FormInput
          type="number"
          placeholder="Enter years of experience"
          value={yearOfExperience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>

      <div className={StyleCss["form-group"]}>
        <label className={StyleCss["form-label"]}>Highest Qualification</label>
        <FormInput
          type="text"
          placeholder="Enter highest qualification"
          value={highestQualification}
          onChange={(e) => setQualification(e.target.value)}
        />
      </div>

      {error && <small className={StyleCss["form__error"]}>{error}</small>}

      <div className={StyleCss["form-buttons"]}>
        <button onClick={handleBack} className={StyleCss["btn-back"]}>
          Back
        </button>
        <button onClick={handleNext} className={StyleCss["btn-next"]}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfessionalDetails;
