import { Button, PartOfServices, SectionHeader } from "@/components";
import { PathNames } from "@/config";
import { useScrollToTop } from "@/hook";
import { PageSection } from "@/layout";

export const Services = () => {
  const { handleScrollToTop } = useScrollToTop();
  return (
    <PageSection>
      <SectionHeader type="services" />
      <PartOfServices />
      <Button
        onClick={handleScrollToTop}
        dataAos="fade-up"
        text="Crear mi perfil en Liveo es totalmente gratis"
        to={PathNames.register}
        bgColor="violet"
      />
    </PageSection>
  );
};
