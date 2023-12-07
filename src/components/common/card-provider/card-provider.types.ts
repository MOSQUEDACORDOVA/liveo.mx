export interface CardProviderProps {
  id?: number;
  icon?: JSX.Element;
  name: string;
  logo?: string | null;
  image?: string | null;
  category_name?: string | null;
  category_logo?: string | null;
  className?: string | null;
  url?: string;
  onClick?: (url?: string) => void;
}
