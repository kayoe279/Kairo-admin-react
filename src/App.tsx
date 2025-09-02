import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router";
import Router from "./router";

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
