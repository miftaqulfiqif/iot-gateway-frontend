import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class BMIHandler extends BaseHandler {
  private mac: string;
  private setData: any;

  constructor(socket: Socket, mac: string, setData: (data: any) => void) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.register();
  }

  register() {
    this.socket.on("listen_bmi", (payload) => {
      console.log("[BMI] Received Result:", payload);
      const deviceMac = payload?.data_bmi[0]?.mac;
      if (deviceMac !== this.mac) return;
      if (!payload?.data_bmi) return;

      const patient = JSON.parse(localStorage.getItem("patient") || "{}");
      const height = patient.height || 0;
      const age = patient.age || 0;
      const gender = patient.gender || 0;
      const impedence = payload?.data_bmi[0]?.impedence || 0;
      const bmiWeight = payload?.data_bmi[0]?.weight || 0;

      const bmiResult = calculateHealthMetrics({
        height,
        age,
        gender,
        bmiWeight,
        impedence,
      });

      const result = {
        weight: bmiResult.weight,
        age: bmiResult.age,
        impedence: bmiResult.impedence,
        bmi: bmiResult.bmi,
        bodyFat: bmiResult.bodyFat,
        muscleMass: bmiResult.muscleMass,
        water: bmiResult.water,
        visceralFat: bmiResult.visceralFat,
        boneMass: bmiResult.boneMass,
        metabolism: bmiResult.metabolism,
        protein: bmiResult.protein,
        obesity: bmiResult.obesity,
        bodyAge: bmiResult.bodyAge,
        lbm: bmiResult.lbm,
      };

      this.setData((prev: any) => {
        const isEqual = JSON.stringify(prev) === JSON.stringify(result);
        return isEqual ? prev : result;
      });
    });
  }

  unregister() {
    this.socket.off("listen_bmi");
  }
}

export function calculateHealthMetrics(data: any) {
  const { height, age, gender, bmiWeight, impedence } = data;

  const heightM = height / 100;

  const isMale = gender.toLowerCase() === "male";

  const BMI = bmiWeight / (heightM * heightM);

  // Estimasi menggunakan rumus dasar atau pendekatan umum
  const bodyFat = isMale
    ? 1.2 * BMI + 0.23 * age - 16.2
    : 1.2 * BMI + 0.23 * age - 5.4;

  const muscleMass = isMale
    ? bmiWeight * 0.8 - (bodyFat * bmiWeight) / 100
    : bmiWeight * 0.75 - (bodyFat * bmiWeight) / 100;

  const waterPercentage = isMale ? 0.6 : 0.5;
  const water = bmiWeight * waterPercentage;

  const visceralFat = Math.max(1, Math.min(30, bodyFat / 2 - age / 20));

  const boneMass = isMale ? bmiWeight * 0.045 : bmiWeight * 0.035;

  const bmr = isMale
    ? 88.36 + 13.4 * bmiWeight + 4.8 * height - 5.7 * age
    : 447.6 + 9.2 * bmiWeight + 3.1 * height - 4.3 * age;

  const protein = bmiWeight * 0.16; // gram

  const obesity = (bodyFat / 40) * 100; // % estimasi dari max fat 40%
  const bodyAge = age + (BMI - 22) * 0.5;
  const lbm = bmiWeight - (bmiWeight * bodyFat) / 100;

  return {
    age: age,
    impedence: impedence,
    bmi: parseFloat(BMI.toFixed(1)),
    weight: parseFloat(bmiWeight.toFixed(1)),
    bodyFat: parseFloat(bodyFat.toFixed(1)),
    muscleMass: parseFloat(muscleMass.toFixed(1)),
    water: parseFloat(water.toFixed(1)),
    visceralFat: parseFloat(visceralFat.toFixed(1)),
    boneMass: parseFloat(boneMass.toFixed(1)),
    metabolism: parseFloat(bmr.toFixed(0)),
    protein: parseFloat(protein.toFixed(1)),
    obesity: parseFloat(obesity.toFixed(1)),
    bodyAge: parseFloat(bodyAge.toFixed(1)),
    lbm: parseFloat(lbm.toFixed(1)),
  };
}
