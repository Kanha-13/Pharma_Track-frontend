import { useEffect, useRef, lazy, Suspense } from "react";
import {
  Route,
  Routes,
  useNavigate
} from "react-router-dom";

import Loading from "./Components/Loading/Loading";
import Error from "./Containers/Error";

import COLORS from "./Constants/colors";
import { ROUTES } from "./Constants/routes_frontend";

import "./app.css"
import StateStore from "./Store/store";
import Products from "./Containers/Products";
import Billing from "./Containers/Billing";
import Vendors from "./Containers/Vendors";
import Delivery from "./Containers/Delivery";
import Expiry from "./Containers/Expiry";
import VendorForm from "./Components/Vendors/VendorForm/VendorForm";
import PublicRouter from "./utils/PublicRouter/PublicRouter";
import ProtectedRouter from "./utils/ProtectedRouter/ProtectedRouter";

const Login = lazy(() => import("./Containers/Login"));
const Dashboard = lazy(() => import("./Containers/Dashboard"));

const App = () => {
  const appContainer = useRef();

  useEffect(() => {
    console.log("user fall in App.js")
  }, [])

  useEffect(() => {
    appContainer.current.style.setProperty('--app-bg', COLORS.APP_BG);
  }, [appContainer])

  return (
    <div id="app-container" ref={appContainer}>
      <StateStore>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={ROUTES.PUBLIC_ROUTER} element={<PublicRouter />}>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path="" element={<Error />} />
            </Route>
            <Route path={ROUTES.PROTECTED_ROUTER} element={<ProtectedRouter />}>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.PRODUCTS} element={<Products />} />
              <Route path={ROUTES.BILLINGS} element={<Billing />} />
              <Route path={ROUTES.VENDORS} element={<Vendors />} />
              <Route path={ROUTES.VENDORS_ADD} element={<VendorForm />} />
              <Route path={ROUTES.VENDORS_INFO} element={<Vendors />} />
              <Route path={ROUTES.DELIVERY} element={<Delivery />} />
              <Route path={ROUTES.EXPIRY} element={<Expiry />} />
              <Route path="" element={<Error />} />
            </Route>
            <Route path="/*" element={<Error />} />
          </Routes>
        </Suspense>
      </StateStore>
    </div>
  );
}
export default App;
{/* <Route path="/*" element={<Error />} />  */ }