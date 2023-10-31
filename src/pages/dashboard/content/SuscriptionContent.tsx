import { EmptyList } from "@/components";
import { SubscriptionCard } from "../components";
import { selectBysInfo } from "@/features/Service";
import { useSelector } from "react-redux";
import { selectDashboardProfile } from "@/features/LoginRegisterUser";

export const SuscriptionContent = () => {
  const info = useSelector(selectBysInfo);
  const userInfo = useSelector(selectDashboardProfile);

  return (
    <ul className="grid md:grid-cols-2 2xl:grid-cols-3 gap-8">
      {info?.length !== 0 ? (
        info?.map((item) =>
          userInfo?.liberacion === 1 &&
          item.servicio_obj.type !== "Testamento" ? (
            <SubscriptionCard
              key={item.id}
              by_date={item.fecha_inicio}
              expire_date={item.fecha_fin}
              logo={item.servicio_obj.logo}
              title={item.servicio_obj.name}
              months={item.meses}
            />
          ) : (
            <SubscriptionCard
              key={item.id}
              by_date={item.fecha_inicio}
              expire_date={item.fecha_fin}
              logo={item.servicio_obj.logo}
              title={item.servicio_obj.name}
              months={item.meses}
              testament_type={item.tipo}
              notary={item.obj.empresa.name}
            />
          )
        )
      ) : (
        <EmptyList
          className="md:col-span-2"
          message="Usted actualmente no tienen ningún servicio registrado."
        />
      )}
    </ul>
  );
};
