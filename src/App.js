import { useEffect, useRef, lazy, Suspense } from "react";
import {
  Route,
  Routes
} from "react-router-dom";
import { ROUTES } from "./Constants/routes_frontend";

import Loading from "./Components/Loading/Loading";
import Error from "./Containers/Error";

import COLORS from "./Constants/colors";

import "./app.css"
import StateStore from "./Store/store";
import Products from "./Containers/Products";
import Billing from "./Containers/Billing";
import Vendors from "./Containers/Vendors";
import Expiry from "./Containers/Expiry";
import PublicRouter from "./utils/PublicRouter/PublicRouter";
import ProtectedRouter from "./utils/ProtectedRouter/ProtectedRouter";
import Stocks from "./Containers/Stocks";
import ManualAdd from "./Components/ManualAddProduct/ManualAdd";
import ProductInfo from "./Containers/ProductInfo";
import StockInfo from "./Containers/StockInfo";
import StocksAdd from "./Containers/StockAdd";
import ProductAdd from "./Containers/ProductAdd";
import VebdorAdd from "./Containers/VendorAdd";
import VendorInfo from "./Containers/VendorInfo";
import SettlementAdd from "./Containers/SettlementAdd";
import Settlements from "./Containers/Settlements";
import Purchase from "./Containers/Purchase";
import PurchaseAdd from "./Containers/PurchaseAdd";
import BillingHistory from "./Containers/BillingHistory";
import BillingInfo from "./Containers/BillingInfo";
import Patients from "./Containers/Patient";
import Company from "./Containers/Company";
import CompanyAdd from "./Containers/CompanyAdd";
import CompanyInfo from "./Containers/CompanyInfo";
import VendorBillPayment from "./Containers/VendorBillPayment";
import PatientBillpayment from "./Containers/PatientBillPayment";
import { wakeupserver } from "./apis/wakeup";

const Login = lazy(() => import("./Containers/Login"));
const Dashboard = lazy(() => import("./Containers/Dashboard"));

const App = () => {
  const appContainer = useRef();
  const wake_up_server= async()=>{
    try {
      await wakeupserver();
    } catch (error) {
      console.log(error)
      alert("Server not available! Please try latter...")
    }
  }

  useEffect(() => {
    appContainer.current.style.setProperty('--app-bg', COLORS.APP_BG);
  }, [appContainer])

  useEffect(()=>{
    wake_up_server()
  },[])
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
              <Route path={ROUTES.PRODUCT_ADD} element={<ProductAdd />} />
              <Route path={ROUTES.PRODUCT_ADD_MANUAL} element={<ManualAdd />} />
              <Route path={ROUTES.PRODUCT_INFO} element={<ProductInfo />} />
              <Route path={ROUTES.PURCHASE} element={<Purchase />} />
              <Route path={ROUTES.PURCHASE_ADD} element={<PurchaseAdd />} />
              <Route path={ROUTES.PURCHASE_INFO} element={<PurchaseAdd />} />
              <Route path={ROUTES.STOCKS} element={<Stocks />} />
              <Route path={ROUTES.STOCK_ADD} element={<StocksAdd />} />
              <Route path={ROUTES.STOCK_INFO} element={<StockInfo />} />
              <Route path={ROUTES.BILLINGS} element={<Billing />} />
              <Route path={ROUTES.CANCEL_BILLINGS} element={<Billing />} />
              <Route path={ROUTES.BILLING_HISTORY} element={<BillingHistory />} />
              <Route path={ROUTES.BILLING_CN_HISTORY} element={<BillingHistory />} />
              <Route path={ROUTES.BILLING_INFO} element={<BillingInfo />} />
              <Route path={ROUTES.BILLING_CN_INFO} element={<BillingInfo />} />
              <Route path={ROUTES.VENDORS} element={<Vendors />} />
              <Route path={ROUTES.VENDORS_ADD} element={<VebdorAdd />} />
              <Route path={ROUTES.VENDORS_INFO} element={<VendorInfo />} />
              <Route path={ROUTES.VENDORS_BILL_PAYMENT} element={<VendorBillPayment />} />
              <Route path={ROUTES.COMPANY} element={<Company />} />
              <Route path={ROUTES.COMPANY_ADD} element={<CompanyAdd />} />
              <Route path={ROUTES.COMPANY_INFO} element={<CompanyInfo />} />
              <Route path={ROUTES.PATIENTS} element={<Patients />} />
              <Route path={ROUTES.PATIENT_BILL_PAYMENT} element={<PatientBillpayment />} />
              <Route path={ROUTES.EXPIRY} element={<Expiry />} />
              <Route path={ROUTES.GET_SETTLEMENT} element={<Settlements />} />
              <Route path={ROUTES.ADD_SETTLEMENT} element={<SettlementAdd />} />
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