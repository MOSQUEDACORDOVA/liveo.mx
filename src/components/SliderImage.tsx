export const SliderImage = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div data-aos="fade-left" className="w-full flex justify-end">
      <img
        src={imageUrl}
        alt="slide"
        className="relative z-10 md:z-0  max-h-[40vh] md:max-h-[80vh] md:-translate-y-2"
      />
    </div>
  );
};
