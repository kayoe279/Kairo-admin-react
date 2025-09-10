import { BrowserRouter } from "react-router";
import { AntConfigProvider } from "@/layouts/AntConfigProvider";
import { Router } from "./router";

function App() {
  return (
    <AntConfigProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AntConfigProvider>
  );
}

export default App;
