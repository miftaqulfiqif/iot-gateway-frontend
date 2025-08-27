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
  patients: any[];
};
