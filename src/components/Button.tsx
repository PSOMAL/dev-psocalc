import Styles from "@/styles/Button.module.css";
import { useRouter } from "next/router";
import useDeviceType from "@/hooks/useDeviceType";

interface ButtonProps {
  lockButton?: () => void;
  textButton: string;
  buttonUrl: string;
  shouldLock: boolean;
  width: number;
  onBeforeRoute?: () => boolean | void;
}

const Button = ({
  lockButton,
  textButton,
  buttonUrl,
  shouldLock,
  width,
  onBeforeRoute,
}: ButtonProps) => {
  const router = useRouter();
  const isMobile = useDeviceType();

  const routeButton = () => {
    router.push(buttonUrl);
  };

  return (
    <div className={Styles.buttonContainer}>
      <div
        className={Styles.button}
        style={{ width: !isMobile ? `${width}px` : "100%" }}
        onClick={() => {
          if (onBeforeRoute && onBeforeRoute() === false) {
            return;
          }
          routeButton();
          if (shouldLock && lockButton) {
            lockButton();
          }
        }}
      >
        {textButton}
      </div>
    </div>
  );
};

export default Button;
