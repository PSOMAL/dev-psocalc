import useBsaCalculation from "@/hooks/useBsaCalculation";
import type { Area } from "@/types";

interface BsaComponentProps {
  area?: Area;
  areas?: Area[];
  total: boolean;
}

const BsaComponent = ({ area, areas, total }: BsaComponentProps) => {
  if (total) {
    if (!areas || areas.length === 0) {
      return <p>No Data</p>;
    }

    const { totalBsa } = useBsaCalculation(areas);
    return <p style={{ fontSize: "28px" }}>{totalBsa || 0}</p>;
  }

  if (!area) {
    return <p>No Data</p>;
  }

  const { areaScores } = useBsaCalculation([area]);

  return <p>{areaScores[area.id] || 0}</p>;
};

export default BsaComponent;
