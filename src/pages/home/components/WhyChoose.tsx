import { ChooseCards, SectionHeader, Testimonials } from "@/components";
import { PageSection } from "@/layout";

export const WhyChoose = () => {
  return (
    <PageSection>
      <SectionHeader type="why-choose-us" />
      <ChooseCards />
      <Testimonials />
    </PageSection>
  );
};
