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
import MeasurementPage from "./pages/MeasurementPage.tsx";
import Patients from "./pages/PatientsPage.tsx";
import DevicePM9000Page from "./pages/Devices/DevicePM9000Page.tsx";
import DeviceDS001Page from "./pages/Devices/DeviceDS001Page.tsx";
import { LoginPage } from "./pages/auth/LoginPage.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { PublicRoute } from "./routes/PublicRoute.tsx";
import { PrivateRoute } from "./routes/PrivateRoute.tsx";
import MeasurementHistoriesPage from "./pages/MeasurementHistoriesPage.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Routes>
            {/* Auth */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              {/* MainPages */}
              <Route path="/" element={<MeasurementPage />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/measurement" element={<MeasurementPage />} />
              <Route path="/patients" element={<Patients />} />
              <Route
                path="/measurement-histories"
                element={<MeasurementHistoriesPage />}
              />
              {/* DevicePages */}
              <Route
                path="/device/digitpro_ida/:mac"
                element={<DeviceIDAPage />}
              />
              {/* TODO: Add DeviceIDAPage */}
              <Route
                path="/device/digitpro_bmi/:mac"
                element={<DeviceBMIPage />}
              />
              <Route
                path="/device/digitpro_baby/:mac"
                element={<DeviceDigitProBabyPage />}
              />
              <Route
                path="/device/ultrasonic_pocket_doppler/:mac"
                element={<DeviceDopplerPage />}
              />
              <Route
                path="/device/pasien_monitor_9000/:mac"
                element={<DevicePM9000Page />}
              />
              <Route
                path="/device/diagnostic_station_001/:mac"
                element={<DeviceDS001Page />}
              />
            </Route>
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
