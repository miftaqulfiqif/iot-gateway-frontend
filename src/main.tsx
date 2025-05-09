import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Devices from "./pages/DevicesPage.tsx";
import Dashboard from "./pages/DashboardPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import DeviceIDAPage from "./pages/Devices/DeviceIDAPage.tsx";
import DeviceBMIPage from "./pages/Devices/DeviceBMIPage.tsx";
import DeviceDigitProBabyPage from "./pages/Devices/DeviceDigitProBabyPage.tsx";
import DeviceDopplerPage from "./pages/Devices/DeviceDopplerPage.tsx";
import MeasurementPage from "./pages/Devices/MeasurementPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/measurement" element={<MeasurementPage />} />

        {/* DevicePages */}
        <Route path="/device/digit-pro-ida" element={<DeviceIDAPage />} />
        <Route path="/device/bmi" element={<DeviceBMIPage />} />
        <Route
          path="/device/digit-pro-baby"
          element={<DeviceDigitProBabyPage />}
        />
        <Route path="/device/doppler" element={<DeviceDopplerPage />} />
      </Routes>
    </Router>
  </StrictMode>
);
