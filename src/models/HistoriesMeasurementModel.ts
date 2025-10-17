export type HistoriesMeasurement = {
  current_page: number;
  total_items: number;
  total_pages: number;
  data: {
    id: string;
    patient_id: string;
    name: string;
    parameter: string;
    value: string;
    room: string;
    device: string;
    recorded_at: string;
  }[];
};
