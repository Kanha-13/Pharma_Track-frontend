import { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import SearchBar from "../../Components/SearchBar/SearchBar";

import AddInfoIllustration from "../../images/illustrations/addInfo.svg"

import './index.css'
import ManualAdd from "../../Components/ManualAddProduct/ManualAdd";
import ProductsList from "../../Components/ProductsList/ProductsList";
import { StateContext } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getProductWithInitials } from "../../apis/products";
import Card from "../../Components/Products/Card";
const Products = () => {
  const { products, dispatch } = useContext(StateContext)
  const [mode, setMode] = useState(-1)
  const [productsList, setProductsList] = useState([])
  const [isSearchActive, setSearchActive] = useState(0)

  const openManualAdd = (mod) => {
    setMode(mod)
  }

  const onclickproduct = (itemname) => {

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
    if (val === "") {
      setProductsList([])
      setTimeout(() => {
        setSearchActive(0)
      }, 300);
      return
    }
    setTimeout(() => {
      setSearchActive(1)
    }, 200);
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

  return (
    <Layout>
      <div id="products-container" className="layout-body">
        {
          mode === -1 ?
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }} >
              <ProductsList showRate={true} mh="400%" h="100%" w="100%" onchange={onchange} onclick={onclickproduct} products={productsList} />
              {isSearchActive ? <></> : <div style={{
                display: "flex", alignItems: "start", justifyContent: "space-around"
                , width: "100%", height: "80%", marginTop: "10%"
              }}>
                <Card onclick={() => openManualAdd(0)} title="Manual method" image={AddInfoIllustration} btnLabel=" + Add product manually" />
                <p style={{ alignSelf: "center", color: "#8C8CA1", fontSize: "2rem", fontWeight: "bold" }}>OR</p>
                <Card onclick={() => openManualAdd(1)} title="Scan QR code" image={AddInfoIllustration} btnLabel=" + Add product manually" />
              </div>}
            </div> :

            mode === 0 ?
              <ManualAdd /> : <></>
        }
      </div>
    </Layout>
  );
}
export default Products;