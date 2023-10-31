/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";
import { Button, Dots, SliderImage, TypeWriter } from ".";
import { selectSlidersInfo } from "@/features/HomeSlice";
import { useMemo, useState } from "react";
import { PathNames } from "@/config";

export const Slider = () => {
  const sliders = useSelector(selectSlidersInfo);

  const [position, setPosition] = useState<number>(0);

  const typeSpeed = 100;
  const timeToChangeSlider = 10000;

  const sliderTitle = `${sliders[position]?.title}`;
  const sliderSubTitle = `${sliders[position]?.subtitle}`;
  const sliderDescription = `${sliders[position]?.description}`;
  const sliderImageUrl = `${sliders[position]?.slide}`;

  const [inPaused, setInPaused] = useState(false);

  const handleSliderPos = () => {
    const length = sliders.length - 1;
    setPosition((pos) => (length <= pos ? 0 : pos + 1));
  };

  const handleSliderDots = (pos: number) => {
    setPosition(pos);
    setInPaused(true);
    clearTimeout(timeoutRun());
  };

  const timeoutRun = () =>
    setTimeout(() => {
      handleSliderPos();
    }, timeToChangeSlider);

  const timeoutPaused = () =>
    setTimeout(() => {
      setInPaused(false);
    }, timeToChangeSlider);

  useMemo(() => {
    if (!inPaused) {
      timeoutRun();
    } else {
      timeoutPaused();
    }
    clearTimeout(timeoutPaused());
    clearTimeout(timeoutRun());
  }, [sliders, position, inPaused]);

  return (
    <div className="grid relative w-full h-full md:grid-cols-2 md:place-content-center p-6">
      <div className="relative min-h-[200px] text-white flex flex-col md:m-auto xl:ml-10 gap-4 p-4 z-10 mt-6">
        <span className="">
          <TypeWriter
            tag="h1"
            text={sliderTitle}
            typeSpeed={typeSpeed}
            className="font-semibold text-5xl text-ocean lg:text-6xl"
          />
          <TypeWriter
            tag="h1"
            text={sliderSubTitle}
            typeSpeed={typeSpeed}
            className="text-white font-semibold text-5xl lg:text-6xl"
          />
          <TypeWriter
            tag="h1"
            text={sliderDescription}
            typeSpeed={typeSpeed}
            className="text-lg lg:text-xl"
          />
        </span>
        <Button
          dataAos="fade-left"
          text="Comienza aquí"
          bgColor="none"
          border
          borderColor="ocean"
          to={PathNames.services}
        />
      </div>

      <div className="min-w-full">
        <SliderImage imageUrl={sliderImageUrl} />
      </div>

      <Dots
        onClick={handleSliderDots}
        positionActive={position}
        qty={sliders}
        className="z-10 text-ocean text-xs absolute bottom-10 w-full"
      />
    </div>
  );
};
