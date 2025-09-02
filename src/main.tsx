import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/lib/i18n";
import "./styles/index.css";
import "virtual:svg-icons-register";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
