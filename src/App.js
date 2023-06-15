import { useEffect, useRef, lazy, Suspense } from "react";
import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Loading from "./Components/Loading/Loading";
import Error from "./Containers/Error";

import COLORS from "./Constants/colors";
import { DEFAULT, DASHBOARD, PRODUCTS, BILLINGS, VENDORS, DELIVERY, EXPIRY } from "./Constants/routes_frontend";

import "./app.css"
import StateStore from "./Store/store";
import Products from "./Containers/Products";
import Billing from "./Containers/Billing";
import Vendors from "./Containers/Vendors";
import Delivery from "./Containers/Delivery";
import Expiry from "./Containers/Expiry";

const Login = lazy(() => import("./Containers/Login"));
const Dashboard = lazy(() => import("./Containers/Dashboard"));

const App = () => {
  const appContainer = useRef()
  useEffect(() => {
    appContainer.current.style.setProperty('--app-bg', COLORS.APP_BG);
  }, [appContainer])
  return (
    <div id="app-container" ref={appContainer}>
      <StateStore>
        <BrowserRouter>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path={DEFAULT} element={<Login />} />
              <Route path={DASHBOARD} element={<Dashboard />} />
              <Route path={PRODUCTS} element={<Products />} />
              <Route path={BILLINGS} element={<Billing />} />
              <Route path={VENDORS} element={<Vendors />} />
              <Route path={DELIVERY} element={<Delivery />} />
              <Route path={EXPIRY} element={<Expiry />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </StateStore>
    </div>
  );
}
export default App;