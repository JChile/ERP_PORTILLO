import { AppRouter } from "./router/AppRouter";
import "./App.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <AppRouter />;
    </LocalizationProvider>
  );
}

export default App;
