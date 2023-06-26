import Card from "../../Components/Products/Card";

import QRScan from "../../images/illustrations/qrScan.jpg"
import AddInfoIllustration from "../../images/illustrations/addInfo.svg"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";
import Layout from "../../Components/Layout/Layout";

import './index.css'

const ProductAdd = () => {
  const navigate = useNavigate();

  const toManualAdd = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCT_ADD_MANUAL)
  }
  return (
    <Layout>
      <div id="productadd-container" className="layout-body borderbox">
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "space-around",alignItems:"center" }}>
          <Card onclick={toManualAdd} title="Manual method" image={AddInfoIllustration} btnLabel=" + Add product manually" />
          <p style={{ alignSelf: "center", color: "#8C8CA1", fontSize: "2rem", fontWeight: "bold" }}>OR</p>
          <Card onclick={() => alert("Work under construction!")} title="Scan QR code" image={QRScan} btnLabel="Scan code" />
        </div>
      </div>
    </Layout>
  );
}

export default ProductAdd;