import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

const CustomAlert = ({
  feedbackCreate,
  feedbackMessages,
  handleCloseFeedback,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={feedbackCreate}
      autoHideDuration={6000}
      onClose={handleCloseFeedback}
    >
      <Alert
        onClose={handleCloseFeedback}
        severity={feedbackMessages.style_message}
        sx={{ width: "100%" }}
      >
        <Typography whiteSpace={"pre-line"}>
          {feedbackMessages.feedback_description_error}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
