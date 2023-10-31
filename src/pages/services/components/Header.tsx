import { Button } from "@/components";
import { HeaderServiceInsideIcon } from ".";

export const Header = ({
  icon,
  name,
  onClick,
}: {
  name: string | undefined;
  icon: string | undefined;
  onClick?: () => void;
}) => {
  return (
    <div className="flex items-center justify-between">
      <HeaderServiceInsideIcon icon={icon} name={name} />
      <Button
        onClick={onClick}
        text="Contratar Servicio"
        bgColor="light-violet"
      />
    </div>
  );
};
