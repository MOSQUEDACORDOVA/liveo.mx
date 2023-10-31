import error from "@/assets/error/404-error.png";

export const Error = () => {
  return (
    <div className="w-scree h-[60vh] lg:h-[80vh] 2xl:h-screen flex justify-center items-center md:pb-40">
      <img
        src={error}
        alt="error"
        className="relative w-[80%] lg:w-[60%] 2xl:w-[40%]"
      />
    </div>
  );
};
