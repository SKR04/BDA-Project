import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { CustomButton, FormField } from "../components";

const SelectPreferences = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  return <div>SelectPreferences</div>;
};

export default SelectPreferences;
