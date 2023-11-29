import {
  BadgeOutlined,
  PeopleAlt,
  MedicalInformationOutlined,
  BalanceOutlined,
  SpaOutlined,
  OutdoorGrillOutlined,
} from "@mui/icons-material";
import { MenuDisplayProps } from "../menu-display/menu-display.types";

export const getDataNotariesColumnOne = (): MenuDisplayProps[] => [
  {
    id: 1,
    title: "Notarías",
    icon: <BadgeOutlined />,
    items: [
      {
        id: 1,
        text: "Notaria 1",
        url: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Tanatólogos",
    icon: <PeopleAlt />,
    bgIcon: "bg-cyan-400",
    colorIcon: "text-cyan-700",
    items: [
      {
        id: 1,
        text: "Notaria 1",
        url: "/",
      },
    ],
  },
  {
    id: 3,
    title: "Psicólogos",
    icon: <MedicalInformationOutlined />,
    bgIcon: "bg-indigo-900",
    items: [
      {
        id: 1,
        text: "Notaria 1",
        url: "/",
      },
    ],
  },
  {
    id: 4,
    title: "Florista",
    icon: <BadgeOutlined />,
    items: [
      {
        id: 1,
        text: "Notaria 1",
        url: "/",
      },
    ],
  },
];

export const getDataNotariesColumnTwo = (): MenuDisplayProps[] => [
  {
    id: 1,
    title: "Abogados",
    icon: <BalanceOutlined />,
    bgIcon: "bg-indigo-900",
    items: [
      {
        id: 1,
        text: "Notaria 1",
        url: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Funerarias",
    icon: <PeopleAlt />,
    items: [
      {
        id: 1,
        text: "Funeraria Villareal",
        url: "/",
      },
      {
        id: 2,
        text: "Resol Funerales",
        url: "/",
      },
      {
        id: 3,
        text: "Servicios Funerarios DC",
        url: "/",
      },
    ],
  },
  {
    id: 3,
    title: "Capillas",
    icon: <MedicalInformationOutlined />,
    bgIcon: "bg-cyan-400",
    colorIcon: "text-cyan-700",
    items: [
      {
        id: 1,
        text: "Notaria 1",
        url: "/",
      },
    ],
  },
];

export const getDataNotariesColumnThree = (): MenuDisplayProps[] => [
  {
    id: 1,
    title: "Catering",
    icon: <OutdoorGrillOutlined />,
    items: [
      {
        id: 1,
        text: "Notaria 1",
        url: "/",
      },
    ],
  },
  {
    id: 2,
    title: "Ama tu vida",
    icon: <SpaOutlined />,
    bgIcon: "bg-cyan-400",
    colorIcon: "text-cyan-700",
    items: [
      {
        id: 1,
        text: "Funeraria Villareal",
        url: "/",
      },
    ],
  },
];
