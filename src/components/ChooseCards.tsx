import { whyChooseCards } from "@/data";

export const ChooseCards = () => {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
      {whyChooseCards.map((item, index) => (
        <span key={index} data-aos="fade-up" className="group">
          <li className="shadow-lg rounded-2xl p-4 flex gap-2 items-center h-28 lg:max-w-[240px] group-hover:-translate-y-1 cursor-default duration-200">
            <img src={item.image} alt={item.text} className="w-16" />
            <p className="text-xl font-semibold">{item.text}</p>
          </li>
        </span>
      ))}
    </ul>
  );
};
