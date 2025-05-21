import {
  BicepsFlexed,
  ChevronDown,
  CircleHelp,
  Droplet,
  EllipsisIcon,
  ReceiptPoundSterling,
  ReceiptText,
} from "lucide-react";
import BMIRangeBar from "./bmi-range-bar";
import { FitnessMetricSection } from "../fitness-metric-section";

import weightIcon from "@/assets/icons/weighing.png";
import bmiIcon from "@/assets/icons/bmi.png";
import fatIcon from "@/assets/icons/fat.png";
import visceralFatIcon from "@/assets/icons/visceral-fat.png";
import boneMassIcon from "@/assets/icons/bone.png";
import metabolismIcon from "@/assets/icons/metabolism.png";
import proteinIcon from "@/assets/icons/proteins.png";
import obesityIcon from "@/assets/icons/obesity.png";
import bodyAgeIcon from "@/assets/icons/body-age.png";
import leanBodyMassIcon from "@/assets/icons/lean-body-mass.png";
import { useState } from "react";
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

  const handleBmiLabel = (info: LabelInfo) => {
    setBmiLabel(info);
  };
  const handleBodyFatLabel = (info: LabelInfo) => {
    setBodyFatLabel(info);
  };
  const handleMuscleMassLabel = (info: LabelInfo) => {
    setMuscleMassLabel(info);
  };
  const handleWaterLabel = (info: LabelInfo) => {
    setWaterLabel(info);
  };
  const handleVisceralFatLabel = (info: LabelInfo) => {
    setVisceralFatLabel(info);
  };
  const handleBoneMassLabel = (info: LabelInfo) => {
    setBoneMassLabel(info);
  };
  const handleMetabolismLabel = (info: LabelInfo) => {
    setMetabolismLabel(info);
  };
  const handleProteinLabel = (info: LabelInfo) => {
    setProteinLabel(info);
  };
  const handleObesityLabel = (info: LabelInfo) => {
    setObesityLabel(info);
  };
  const handleBodyAgeLabel = (info: LabelInfo) => {
    setBodyAgeLabel(info);
  };
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
        icon={<img src={bmiIcon} className="w-7 h-7" alt="bmi" />}
        label="BMI"
        percentage={BMI}
        statusLabel={bmiLabel.label}
        statusColor={bmiLabel.color}
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
        icon={<img src={fatIcon} className="w-7 h-7" alt="fat" />}
        label="FAT"
        percentage={bodyFat}
        statusLabel={bodFatLabel.label}
        statusColor={bodFatLabel.color}
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
        icon={<BicepsFlexed className="w-8 h-8" />}
        label="Muscle"
        percentage={muscleMass}
        statusLabel={muscleMassLabel.label}
        statusColor={muscleMassLabel.color}
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
        icon={<Droplet className="w-8 h-8" />}
        label="Water"
        percentage={water}
        statusLabel={waterLabel.label}
        statusColor={waterLabel.color}
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
        icon={
          <img src={visceralFatIcon} className="w-7 h-7" alt="visceral fat" />
        }
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
        icon={<img src={boneMassIcon} className="w-7 h-7" alt="bone mass" />}
        label="Bone Mass"
        percentage={boneMass}
        statusLabel={boneMassLabel.label}
        statusColor={boneMassLabel.color}
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
        icon={<img src={metabolismIcon} className="w-7 h-7" alt="metabolism" />}
        label="Metabolism"
        percentage={metabolism}
        statusLabel={metabolismLabel.label}
        statusColor={metabolismLabel.color}
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
        icon={<img src={proteinIcon} className="w-7 h-7" alt="protein" />}
        label="Protein"
        percentage={protein}
        statusLabel={proteinLabel.label}
        statusColor={proteinLabel.color}
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
        icon={<img src={obesityIcon} className="w-7 h-7" alt="obesity" />}
        label="Obesity"
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
        icon={<img src={bodyAgeIcon} className="w-7 h-7" alt="body age" />}
        label="Body Age"
        percentage={bodyAge}
        statusLabel={bodyAgeLabel.label}
        statusColor={bodyAgeLabel.color}
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
      >
        {/* <BMIRangeBar value={lbm} onChangeValue={handleLbmLabel} /> */}
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <p className="cursor-pointer hover:underline">What's LBM</p>
        </div>
      </FitnessMetricSection>
    </div>
  );
};
