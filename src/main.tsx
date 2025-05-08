import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Devices from "./pages/DevicesPage.tsx";
import Dashboard from "./pages/DashboardPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
      </Routes>
    </Router>
  </StrictMode>
);
