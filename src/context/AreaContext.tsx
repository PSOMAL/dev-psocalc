import { createContext, useContext, useState, type ReactNode } from "react";
import type { Area, AreaContextType } from "@/types";

const AreaContext = createContext<AreaContextType | undefined>(undefined);

export function AreaProvider({ children }: { children: ReactNode }) {
  const [areas, setAreas] = useState<Area[]>([
    {
      id: "head",
      value: 0,
      valueSet: false,
      palms: 20,
      redness: 0,
      rednessSet: false,
      thickness: 0,
      thicknessSet: false,
      scaling: 0,
      scalingSet: false,
      done: false,
    },
    {
      id: "torso",
      value: 0,
      valueSet: false,
      palms: 60,
      redness: 0,
      rednessSet: false,
      thickness: 0,
      thicknessSet: false,
      scaling: 0,
      scalingSet: false,
      done: false,
    },
    {
      id: "arm",
      value: 0,
      valueSet: false,
      palms: 40,
      redness: 0,
      rednessSet: false,
      thickness: 0,
      thicknessSet: false,
      scaling: 0,
      scalingSet: false,
      done: false,
    },
    {
      id: "leg",
      value: 0,
      valueSet: false,
      palms: 80,
      redness: 0,
      rednessSet: false,
      thickness: 0,
      thicknessSet: false,
      scaling: 0,
      scalingSet: false,
      done: false,
    },
  ]);

  return (
    <AreaContext.Provider value={{ areas, setAreas }}>
      {children}
    </AreaContext.Provider>
  );
}

export function useArea(): AreaContextType {
  const context = useContext(AreaContext);
  if (!context) {
    throw new Error("useArea must be used within an AreaProvider");
  }
  return context;
}
