import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getProductWithInitials } from "../../apis/products";
import { ROUTES } from "../../Constants/routes_frontend";
import { ProductListHeader } from "../../Constants/product";

import Layout from "../../Components/Layout/Layout";
import ProductsList from "../../Components/ProductsList/ProductsList";

import './index.css'

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

  const onaddclick = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCT_ADD)
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
        <div style={{ width: "100%",height:"5vh", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px",display:"flex",marginBottom:"5vh" }}>
          <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left" }}>Products</p>
          <button style={{ width: "15%", height: "100%", borderRadius: "0.5vw", backgroundColor: "#5E48E8", border: "none", color: "#ffffff", fontSize: "0.9em", cursor: "pointer" }} onClick={onaddclick}>Add Products</button>
        </div>
        <ProductsList header={ProductListHeader} data={productsList}
          mh="400%" h="100%" w="100%"
          onchange={onchange} onclick={onclickproduct} />
      </div>
    </Layout>
  );
}
export default Products;