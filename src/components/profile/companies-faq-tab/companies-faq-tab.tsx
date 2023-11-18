import { Accordion } from "@/components";
import FaqQuestionCardList from "./faq-question-card-list/faq-question-card-list";
import { faqSections } from "./companies-faq-tab.helpers";

export const CompaniesFaqTab = () => {
  return (
    <div className="flex flex-col gap-8">
      <h5 className="font-semibold lg:text-left mb-2">Faq</h5>
      {faqSections.map((section) => (
        <Accordion
          key={section.id}
          title={section.title}
          name="as"
          child={<FaqQuestionCardList questions={section.questions} />}
        />
      ))}
    </div>
  );
};
