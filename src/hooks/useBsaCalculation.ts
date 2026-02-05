import type { Area, BsaResult } from "@/types";

const useBsaCalculation = (areas: Area[]): BsaResult => {
  if (!areas || areas.length === 0) return { totalBsa: 0, areaScores: {} };

  const maxPalms: Record<string, number> = {
    head: 10,
    arm: 20,
    torso: 30,
    leg: 40,
  };

  let totalBsa = 0;
  const areaScores: Record<string, number> = {};

  areas.forEach((area) => {
    console.log(area.value);
    if (!maxPalms[area.id]) return;

    const affectedBsa = (area.value * 1) / 2;
    areaScores[area.id] = parseFloat(affectedBsa.toFixed(2));
    totalBsa += affectedBsa;
  });

  return { totalBsa: parseFloat(totalBsa.toFixed(2)), areaScores };
};

export default useBsaCalculation;
