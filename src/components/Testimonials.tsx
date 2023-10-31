/* eslint-disable react-hooks/exhaustive-deps */
import { SectionHeader } from ".";
import { Paragraph } from "@/layout";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import {
  selectTestimonialsError,
  selectTestimonialsInfo,
  selectTestimonialsLoading,
} from "@/features/HomeSlice";
import { useSelector } from "react-redux";
import { Suspense } from "@/layout/Suspense";

export const Testimonials = ({ seconds }: { seconds?: number }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [disabled, setDisabled] = useState<"prev" | "next" | null>(null);
  const testimonials = useSelector(selectTestimonialsInfo);
  const testimonialsError = useSelector(selectTestimonialsError);
  const testimonialsLoading = useSelector(selectTestimonialsLoading);

  useEffect(() => {
    if (!isHover) {
      const timer = setInterval(
        () => {
          const newSlideIndex =
            testimonials && selectedImage >= testimonials.length - 1
              ? 0
              : selectedImage + 1;
          setSelectedImage(newSlideIndex);
        },
        seconds ? seconds * 1000 : 5000
      );
      handleDisabled();
      return () => clearInterval(timer);
    }
  }, [selectedImage, isHover]);

  const handleDisabled = () => {
    selectedImage === testimonials.length - 1 && setDisabled("next");
    selectedImage === 0 && setDisabled("prev");
    !(selectedImage === testimonials.length - 1 || selectedImage === 0) &&
      setDisabled(null);
  };
  const handlePrev = () => {
    selectedImage > 0 && setSelectedImage(selectedImage - 1);
  };
  const handleNext = () => {
    testimonials &&
      selectedImage < testimonials.length - 1 &&
      setSelectedImage(selectedImage + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6 mt-24 mb-60 2xl:mb-72 z-10">
      <SectionHeader type="testimonials" />
      <div
        data-aos="fade-up"
        className="flex relative  w-full sm:w-[70%] lg:w-[45%] px-2"
      >
        <IconButton
          disabled={disabled === "prev"}
          onClick={() => handlePrev()}
          className={`${
            disabled === "prev" ? "bg-light-violet/50" : "bg-light-violet"
          } text-white absolute top-[20%] z-20`}
        >
          <NavigateBeforeIcon fontSize="small" />
        </IconButton>
        <Suspense
          error={testimonialsError}
          errorMessage="Lo siento, no hemos podido cargar los testimonios."
          loading={testimonialsLoading}
          type="circular"
        >
          <ul className="flex items-center justify-cente relative hide-scroll overflow-x-scroll snap-mandatory snap-x w-full">
            {testimonials.map((item, index) => (
              <li
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                key={index}
                className="w-full duration-200 shrink-0 snap-start z-0 flex flex-col items-center justify-center p-4 gap-6"
                style={{
                  marginLeft:
                    index === 0 ? `-${selectedImage * 100}%` : undefined,
                }}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-28 h-28 rounded-full"
                />
                <div className="w-full text-center">
                  <Paragraph className="leading-6">
                    {item.description}
                  </Paragraph>
                  <h5 className="mt-8 font-bold text-violet">{item.name}</h5>
                  <span>
                    {[...Array(5)].map((_, i) => (
                      <i
                        className={`${
                          item.id > i ? "text-yellow-500" : "text-black/50"
                        } text-xl`}
                        key={i}
                      >
                        &#9733;
                      </i>
                    ))}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Suspense>
        <IconButton
          disabled={disabled === "next" || testimonials.length - 1 === 0}
          onClick={() => handleNext()}
          className={`${
            disabled === "next" || testimonials.length - 1 === 0
              ? "bg-light-violet/50"
              : "bg-light-violet"
          } text-white absolute right-2 top-[20%] z-20`}
        >
          <NavigateNextIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};
