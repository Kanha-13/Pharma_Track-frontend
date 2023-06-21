import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getProductWithInitials } from "../../apis/products";
import { ROUTES } from "../../Constants/routes_frontend";

import Layout from "../../Components/Layout/Layout";
import ProductsList from "../../Components/ProductsList/ProductsList";
import Card from "../../Components/Products/Card";

import QRScan from "../../images/illustrations/qrScan.jpg"
import AddInfoIllustration from "../../images/illustrations/addInfo.svg"

import './index.css'
import { ProductListHeader } from "../../Constants/product";

const Products = () => {
  const navigate = useNavigate();
  const { products, dispatch } = useStore();
  const [productsList, setProductsList] = useState([])
  const [isSearchActive, setSearchActive] = useState(false)

  const toManualAdd = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCT_ADD_MANUAL)
  }

  const onclickproduct = (pId) => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCT_INFO + "id=" + pId)
  }

  const fetchProducts = async (initial, val) => {
    try {
      const data = await getProductWithInitials(initial)
      setProductsList(data)
      dispatch(ACTION.SET_PRODUCTS, data)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onchange = (val) => {
    val = val.trim()
    if (val === "") {
      setProductsList([])
      return
    }
    val = val.toLowerCase()
    let initialletter = val.split("")[0]
    if (products[0]?.itemName.split("")[0].toLowerCase() === initialletter.toLowerCase()) {
      setProductsList(products.filter((item) => item.itemName.toLowerCase().includes((val))))
    }
    else {
      setProductsList([])
      fetchProducts(initialletter[0], val)
    }
  }


  useEffect(() => {
    setTimeout(() => {
      if (productsList.length)
        setSearchActive(true)
      else
        setSearchActive(false)
    }, 100);
  }, [productsList])

  return (
    <Layout>
      <div id="products-container" className="layout-body borderbox">
        <ProductsList header={ProductListHeader} data={productsList}
          mh="400%" h="100%" w="100%"
          onchange={onchange} onclick={onclickproduct} />
        {
          isSearchActive ? <></> :
            <div style={{
              display: "flex", alignItems: "start",
              justifyContent: "space-around", width: "100%", height: "65%", marginTop: "5%"
            }}>
              <Card onclick={toManualAdd} title="Manual method" image={AddInfoIllustration} btnLabel=" + Add product manually" />
              <p style={{ alignSelf: "center", color: "#8C8CA1", fontSize: "2rem", fontWeight: "bold" }}>OR</p>
              <Card onclick={() => alert("Work under construction!")} title="Scan QR code" image={QRScan} btnLabel="Scan code" />
            </div>
        }
      </div>
    </Layout>
  );
}
export default Products;