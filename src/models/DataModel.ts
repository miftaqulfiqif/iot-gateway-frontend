
export type Data = {
  user_id: string;
  data: {
    topic: string;
    payload?: string;
    patient?: {
      height?: number;
      age?: number;
      gender?: string;
    };
  };
};
