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
import { DEFAULT, HOME } from "./Constants/routes_frontend";

import "./app.css"
import StateStore from "./Store/store";

const Login = lazy(() => import("./Containers/Login"));
const Home = lazy(() => import("./Containers/Home"));

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
              <Route path={HOME} element={<Home />} />
              <Route path="/*" element={<Error />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </StateStore>
    </div>
  );
}
export default App;