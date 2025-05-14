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
import { FitnessMetricSection } from "./fitness-metric-section";

import weightIcon from "@/assets/icons/weighing.png";
import bmiIcon from "@/assets/icons/bmi.png";
import fatIcon from "@/assets/icons/fat.png";
import visceralFatIcon from "@/assets/icons/visceral-fat.png";
import boneMassIcon from "@/assets/icons/bone.png";
import metabolismIcon from "@/assets/icons/metabolism.png";
import proteinIcon from "@/assets/icons/proteins.png";
import obesityIcon from "@/assets/icons/obesity.png";
import bodyAge from "@/assets/icons/body-age.png";
import leanBodyMassIcon from "@/assets/icons/lean-body-mass.png";

export const BMIResult = () => {
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
        icon={<img src={bmiIcon} alt="bmi" className="w-7 h-7" />}
        label="BMI"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's BMI</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* FAT Section */}
      <FitnessMetricSection
        icon={<img src={fatIcon} className="w-7 h-7" alt="bmi" />}
        label="FAT"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
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
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
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
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Water</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Visceral Fat Section */}
      <FitnessMetricSection
        icon={<img src={visceralFatIcon} className="w-7 h-7" alt="bmi" />}
        label="Visceral Fat"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Visceral Fat</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Bone Mass Section */}
      <FitnessMetricSection
        icon={<img src={boneMassIcon} className="w-7 h-7" alt="bmi" />}
        label="Bone Mass"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Bone Mass</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Metabolism Section */}
      <FitnessMetricSection
        icon={<img src={metabolismIcon} className="w-7 h-7" alt="bmi" />}
        label="Metabolism"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Metabolism</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Protein Section */}
      <FitnessMetricSection
        icon={<img src={proteinIcon} className="w-7 h-7" alt="bmi" />}
        label="Protein"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Protein</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Obesity Section */}
      <FitnessMetricSection
        icon={<img src={obesityIcon} className="w-7 h-7" alt="bmi" />}
        label="Obesity"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <CircleHelp className="w-5 h-5" />
          <p className="cursor-pointer hover:underline">What's Obesity</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* Body age Section */}
      <FitnessMetricSection
        icon={<img src={bodyAge} className="w-7 h-7" alt="bmi" />}
        label="Body Age"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <p className="cursor-pointer hover:underline">What's Body Age</p>
        </div>
      </FitnessMetricSection>

      <hr className="border-t-2 border-gray-300 my-2" />

      {/* LBM Section */}
      <FitnessMetricSection
        icon={<img src={leanBodyMassIcon} className="w-7 h-7" alt="bmi" />}
        label="LBM"
        percentage="32 %"
        statusLabel="Overweight"
        statusColor="bg-red-500"
      >
        <BMIRangeBar value={20} />
        <div className="flex flex-row gap-1 items-center text-gray-600">
          <p className="cursor-pointer hover:underline">What's LBM</p>
        </div>
      </FitnessMetricSection>
    </div>
  );
};
