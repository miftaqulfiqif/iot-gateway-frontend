import {
  Activity,
  Apple,
  BicepsFlexed,
  Bone,
  Calculator,
  CircleHelp,
  Droplet,
  Droplets,
  Flame,
  ReceiptText,
  User,
  Weight,
} from "lucide-react";
import BMIRangeBar from "./bmi-range-bar";
import { FitnessMetricSection } from "../fitness-metric-section";

import bmiIcon from "@/assets/icons/bmi.png";
import fatIcon from "@/assets/icons/fat.png";
import visceralFatIcon from "@/assets/icons/visceral-fat.png";
import boneMassIcon from "@/assets/icons/bone.png";
import metabolismIcon from "@/assets/icons/metabolism.png";
import proteinIcon from "@/assets/icons/proteins.png";
import obesityIcon from "@/assets/icons/obesity.png";
import bodyAgeIcon from "@/assets/icons/body-age.png";
import leanBodyMassIcon from "@/assets/icons/lean-body-mass.png";
import { useCallback, useState } from "react";
import FatRangeBar from "./fat-range-bar";
import MuscleRangeBar from "./muscle-range-bar";
import WaterRangeBar from "./water-range-bar";
import ViceralFatRangeBar from "./viceral-fat-range-bar";
import BoneMassRangeBar from "./bone-mass-range-bar ";
import MetabolismRangeBar from "./metabolism-range-bar";
import ProteinRangeBar from "./protein-range-bar";
import ObesityRangeBar from "./obesity-range-bar";
import BodyAgeRangeBar from "./body-age-range-bar";

type BMIResultProps = {
  BMI: number;
  age: number;
  bodyFat: number;
  muscleMass: number;
  water: number;
  visceralFat: number;
  boneMass: number;
  metabolism: number;
  protein: number;
  obesity: number;
  bodyAge: number;
  lbm: number;
};

type LabelInfo = { label: string; color: string };

