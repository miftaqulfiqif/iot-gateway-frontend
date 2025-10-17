export type RoomsModel = {
  id: string;
  name: string;
  number: string;
  type: string;
  capacity: {
    total: number;
    used: number;
  };
  status: string;
  total_patients: number;
  patients: any[];
};

export type RoomWithGateway = {
  id: string;
  name: string;
  number: string;
  type: string;
  iot_gateway: {
    id: string;
  }[];
};

export type DetailRoom = {
  detail: {
    name: string;
    number: string;
    type: string;
    status: string;
  };
  utils: {
    capacity: {
      total_patient: number;
      room_capacity: number;
    };
    admissions_today: number;
    observations_today: number;
  };
  patients: Array<{
    id: string;
    bed_number: string;
    patient?: {
      id: string;
      name: string;
      assigned_at: string;
    };
    status: string;
  }>;
  recent_activities: Array<{
    id: string;
    timestamp: string;
    activity: string;
  }>;
};

export type BedsModel = {
  id: string;
  bed_number: string;
  status: string;
  type: string;
};
