import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Devices from "./pages/DevicesPage.tsx";
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
import PatientMonitorPage from "./pages/PatientMonitorPage.tsx";
import DetailPatientPage from "./pages/DetailPatientPage.tsx";
import { RoomsPage } from "./pages/RoomsPage.tsx";
import DetailRoomPage from "./pages/DetailRoomPage.tsx";
import { UsersPage } from "./pages/UsersPage.tsx";
import DetailUserPage from "./pages/DetailUserPage.tsx";
import NotFoundPage from "./pages/error/NotFoundPage.tsx";
import DetailUserAdminPage from "./pages/DetailUserAdminPage.tsx";
import DetailUserDoctorPage from "./pages/DetailUserDoctorPage.tsx";
import DetailUserNursePage from "./pages/DetailUserNursePage.tsx";
import { DetailBluetoothDevice } from "./pages/Device/DetailBluetoothDevice.tsx";
import { DetailTcpIpDevice } from "./pages/Device/DetailTcpIpDevice.tsx";
import { ConfirmModalProvider } from "./context/ConifmModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <ConfirmModalProvider>
          <Router>
            <Routes>
              {/* Auth */}
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<LoginPage />} />
              </Route>

              <Route element={<PrivateRoute />}>
                {/* MainPages */}
                <Route path="/" element={<MeasurementPage />} />
                <Route path="/measurement" element={<MeasurementPage />} />
                <Route
                  path="/patient-monitor"
                  element={<PatientMonitorPage />}
                />
                <Route path="/devices" element={<Devices />} />
                {/* Detail Device */}
                <Route
                  path="/device/bluetooth/:mac"
                  element={<DetailBluetoothDevice />}
                />
                <Route
                  path="/device/tcpip/:ip"
                  element={<DetailTcpIpDevice />}
                />
                <Route path="/patients" element={<Patients />} />
                <Route
                  path="/detail-patient/:patientId"
                  element={<DetailPatientPage />}
                />
                <Route path="/rooms" element={<RoomsPage />} />
                <Route path="/room/:roomId" element={<DetailRoomPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route
                  path="/users/detail-user/:userId"
                  element={<DetailUserPage />}
                />
                <Route
                  path="/users/detail-user/admin/:userId"
                  element={<DetailUserAdminPage />}
                />
                <Route
                  path="/users/detail-user/doctor/:userId"
                  element={<DetailUserDoctorPage />}
                />
                <Route
                  path="/users/detail-user/nurse/:userId"
                  element={<DetailUserNursePage />}
                />
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
                  path="/device/pasien_monitor_9000/:ip"
                  element={<DevicePM9000Page />}
                />
                <Route
                  path="/device/diagnostic_station_001/:ip"
                  element={<DeviceDS001Page />}
                />

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Router>
        </ConfirmModalProvider>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);
