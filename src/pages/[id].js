import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Body from "@/components/Body";
import { useTranslation } from "@/context/TranslationContext";
import Styles from "@/styles/DynamicPage.module.css";
import BodyImages from "@/components/BodyImages";
import Button from "@/components/Button";
import { useArea } from "@/context/AreaContext";
import BackButton from "@/components/BackButton";
import useDeviceType from "@/hooks/useDeviceType";
import InfoPopup from "@/components/InfoPopup";
import { assetPath } from "@/lib/assetPath";
import sv from "@/locales/sv.json";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function KategoriPage() {
  const router = useRouter();
  const { id } = router.query;
  const { areas, setAreas } = useArea();
  const { t } = useTranslation();
  const isMobile = useDeviceType();
  const [isFrontBody, setIsFrontBody] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmItems, setConfirmItems] = useState([]);

  const category = t.categories.find((cat) => cat.id === id);

  const selectedArea = areas.find((item) => item.id === id) || {
    value: 0,
    valueSet: false,
    rednessSet: false,
    thicknessSet: false,
    scalingSet: false,
  };

  const changeSide = () => {
    setIsFrontBody((prev) => !prev);
  };

  if (!category) {
    return <p></p>;
  }

  const lockButton = () => {
    setAreas((prevAreas) =>
      prevAreas.map((area) =>
        area.id === id ? { ...area, done: true } : area
      )
    );
  };

  const getMissingFields = () => {
    const missing = [];
    if (!selectedArea.valueSet || Number(selectedArea.value) === 0) {
      missing.push(t.translation.handsMissingItem || t.translation.hands);
    }
    if (!selectedArea.rednessSet) {
      missing.push(t.translation.rednessMissingItem || t.translation.redness);
    }
    if (!selectedArea.thicknessSet) {
      missing.push(
        t.translation.thicknessMissingItem || t.translation.thickness
      );
    }
    if (!selectedArea.scalingSet) {
      missing.push(t.translation.scalingMissingItem || t.translation.scaling);
    }
    return missing;
  };

  const handleBeforeRoute = () => {
    const missing = getMissingFields();
    if (missing.length === 0) return true;

    setConfirmItems(missing);
    setIsConfirmOpen(true);
    return false;
  };

  const handleConfirmContinue = () => {
    setIsConfirmOpen(false);
    lockButton();
    router.push("/home");
  };

  const handleConfirmCancel = () => {
    setIsConfirmOpen(false);
  };

  const openPopup = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={Styles.dynamicPage}>
      <div className={Styles.dynamicPageContent}>
        <Body
          isFrontBody={isFrontBody}
          id={category.id}
          showThis={true}
          changeSide={changeSide}
        />
        <div className={Styles.bodyImages}>
          <div className={Styles.backButtonContainer}>
            {!isMobile && <BackButton />}
            {!isMobile && (
              <Image
                src={assetPath("/images/info.png")}
                alt="Back"
                width={35}
                height={36}
                onClick={() => openPopup()}
              />
            )}
            {isOpen && <InfoPopup openPopup={openPopup} isOpen={isOpen} />}
          </div>
          <BodyImages id={id} changeSide={changeSide} />
          <Button
            lockButton={lockButton}
            textButton={t.translation.done}
            buttonUrl="/home"
            shouldLock={true}
            width={250}
            onBeforeRoute={handleBeforeRoute}
          />
        </div>
      </div>
      <ConfirmDialog
        isOpen={isConfirmOpen}
        title={t.translation.missingValuesTitle}
        items={confirmItems}
        question={t.translation.missingValuesQuestion}
        confirmText={t.translation.continue}
        cancelText={t.translation.cancel}
        onConfirm={handleConfirmContinue}
        onCancel={handleConfirmCancel}
      />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = sv.categories.map((category) => ({
    params: { id: category.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
