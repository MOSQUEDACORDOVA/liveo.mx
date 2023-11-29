import { Footer, NavBar, NavBarMobile, TopHeader } from "@/components";
import { useAOS, useHomeData } from "./hook";
import { ToTop } from "./components/ToTop";
import "aos/dist/aos.css";
import {
  Outlet,
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import {
  Error,
  HomePage,
  LoginPage,
  RegisterPage,
  ServicesPage,
  FAQS,
  ServiceInside,
  SuscriptionPage,
  Profile,
  Term,
  PrivacyPolicy,
  CompaniesPage,
  Suscription,
  PosthumousWills,
  ReactiveAccount,
  CompaniesProfile,
} from "@/pages";
import { PathNames as path } from "@/config";
import { PrivateRouteUserDashboard } from "./private/Private";
import { useDispatch, useSelector } from "react-redux";
import { selectShowNavMobile, showNavMobile } from "./features/NavBarSlice";
import { ToastContainer } from "react-toastify";
import { EditWill, NewWill } from "./pages/dashboard/components";
import { ReportDeceased } from "./components/ReportDeceased";
import RegisterCompaniesPage from "./pages/companies/registered/registered";
import { useGetUserProfile } from "./services/auth/auth.services.hooks";
import { useValidateInactive } from "./hook/useValidateInactive";
import "react-toastify/dist/ReactToastify.css";
import NotariesPage from "./pages/notaries/notaries";

export const App = () => {
  const { isLoading } = useGetUserProfile();
  useValidateInactive();

  if (isLoading) return <div></div>;

  return <RouterProvider router={router} />;
};

const Root = () => {
  const dispatch = useDispatch();
  const showNavBarMobile = useSelector(selectShowNavMobile);
  const location = useLocation().pathname;
  useAOS();
  useHomeData();

  const handleNavBarMobile = () => {
    showNavBarMobile && dispatch(showNavMobile(false));
  };

  const dont_show = path.register_companie !== location;

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div
        onClick={handleNavBarMobile}
        className="text-4xl relative overflow-hidden"
      >
        {dont_show && (
          <>
            <TopHeader />
            <NavBar />
            <NavBarMobile />
            <ReportDeceased />
          </>
        )}
        <Outlet />
      </div>

      {dont_show && <Footer />}
      <ToTop />
    </>
  );
};

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path={path.reactivate_account} element={<ReactiveAccount />} />
      <Route path="/" element={<Root />}>
        <Route path={path.error} element={<Error />} />

        <Route path={path.home} element={<HomePage />} />

        <Route path={path.login} element={<LoginPage />} />
        <Route path={path.register} element={<RegisterPage />} />

        <Route path={path.services} element={<ServicesPage />} />
        <Route path={path.service} element={<ServiceInside />} />

        <Route path={path.faq} element={<FAQS />} />
        <Route path={path.terms} element={<Term />} />
        <Route path={path.privacy} element={<PrivacyPolicy />} />

        <Route path={path.subscriptions} element={<SuscriptionPage />} />

        <Route
          path={path.register_companie}
          element={<RegisterCompaniesPage />}
        />

        <Route path={path.notaries} element={<NotariesPage />} />

        <Route element={<PrivateRouteUserDashboard />}>
          <Route path={path.private.profile} element={<Profile />} />
          <Route path={path.companyProfile} element={<CompaniesProfile />} />
          <Route path={path.private.subscriptions} element={<Suscription />} />
          <Route
            path={path.private.posthumous_wills}
            element={<PosthumousWills />}
          >
            <Route
              path={path.private.posthumous_wills_new}
              element={<NewWill />}
            />
            <Route
              path={`${path.private.posthumous_wills_edit}/:id`}
              element={<EditWill />}
            />
          </Route>
          R
        </Route>

        <Route path={path.companies} element={<CompaniesPage />} />
      </Route>
    </>
  )
);
