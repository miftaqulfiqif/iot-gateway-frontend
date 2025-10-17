import { Socket } from "socket.io-client";
import { BaseHandler } from "./BaseHandler";

export class BMIHandler extends BaseHandler {
  private mac: string;
  private setData: any;
  private patientHeight: number;
  private patientAge: number;
  private patientGender: string;

  constructor(
    socket: Socket,
    mac: string,
    setData: (data: any) => void,
    patientHeight: number,
    patientAge: number,
    patientGender: string
  ) {
    super(socket);
    this.mac = mac;
    this.setData = setData;
    this.register();
    this.patientHeight = patientHeight;
    this.patientAge = patientAge;
    this.patientGender = patientGender;
  }

  register() {
    this.socket.on("listen_bmi", (payload) => {
      console.log("[BMI] Received Result:", payload);
      const deviceMac = payload?.data_bmi[0]?.mac;
      if (deviceMac !== this.mac) return;
      if (!payload?.data_bmi) return;

      const impedance = payload?.data_bmi[0]?.impedance || 0;
      const bmiWeight = payload?.data_bmi[0]?.weight || 0;

      const bmiResult = calculateHealthMetrics({
        height: this.patientHeight,
        age: this.patientAge,
        gender: this.patientGender,
        bmiWeight,
        impedance,
      });

      const result = {
        weight: bmiResult.weight,
        height: bmiResult.height,
        age: bmiResult.age,
        impedance: bmiResult.impedance,
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

  updatePatientInfo(height: number, age: number, gender: string) {
    this.patientHeight = height;
    this.patientAge = age;
    this.patientGender = gender;
  }

  unregister() {
    this.socket.off("listen_bmi");
  }
}

export function calculateHealthMetrics({
  height,
  age,
  gender,
  bmiWeight,
  impedance,
}: {
  height: number;
  age: number;
  gender: string;
  bmiWeight: number;
  impedance: number;
}) {
  const heightM = height / 100;
  const isMale = gender.toLowerCase() === "male";

  const BMI = heightM > 0 ? bmiWeight / (heightM * heightM) : NaN;

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

  const protein = bmiWeight * 0.16;
  const obesity = (bodyFat / 40) * 100;
  const bodyAge = age + (BMI - 22) * 0.5;
  const lbm = bmiWeight - (bmiWeight * bodyFat) / 100;

  // Helper untuk ubah Infinity/NaN ke null
  const safe = (n: number): number | null =>
    Number.isFinite(n) ? parseFloat(n.toFixed(1)) : null;

  return {
    age,
    height,
    impedance,
    bmi: safe(BMI),
    weight: safe(bmiWeight),
    bodyFat: safe(bodyFat),
    muscleMass: safe(muscleMass),
    water: safe(water),
    visceralFat: safe(visceralFat),
    boneMass: safe(boneMass),
    metabolism: safe(bmr),
    protein: safe(protein),
    obesity: safe(obesity),
    bodyAge: safe(bodyAge),
    lbm: safe(lbm),
  };
}
