import type { Area, PasiResult } from "@/types";

const usePasiCalculation = (areas: Area[]): PasiResult => {
  if (!areas || areas.length === 0) return { totalPasi: 0, areaScores: {} };

  const areaFactors: Record<string, number> = {
    head: 0.1,
    arm: 0.2,
    torso: 0.3,
    leg: 0.4,
  };

  const getAreaScore = (percentage: number): number => {
    if (percentage === 0) return 0;
    if (percentage <= 9) return 1;
    if (percentage <= 29) return 2;
    if (percentage <= 49) return 3;
    if (percentage <= 69) return 4;
    if (percentage <= 89) return 5;
    return 6;
  };

  let totalPasi = 0;
  const areaScores: Record<string, number> = {};

  areas.forEach((area) => {
    if (!areaFactors[area.id]) return;

    const affectedPercentage = (area.value / area.palms) * 100;
    const areaScore = getAreaScore(affectedPercentage);
    const score =
      areaScore *
      areaFactors[area.id] *
      (area.redness + area.thickness + area.scaling);

    areaScores[area.id] = parseFloat(score.toFixed(2));
    totalPasi += score;
  });

  return { totalPasi: parseFloat(totalPasi.toFixed(2)), areaScores };
};

export default usePasiCalculation;
