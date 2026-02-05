import { useState, useEffect } from "react";
import type { Area, MaxSizeEntry } from "@/types";

interface AreaStyles {
  rednessStyle: React.CSSProperties;
  thicknessStyle: React.CSSProperties;
  scalingStyle: React.CSSProperties;
  bodyPositionStyle: React.CSSProperties;
}

const useAreaStyles = (selectedArea: Partial<Area>, id: string, maxSize: MaxSizeEntry): AreaStyles => {
  const [rednessStyle, setRednessStyle] = useState<React.CSSProperties>({});
  const [thicknessStyle, setThicknessStyle] = useState<React.CSSProperties>({});
  const [scalingStyle, setScalingStyle] = useState<React.CSSProperties>({});
  const [bodyPositionStyle, setBodyPositionStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (selectedArea) {
      const scale = Math.min(
        parseFloat(String(selectedArea.value ?? 0)) / (selectedArea.palms || 1),
        1
      );
      const rednessOpacity = Math.min(0.2 + (selectedArea.redness ?? 0) / 5, 1);
      const scalingOpacity = Math.min(0.2 + (selectedArea.scaling ?? 0) / 5, 1);
      const thicknessOpacity = Math.min(
        0.2 + (selectedArea.thickness ?? 0) / 5,
        1
      );

      setRednessStyle({
        width: `${maxSize.width}px`,
        height: `${maxSize.height}px`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${maxSize.rotate})`,
        top: `${maxSize.top}px`,
        left: `${maxSize.left}px`,
        opacity: rednessOpacity,
      });

      setThicknessStyle({
        width: `${maxSize.width}px`,
        height: `${maxSize.height}px`,
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${maxSize.rotate})`,
        top: `${maxSize.top}px`,
        left: `${maxSize.left}px`,
        opacity: thicknessOpacity,
        border: "3px dotted #000",
      });

      setScalingStyle({
        opacity: scalingOpacity,
      });

      setBodyPositionStyle({
        backgroundPositionY: `${maxSize.backgroundPositionY}px`,
      });
    }
  }, [
    selectedArea?.value,
    id,
    selectedArea.redness,
    selectedArea.thickness,
    selectedArea.scaling,
  ]);

  return { rednessStyle, thicknessStyle, scalingStyle, bodyPositionStyle };
};

export default useAreaStyles;
