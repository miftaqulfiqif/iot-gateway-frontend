export type Devices = {
  id: string;
  mac_address: string;
  ip_address: string;
  model: string;
  device_function: string;
  type: string;
  connection: string;
  name: string;
  distance: number;
  filteredRSSI: number;
  rssi: number;
  icon: string;
};

export type PatientMonitoringDevices = {
  id: string;
  name: string;
  ip_address: string;
};

export type DetailDevice = {
  detail: {
    id: string;
    mac_address?: string;
    ip_address?: string;
    serial_number?: string;
    name: string;
    model: string;
    device_function: string;
    type?: string;
    connection: string;
    is_connected: boolean;
    count_used: number;
    created_at: string;
    updated_at: string;
    gateway_id: string;
  };
  recent_users: Array<any>;
  recent_patient_use: Array<any>;
};
