import { useRouter } from "next/router";
import Styles from "@/styles/ChooseArea.module.css";
import {
  faChevronRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useArea } from "../context/AreaContext";
import PasiComponent from "./PasiComponent";
import ZPasiComponent from "./ZPasiComponent";
import BsaComponent from "./BsaComponent";
import type { Area } from "@/types";

interface ChooseAreaProps {
  id: string;
  title: string;
  calculation: string | string[];
}

const ChooseArea = ({ id, title, calculation }: ChooseAreaProps) => {
  const router = useRouter();
  const { areas } = useArea();

  const selectedArea: Area | { value: number; done?: boolean } =
    areas.find((item) => item.id === id) || { value: 0 };

  const chooseAreaClick = () => {
    router.push(`/${id}`);
  };

  return (
    <div className={Styles.chooseArea} onClick={chooseAreaClick}>
      <div className={Styles.chooseAreaItem}>
        <h2>{title}</h2>
      </div>
      <div className={Styles.chooseAreaItem}>
        {calculation === "PASI" && (
          <PasiComponent area={selectedArea as Area} total={false} />
        )}
        {calculation === "zPASI" && (
          <ZPasiComponent area={selectedArea as Area} total={false} />
        )}
        {calculation === "BSA" && (
          <BsaComponent area={selectedArea as Area} total={false} />
        )}
      </div>
      <div className={Styles.chooseAreaItem}>
        <FontAwesomeIcon
          icon={"done" in selectedArea && selectedArea.done ? faCircleCheck : faChevronRight}
          style={{
            color: "done" in selectedArea && selectedArea.done ? "#46AC22" : "#626262",
            fontSize: "done" in selectedArea && selectedArea.done ? "35px" : "20px",
          }}
        />
      </div>
    </div>
  );
};

export default ChooseArea;
