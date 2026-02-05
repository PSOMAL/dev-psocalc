import { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useArea } from "@/context/AreaContext";
import Styles from "@/styles/SliderInput.module.css";
import { useTranslation } from "@/context/TranslationContext";
import Image from "next/image";
import { assetPath } from "@/lib/assetPath";

interface SliderInputProps {
  id: string;
}

const SliderInput = ({ id }: SliderInputProps) => {
  const { areas, setAreas } = useArea();
  const selectedArea = areas.find((item) => item.id === id);
  const { t } = useTranslation();

  const [value, setValue] = useState<number | string>(
    selectedArea?.done ? selectedArea.value : 0
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    setAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === id
          ? {
              ...area,
              value: typeof value === "string" ? parseFloat(value) : value,
              ...(hasInteracted ? { valueSet: true } : {}),
            }
          : area
      )
    );
  }, [value, hasInteracted, id, setAreas]);

  const handleDecrease = () => {
    setHasInteracted(true);
    setValue((prev) =>
      Math.max(parseFloat((parseFloat(String(prev)) - 0.5).toFixed(1)), 0)
    );
  };

  const handleIncrease = () => {
    setHasInteracted(true);
    setValue((prev) =>
      Math.min(
        parseFloat((parseFloat(String(prev)) + 0.5).toFixed(1)),
        selectedArea?.palms || 0
      )
    );
  };

  return (
    <div className={Styles.sliderInput}>
      <div className={Styles.sliderInputContainer}>
        <button
          onClick={handleDecrease}
          className={Styles.sliderInputDecreaseButton}
        >
          −
        </button>

        <div className={Styles.sliderInputDecreaseWrapper}>
          <Slider
            min={0}
            max={selectedArea?.palms}
            step={0.5}
            value={parseFloat(String(value))}
            onChange={(val) => {
              setHasInteracted(true);
              setValue((val as number).toFixed(1));
            }}
            styles={{
              track: { backgroundColor: "transparent", height: 10 },
              rail: { backgroundColor: "transparent", height: 10 },
            }}
            handleRender={(renderProps) => {
              return (
                <div
                  {...renderProps.props}
                  aria-label={t.translation.chooseHandsHere as string}
                  style={{
                    ...renderProps.props.style,
                    width: "50px",
                    height: "50px",
                    position: "absolute",
                    top: "10%",
                    left: renderProps.props.style?.left,
                    transform: "translate(-50%, -50%)",
                    cursor: "grab",
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <Image
                    src={assetPath("/images/hand.svg")}
                    alt="hand"
                    width={62}
                    height={65}
                    draggable={false}
                    style={{
                      pointerEvents: "none",
                      position: "absolute",
                      top: -3,
                      left: 0,
                    }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      top: "72%",
                      left: "64%",
                      transform: "translate(-50%, -50%)",
                      color: "#000",
                      fontWeight: "bold",
                      fontSize: "13px",
                      pointerEvents: "none",
                    }}
                  >
                    {parseFloat(String(value))}
                  </span>
                </div>
              );
            }}
          />
        </div>

        <button
          onClick={handleIncrease}
          className={Styles.sliderInputIncreaseButton}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SliderInput;
