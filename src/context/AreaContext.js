import { createContext, useContext, useState } from "react";

const AreaContext = createContext();

export function AreaProvider({ children }) {
  const [areas, setAreas] = useState([
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

export function useArea() {
  return useContext(AreaContext);
}
