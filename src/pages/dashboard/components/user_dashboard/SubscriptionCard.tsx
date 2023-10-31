import { Title } from "@/components";
import { Paragraph } from "@/layout";

type IProps = {
  logo: string;
  title: string;
  by_date: string;
  expire_date: string;
  months: string;
  testament_type?: string;
  notary?: string;
};

export const SubscriptionCard = ({
  expire_date,
  logo,
  title,
  by_date,
  months,
  testament_type,
  notary,
}: IProps) => {
  return (
    <div className="flex items-center shadow shadow-light-violet rounded-2xl p-6 gap-6 hover:scale-105 duration-300 cursor-default">
      <span className="shadow-light-black shadow-sm rounded-full shrink-0 overflow-hidden p-2 w-20 h-20">
        <img src={logo} alt="service-icon" className="w-16 h-16  p-1" />
      </span>
      <div className="">
        <Title title={title} Tag="h5" color="light-violet" className="mb-1" />
        {testament_type && (
          <>
            <Paragraph>{notary}.</Paragraph>
            <Paragraph>Testamento de {testament_type}.</Paragraph>
          </>
        )}
        <p className="text-sm leading-5">
          Plan comprado el {by_date} por {months} meses.
        </p>
        <p className="text-sm leading-5">Vence el {expire_date}.</p>
      </div>
    </div>
  );
};
