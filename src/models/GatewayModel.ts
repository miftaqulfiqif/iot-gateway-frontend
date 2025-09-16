export type ListGateways = {
  id: string;
  name: string;
  description: string;
  location: string;
  network: string;
  status: string;
  devices_count: number;
  uptime: string;
  firmware_version: string;
};

export const dummyGateways: ListGateways[] = [
  {
    id: "GW-001",
    name: "Gateway A",
    description: "Main IoT gateway for building A",
    location: "Jakarta",
    network: "192.168.1.1",
    status: "online",
    devices_count: 12,
    uptime: "120h 35m",
    firmware_version: "v1.0.3",
  },
  {
    id: "GW-002",
    name: "Gateway B",
    description: "Backup gateway for building A",
    location: "Jakarta",
    network: "192.168.1.2",
    status: "offline",
    devices_count: 0,
    uptime: "0h 0m",
    firmware_version: "v1.0.2",
  },
  {
    id: "GW-003",
    name: "Gateway C",
    description: "IoT gateway for laboratory devices",
    location: "Bandung",
    network: "192.168.2.1",
    status: "online",
    devices_count: 8,
    uptime: "98h 15m",
    firmware_version: "v1.0.5",
  },
  {
    id: "GW-004",
    name: "Gateway D",
    description: "Server room gateway",
    location: "Yogyakarta",
    network: "192.168.2.2",
    status: "online",
    devices_count: 20,
    uptime: "310h 20m",
    firmware_version: "v1.1.0",
  },
  {
    id: "GW-005",
    name: "Gateway E",
    description: "IoT gateway for ICU devices",
    location: "Surabaya",
    network: "192.168.3.1",
    status: "online",
    devices_count: 15,
    uptime: "200h 42m",
    firmware_version: "v1.0.8",
  },
  {
    id: "GW-006",
    name: "Gateway F",
    description: "Backup gateway for ICU",
    location: "Surabaya",
    network: "192.168.3.2",
    status: "offline",
    devices_count: 0,
    uptime: "0h 0m",
    firmware_version: "v1.0.7",
  },
  {
    id: "GW-007",
    name: "Gateway G",
    description: "IoT gateway for outpatient clinic",
    location: "Medan",
    network: "192.168.4.1",
    status: "online",
    devices_count: 6,
    uptime: "75h 50m",
    firmware_version: "v1.0.6",
  },
  {
    id: "GW-008",
    name: "Gateway H",
    description: "Backup gateway for outpatient clinic",
    location: "Medan",
    network: "192.168.4.2",
    status: "online",
    devices_count: 4,
    uptime: "45h 10m",
    firmware_version: "v1.0.4",
  },
  {
    id: "GW-009",
    name: "Gateway I",
    description: "IoT gateway for pediatric ward",
    location: "Semarang",
    network: "192.168.5.1",
    status: "offline",
    devices_count: 10,
    uptime: "150h 5m",
    firmware_version: "v1.0.9",
  },
];
