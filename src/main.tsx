import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@/lib/i18n";
import "./styles/index.css";
import "virtual:svg-icons-register";
import "@ant-design/v5-patch-for-react-19"; // 兼容react 19

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
