import { Paragraph } from "@/layout";

type IProps = {
  type:
    | "services"
    | "why-choose-us"
    | "testimonials"
    | "allied-notaries"
    | "providers"
    | "faq"
    | "companies"
    | "provider_companies";
};

export const SectionHeader = ({ type }: IProps) => {
  const handleHeaders = () => {
    switch (type) {
      case "services":
        return (
          <div className="w-full text-center">
            <h3 className="text-violet font-bold mb-4">Nuestros Servicios</h3>
            <Paragraph>
              En <span className="text-light-violet">liveo</span> podrás contar
              con una bodega en la cual podrás{" "}
              <br className="hidden sm:block" /> contratar diferentes
              suscripciones.
            </Paragraph>
          </div>
        );
      case "why-choose-us":
        return (
          <div className="w-full text-center">
            <h3 className="text-violet font-bold mb-4">
              <span className="text-ocean">Por qué elegir</span> Liveo
            </h3>
            <Paragraph>
              Nuestra plataforma liveo está diseñada para tu mejor servicio y tu
              <br className="hidden sm:block" />
              mejor experiencia para el futuro.
            </Paragraph>
          </div>
        );
      case "testimonials":
        return (
          <div className="w-full text-center">
            <h3 className="text-violet font-bold mb-4">
              Testimonios de clientes
            </h3>
            <Paragraph>
              La mejor experiencia de nuestros clientes respaldan
              <br className="hidden sm:block" /> a nuestra gran labor.
            </Paragraph>
          </div>
        );
      case "allied-notaries":
        return (
          <div className="w-full text-center">
            <h3 className="text-violet font-bold mb-4 text-7xl">
              Notarías Aliadas
            </h3>
            <Paragraph className="text-2xl">
              En <span className="text-light-violet">liveo</span> podrás
              contratar diferentes notarías a tu disposición.
            </Paragraph>
          </div>
        );
      case "providers":
        return (
          <div className="w-full text-center">
            <h3 className="text-violet font-bold mb-4">Proveedores</h3>
            <Paragraph>
              En <span className="text-light-violet">liveo</span> podrás
              contratar diferentes proveedores a tu disposición.
            </Paragraph>
          </div>
        );
      case "faq":
        return (
          <div className="w-full text-center">
            <h3 className="text-violet font-bold mb-4">
              Conoce más sobre Liveo
            </h3>
            <Paragraph>
              Respondemos todas las posibles preguntas sobre Liveo, conócelas
            </Paragraph>
          </div>
        );
      case "provider_companies":
        return (
          <div className="w-full text-center">
            <h3 className="text-violet font-bold mb-4">Proveedores</h3>
            <Paragraph>
              En liveo contamos con diferentes proveedores aliados, solo faltas
              tu...
            </Paragraph>
          </div>
        );
      case "companies":
        return (
          <div className="w-full text-center">
            <h3 className="text-violet font-bold mb-4">¿Que te Ofrecemos?</h3>
            <Paragraph>
              En <span className="text-light-violet">liveo</span> podrás ser
              parte de muestra gran red de trabajo y recibir grandes beneficios.
            </Paragraph>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <div data-aos="fade-up" className="cursor-default px-4">
      {handleHeaders()}
    </div>
  );
};
