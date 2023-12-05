export interface MenuDisplayProps {
  title: string;
  items?: SubMenuDisplay[];
  icon?: JSX.Element;
  id?: number;
  colorIcon?: string;
  bgIcon?: string;
  focusOpen?: boolean;
  classNameSubmenu?: string;
}

export interface SubMenuDisplay {
  id: number | string;
  text: string;
  url: string;
}