export const BMIResult = ({
  BMI,
  age,
  bodyFat,
  muscleMass,
  water,
  visceralFat,
  boneMass,
  metabolism,
  protein,
  obesity,
  bodyAge,
  lbm,
}: BMIResultProps) => {
  const [bmiLabel, setBmiLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [bodFatLabel, setBodyFatLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [muscleMassLabel, setMuscleMassLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [waterLabel, setWaterLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [visceralFatLabel, setVisceralFatLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [boneMassLabel, setBoneMassLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [metabolismLabel, setMetabolismLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [proteinLabel, setProteinLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [obesityLabel, setObesityLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [bodyAgeLabel, setBodyAgeLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });
  const [lbmLabel, setLbmLabel] = useState<LabelInfo>({
    label: " -- ",
    color: "bg-gray-500",
  });

  const handleBmiLabel = useCallback((info: LabelInfo) => {
    setBmiLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleBodyFatLabel = useCallback((info: LabelInfo) => {
    setBodyFatLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleMuscleMassLabel = useCallback((info: LabelInfo) => {
    setMuscleMassLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleWaterLabel = useCallback((info: LabelInfo) => {
    setWaterLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleVisceralFatLabel = useCallback((info: LabelInfo) => {
    setVisceralFatLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleBoneMassLabel = useCallback((info: LabelInfo) => {
    setBoneMassLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleMetabolismLabel = useCallback((info: LabelInfo) => {
    setMetabolismLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleProteinLabel = useCallback((info: LabelInfo) => {
    setProteinLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleObesityLabel = useCallback((info: LabelInfo) => {
    setObesityLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleBodyAgeLabel = useCallback((info: LabelInfo) => {
    setBodyAgeLabel((prev) => {
      if (prev.label === info.label && prev.color === info.color) return prev;
      return info;
    });
  }, []);

  const handleLbmLabel = (info: LabelInfo) => {
    setLbmLabel(info);
  };

  return (
    <div className="flex flex-col gap-2 bg-white rounded-2xl shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-full p-6">
      {/* Header */}
      <div className="flex flex-row justify-between mb-8">
        <div className="flex flex-row items-center gap-2">
          <ReceiptText className="w-7 h-7" />
          <p className="font-semibold text-2xl">Fitness report</p>
        </div>
      </div>

      {/* BMI Section */}
      <FitnessMetricSection
        icon={<Calculator className="w-6 h-6 text-green-500" />}
        label="BMI"
        percentage={BMI}
        statusLabel={bmiLabel.label}
        statusColor={bmiLabel.color}
        unit={"kg/m²"}
      >
        <BMIRangeBar value={BMI} onChangeValue={handleBmiLabel} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's BMI</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* FAT Section */}
      <FitnessMetricSection
        icon={<Droplet className="w-6 h-6 text-orange-500" />}
        label="FAT"
        percentage={bodyFat}
        statusLabel={bodFatLabel.label}
        statusColor={bodFatLabel.color}
        unit={"%"}
      >
        <FatRangeBar value={bodyFat} onChangeValue={handleBodyFatLabel} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's FAT</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Muscle Section */}
      <FitnessMetricSection
        icon={<BicepsFlexed className="w-6 h-6 text-red-500" />}
        label="Muscle"
        percentage={muscleMass}
        statusLabel={muscleMassLabel.label}
        statusColor={muscleMassLabel.color}
        unit={"kg"}
      >
        <MuscleRangeBar
          value={muscleMass}
          onChangeValue={handleMuscleMassLabel}
        />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Muscle</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Water Section */}
      <FitnessMetricSection
        icon={<Droplets className="w-6 h-6 text-blue-500" />}
        label="Water"
        percentage={water}
        statusLabel={waterLabel.label}
        statusColor={waterLabel.color}
        unit={"%"}
      >
        <WaterRangeBar value={water} onChangeValue={handleWaterLabel} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Water</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Visceral Fat Section */}
      <FitnessMetricSection
        icon={<Apple className="w-5 h-5 text-yellow-500" />}
        label="Visceral Fat"
        percentage={visceralFat}
        statusLabel={visceralFatLabel.label}
        statusColor={visceralFatLabel.color}
      >
        <ViceralFatRangeBar
          value={visceralFat}
          onChangeValue={handleVisceralFatLabel}
        />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Visceral Fat</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Bone Mass Section */}
      <FitnessMetricSection
        icon={<Bone className="w-6 h-6" />}
        label="Bone Mass"
        percentage={boneMass}
        statusLabel={boneMassLabel.label}
        statusColor={boneMassLabel.color}
        unit={"kg"}
      >
        <BoneMassRangeBar
          value={boneMass}
          onChangeValue={handleBoneMassLabel}
        />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Bone Mass</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Metabolism Section */}
      <FitnessMetricSection
        icon={<Flame className="w-5 h-5 text-red-500" />}
        label="Metabolism"
        percentage={metabolism}
        statusLabel={metabolismLabel.label}
        statusColor={metabolismLabel.color}
        unit={"kcal"}
      >
        <MetabolismRangeBar
          value={metabolism}
          onChangeValue={handleMetabolismLabel}
        />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Metabolism</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Protein Section */}
      <FitnessMetricSection
        icon={<Activity className="w-5 h-5 text-green-500" />}
        label="Protein"
        percentage={protein}
        statusLabel={proteinLabel.label}
        statusColor={proteinLabel.color}
        unit={"%"}
      >
        <ProteinRangeBar value={protein} onChangeValue={handleProteinLabel} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Protein</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Obesity Section */}
      <FitnessMetricSection
        icon={<Weight className="w-5 h-5 text-blue-500" />}
        label="Classification"
        percentage={obesity}
        statusLabel={obesityLabel.label}
        statusColor={obesityLabel.color}
      >
        <ObesityRangeBar value={obesity} onChangeValue={handleObesityLabel} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Obesity</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Body age Section */}
      <FitnessMetricSection
        icon={<User className="w-5 h-5 text-purple-500" />}
        label="Body Age"
        percentage={bodyAge}
        statusLabel={bodyAgeLabel.label}
        statusColor={bodyAgeLabel.color}
        unit={"years"}
      >
        <BodyAgeRangeBar
          value={bodyAge}
          currentAge={age}
          onChangeValue={handleBodyAgeLabel}
        />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <p className="cursor-pointer hover:underline">What's Body Age</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* LBM Section */}
      <FitnessMetricSection
        icon={<img src={leanBodyMassIcon} className="w-7 h-7" alt="lbm" />}
        label="LBM"
        percentage={lbm}
        unit={"kg"}
      >
        {/* <BMIRangeBar value={lbm} onChangeValue={handleLbmLabel} /> */}
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <p className="cursor-pointer hover:underline">What's LBM</p>
        </div>
      </FitnessMetricSection>
    </div>
  );
};
