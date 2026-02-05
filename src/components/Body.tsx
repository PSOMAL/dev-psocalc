import { useState } from "react";
import Image from "next/image";
import Styles from "@/styles/Body.module.css";
import { useArea } from "@/context/AreaContext";
import useMaxSizes from "@/hooks/useMaxSizes";
import useAreaStyles from "@/hooks/useAreaStyles";
import useDeviceType from "@/hooks/useDeviceType";
import BackButton from "@/components/BackButton";
import InfoPopup from "@/components/InfoPopup";
import { assetPath } from "@/lib/assetPath";
import type { MaxSizeEntry, SideConfig } from "@/types";

interface BodyProps {
  isFrontBody: boolean;
  id: string;
  showThis: boolean;
  changeSide: () => void;
}

const Body = ({ isFrontBody, id, showThis, changeSide }: BodyProps) => {
  const { areas } = useArea();
  const maxSizes = useMaxSizes();
  const isMobile = useDeviceType();
  const [isOpen, setIsOpen] = useState(false);

  const selectedArea = areas.find((item) => item.id === id) || { value: 1 };

  const baseSize: MaxSizeEntry = maxSizes[id as keyof typeof maxSizes] || {};
  const hasSides = baseSize.left && typeof baseSize.left === "object" && baseSize.right;
  const sides: (string | null)[] = hasSides ? ["left", "right"] : [null];

  const getSizeObj = (side: string | null): MaxSizeEntry => {
    if (side && baseSize[side as keyof MaxSizeEntry]) {
      const sideConfig = baseSize[side as keyof MaxSizeEntry] as SideConfig;
      return { ...baseSize, top: sideConfig.top, left: sideConfig.left, rotate: sideConfig.rotate };
    }
    return { ...baseSize };
  };

  const getPentagons = (sizeObj: MaxSizeEntry) =>
    sizeObj.pentagonPositions?.map((pos) => ({
      ...pos,
      size: `${sizeObj.scalingSize}px`,
    })) || [];

  const openPopup = () => {
    setIsOpen((prev) => !prev);
  };

  const previewSize = getSizeObj(sides[0]);
  const { bodyPositionStyle } = useAreaStyles(selectedArea, id, previewSize);

  return (
    <div className={Styles.body}>
      <div
        className={
          showThis
            ? Styles.backButtonContainer
            : Styles.backButtonContainerHidden
        }
      >
        {!isMobile && (
          <Image
            onClick={changeSide}
            src={assetPath("/images/change_side.png")}
            alt="hands"
            width={40}
            height={40}
          />
        )}
        {isMobile && (
          <>
            <BackButton />
            <Image
              src={assetPath("/images/info.png")}
              alt="Back"
              width={35}
              height={36}
              onClick={() => openPopup()}
            />
          </>
        )}

        {isOpen && <InfoPopup openPopup={openPopup} isOpen={isOpen} />}
      </div>

      {showThis ? (
        <div
          className={
            isFrontBody
              ? `${Styles.bodyImageContainer} ${Styles.bodyImageFront}`
              : `${Styles.bodyImageContainer} ${Styles.bodyImageBack}`
          }
          style={bodyPositionStyle}
        >
          {sides.map((side) => {
            const sizeObj = getSizeObj(side);
            const pentagons = getPentagons(sizeObj);
            const { rednessStyle, thicknessStyle, scalingStyle } =
              useAreaStyles(selectedArea, id, sizeObj);

            return (
              <div key={side || "single"}>
                <div
                  className={Styles.bodyImageAreaRedness}
                  style={selectedArea.value > 0 ? rednessStyle : undefined}
                >
                  {pentagons.map((pentagon, index) => (
                    <div
                      key={index}
                      className={Styles.pentagon}
                      style={{
                        top: pentagon.top,
                        left: pentagon.left,
                        width: pentagon.size,
                        height: pentagon.size,
                        position: "absolute",
                        opacity: scalingStyle.opacity,
                      }}
                    ></div>
                  ))}
                </div>
                <div
                  className={Styles.bodyImageAreaThickness}
                  style={selectedArea.value > 0 ? thicknessStyle : undefined}
                ></div>
              </div>
            );
          })}
        </div>
      ) : (
        <Image
          className={Styles.bodyImage}
          src={assetPath("/images/bodies-2.svg")}
          alt="hero"
          width={163}
          height={359}
        />
      )}
    </div>
  );
};

export default Body;
