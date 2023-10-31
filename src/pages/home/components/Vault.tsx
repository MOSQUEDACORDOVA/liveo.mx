import wave from "@/assets/waves/bobedasolaimg.png";
import fortBox from "@/assets/icons/icon_bodeba.png";
import { Paragraph } from "@/layout";

export const Vault = () => {
  return (
    <section className="mt-24 sm:my-24">
      <div className="hidden sm:flex items-center justify-center relative">
        <img src={wave} alt="waveBb" className="absolute w-screen" />
        <div data-aos="fade-right" className="p-8 relative">
          <h4 className="font-bold md:text-[40px] lg:text-5xl xl:text-7xl text-white">
            Bóveda <span className="text-ocean">digital</span>
            <br />
            de contratos
          </h4>
          <Paragraph className="text-xs md:text-sm xl:text-lg mt-3 text-white">
            En liveo cuentas con un espacio virtual que cuenta <br />
            con mecanismos de seguridad para almacenar tus
            <br /> servicios y contratos digitales.
          </Paragraph>
        </div>
        <img
          data-aos="fade-left"
          src={fortBox}
          alt="fortBox"
          className="w-[40%] relative"
        />
      </div>
      <div data-aos="fade-up" className="grid sm:hidden">
        <div
          className="m-auto w-[260px] h-[260px] sm:w-96 sm:h-96 bg-[#6f5795]
         rounded-full -translate-x-1/4 px-4 flex flex-col justify-center items-center"
        >
          <h4 className="font-bold text-white">
            Bóveda <span className="text-ocean">digital</span>
            <br />
            de contratos
          </h4>
          <Paragraph className="text-xs ml-3 text-white">
            En liveo cuentas con un espacio virtual que cuentas con mecanismos
            de seguridad para almacenar tus servicios y contratos digitales.
          </Paragraph>
        </div>
        <div className="flex justify-center items-center m-auto w-[260px] h-[260px] sm:w-96 sm:h-96 bg-[#6f5795] rounded-full translate-x-1/4 -translate-y-1/4">
          <img src={fortBox} alt="fortBox" className="w-full" />
        </div>
      </div>
    </section>
  );
};
