import Styles from "@/styles/InfoPopup.module.css";
import { useTranslation } from "@/context/TranslationContext";

interface InfoPopupProps {
  openPopup: () => void;
  isOpen: boolean;
}

const InfoPopup = ({ openPopup, isOpen }: InfoPopupProps) => {
  const { t } = useTranslation();
  return (
    <>
      {isOpen && (
        <div className={Styles.infoPopupContainer}>
          <div className={Styles.infoPopupWrapper}>
            <div className={Styles.infoPopupContent}>
            <p dangerouslySetInnerHTML={{ __html: t.translation.popupInfoText as string }} />
              <div className={Styles.infoPopupButtonContainer}>
                <div className={Styles.infoPopupButton} onClick={openPopup}>
                  {t.translation.continue}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPopup;
