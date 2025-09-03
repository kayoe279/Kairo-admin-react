import { HeroUIProvider } from "@heroui/react";
import { BrowserRouter } from "react-router";
import { AntConfigProvider } from "@/layouts/AntConfigProvider";
import Router from "./router";

function App() {
  return (
    <HeroUIProvider>
      <AntConfigProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AntConfigProvider>
    </HeroUIProvider>
  );
}

export default App;
