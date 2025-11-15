import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import MTK from "./pages/dashboard/mtk";
import ComplexPage from "./pages/dashboard/complex";
import ResidentsPage from "./pages/dashboard/residents";
import BuildingsPage from "./pages/dashboard/buildings";
import PropertiesPage from "./pages/dashboard/properties";
import BlocksPage from "./pages/dashboard/blocks";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "sidebar.dashboard",
        path: "/home",
        element: <Home />,
      },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "sidebar.notifications",
        path: "/notifications",
        element: <Notifications />,
      },
      
      {
        icon: <TableCellsIcon {...icon} />,
        name: "sidebar.mtk",
        path: "/mtk",
        element: <MTK />,
      },
      {
        icon: <BuildingOfficeIcon {...icon} />,
        name: "sidebar.complexes",
        path: "/complex",
        element: <ComplexPage />,
      },
      {
        icon: <BuildingOffice2Icon {...icon} />, 
        name: "sidebar.buildings",      
        path: "/buildings",
        element: <BuildingsPage />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sidebar.blocks",
        path: "/blocks",
        element: <BlocksPage />,
      },
      {
        icon: <HomeModernIcon {...icon} />,
        name: "sidebar.properties",
        path: "/properties",
        element: <PropertiesPage />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "sidebar.residents",
        path: "/residents",
        element: <ResidentsPage />,
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
