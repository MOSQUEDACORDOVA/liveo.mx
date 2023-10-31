import { Accordion, SectionHeader } from "@/components";
import { faqs, GroupsLiveo } from "@/config";
import { useScrollToTop } from "@/hook";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect } from "react";

export const FAQS = () => {
  const { handleScrollToTop } = useScrollToTop();
  useEffect(() => handleScrollToTop(), []);
  const className = `grid lg:grid-cols-2 gap-6`;
  const {
    generalInfo,
    liveoPrivacyCibersegurity,
    liveoProfile,
    liveoProvider,
    liveoSubs,
  } = GroupsLiveo;
  return (
    <div
      data-aos="fade-up"
      className="mt-8 mb-[450px] p-8 flex flex-col gap-16 md:w-[70%] mx-auto"
    >
      <SectionHeader type="faq" />
      <div className=" flex flex-col gap-6">
        <Accordion
          expandedNow={liveoProfile}
          icon={<KeyboardArrowDownIcon className="text-white" />}
          classNameContainer="shadow-none"
          textColor="white"
          name={liveoProfile}
          title={liveoProfile}
          className="bg-light-violet"
          child={
            <div className={`${className}`}>
              {faqs.map(
                (item, index) =>
                  item.group === liveoProfile && (
                    <Accordion
                      classNameContainer="min-h-[100px] h-fit flex flex-col place-content-center"
                      key={index}
                      name={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  )
              )}
            </div>
          }
        />
        <Accordion
          icon={<KeyboardArrowDownIcon className="text-white" />}
          classNameContainer="shadow-none"
          textColor="white"
          name={liveoProvider}
          title={liveoProvider}
          className="bg-violet"
          child={
            <div className={`${className}`}>
              {faqs.map(
                (item, index) =>
                  item.group === liveoProvider && (
                    <Accordion
                      classNameContainer="min-h-[100px] h-fit flex flex-col place-content-center"
                      key={index}
                      name={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  )
              )}
            </div>
          }
        />
        <Accordion
          icon={<KeyboardArrowDownIcon className="text-white" />}
          classNameContainer="shadow-none"
          textColor="white"
          name={liveoSubs}
          title={liveoSubs}
          className="bg-light-violet"
          child={
            <div className={`${className}`}>
              {faqs.map(
                (item, index) =>
                  item.group === liveoSubs && (
                    <Accordion
                      classNameContainer="min-h-[100px] h-fit flex flex-col place-content-center"
                      key={index}
                      name={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  )
              )}
            </div>
          }
        />
        <Accordion
          icon={<KeyboardArrowDownIcon className="text-white" />}
          textColor="white"
          classNameContainer="shadow-none"
          name={liveoPrivacyCibersegurity}
          title={liveoPrivacyCibersegurity}
          className="bg-violet"
          child={
            <div className={`${className}`}>
              {faqs.map(
                (item, index) =>
                  item.group === liveoPrivacyCibersegurity && (
                    <Accordion
                      classNameContainer="min-h-[100px] h-fit flex flex-col place-content-center"
                      key={index}
                      name={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  )
              )}
            </div>
          }
        />
        <Accordion
          icon={<KeyboardArrowDownIcon className="text-white" />}
          textColor="white"
          classNameContainer="shadow-none"
          className="bg-light-violet"
          name={generalInfo}
          title={generalInfo}
          child={
            <div className={`${className}`}>
              {faqs.map(
                (item, index) =>
                  item.group === generalInfo && (
                    <Accordion
                      classNameContainer="min-h-[100px] h-fit flex flex-col place-content-center"
                      key={index}
                      name={item.title}
                      title={item.title}
                      description={item.description}
                    />
                  )
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};
