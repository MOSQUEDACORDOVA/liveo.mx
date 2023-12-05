import { FC } from "react";
import { BannerGridProps as Props } from "./banner-grid.types";
import "./banner-grid.styles.scss";

const BannerGrid: FC<Props> = (props) => {
  const { mainImage, secondaryImages } = props;

  const getSecondaryImagesArray = () => {
    return secondaryImages?.filter((_, index) => index < 3);
  };

  return (
    <div className="banner-grid">
      <picture className="banner-grid__image banner-grid__image--one">
        <img src={`${mainImage}`} alt="main image" />
      </picture>
      <picture className="banner-grid__image banner-grid__image--two">
        <img src={`${getSecondaryImagesArray()[0]?.url}`} alt="" />
      </picture>
      <picture className="banner-grid__image banner-grid__image--three">
        <img src={`${getSecondaryImagesArray()[1]?.url}`} alt="" />
      </picture>
      <picture className="banner-grid__image banner-grid__image--four">
        <img src={`${getSecondaryImagesArray()[2]?.url}`} alt="" />
      </picture>
    </div>
  );
};

export default BannerGrid;
