import React, { useState } from "react";

export const useAlertMUI = () => {
  const [feedbackCreate, setFeedbackCreate] = useState(false);
  const [feedbackMessages, setFeedbackMessages] = useState({
    style_message: "error",
    feedback_description_error: "",
  });

  const handleClickFeedback = () => {
    setFeedbackCreate(true);
  };

  const handleCloseFeedback = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setFeedbackCreate(false);
  };

  return {
    feedbackCreate,
    feedbackMessages,
    handleClickFeedback,
    handleCloseFeedback,
    setFeedbackMessages,
  };
};
