import type { Area, ZPasiResult } from "@/types";

const useZPasiCalculation = (areas: Area[]): ZPasiResult => {
  if (!areas || areas.length === 0) return { totalZPasi: 0, areaScores: {} };

  const areaFactors: Record<string, number> = {
    head: 0.1,
    arm: 0.2,
    torso: 0.3,
    leg: 0.4,
  };

  const getZPasiAreaScore = (percentage: number): number => {
    if (percentage === 0) return 0;
    if (percentage <= 9) return (1 / 9) * percentage;
    if (percentage <= 29) return 1 + (1 / 20) * (percentage - 9);
    if (percentage <= 49) return 2 + (1 / 20) * (percentage - 29);
    if (percentage <= 69) return 3 + (1 / 20) * (percentage - 49);
    if (percentage <= 89) return 4 + (1 / 20) * (percentage - 69);
    return 5 + (1 / 11) * (percentage - 89);
  };

  let totalZPasi = 0;
  const areaScores: Record<string, number> = {};

  areas.forEach((area) => {
    if (!areaFactors[area.id]) return;

    const affectedPercentage = (area.value / area.palms) * 100;
    const areaScore = getZPasiAreaScore(affectedPercentage);
    const score =
      areaScore *
      areaFactors[area.id] *
      (area.redness + area.thickness + area.scaling);

    areaScores[area.id] = parseFloat(score.toFixed(2));
    totalZPasi += score;
  });

  return { totalZPasi: parseFloat(totalZPasi.toFixed(2)), areaScores };
};

export default useZPasiCalculation;
