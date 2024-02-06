import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";

// CONFIGURACION DE FEEDBACK
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const CustomAlert = ({
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
