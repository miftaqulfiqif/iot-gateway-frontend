export type IotGatewayModel = {
  current_page: number;
  total_items: number;
  total_page: number;
  online_count: number;
  offline_count: number;
  data: {
    id: string;
    name: string;
    description: string;
    location: string;
    network: string;
    status: boolean;
    device_count: number;
    uptime: string;
    firmware: string;
  }[];
};
