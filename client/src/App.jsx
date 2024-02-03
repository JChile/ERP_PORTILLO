import { AppRouter } from "./router/AppRouter";
import "./App.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <AppRouter />;
    </LocalizationProvider>
  );
}

export default App;
