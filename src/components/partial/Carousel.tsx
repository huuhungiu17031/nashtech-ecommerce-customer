import Carousel from "react-material-ui-carousel";
import { IconComponent } from "./IconComponent";
import { useClear } from "@/hook";
import { BoxWrapper } from "../common";
const styles = {
  boxWrapper: {
    boxShadow: "none",
    border: "1px solid #D1D5DB",
  },
};

const CarouselCustom = ({ children }: any) => {
  useClear(() => (children = null));
  return (
    <BoxWrapper sx={styles.boxWrapper}>
      <Carousel
        NextIcon={<IconComponent iconName={"faArrowRight"} />}
        PrevIcon={<IconComponent iconName={"faArrowLeft"} />}
      >
        {children}
      </Carousel>
    </BoxWrapper>
  );
};

export default CarouselCustom;
