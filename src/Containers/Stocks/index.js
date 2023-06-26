import { useState } from "react";
import { ACTION } from "../../Store/constants";
import { getProductWithInitials } from "../../apis/products";
import { useStore } from "../../Store/store";
import { StockListHeader } from "../../Constants/stock";

import Layout from "../../Components/Layout/Layout";
import ProductsList from "../../Components/ProductsList/ProductsList";

import './index.css'
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";

const Stocks = () => {
  const { products, dispatch } = useStore();
  const navigate = useNavigate();
  const [stockList, setStockList] = useState([])

  const onclickproduct = async (itemId) => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.STOCK_INFO + "id=" + itemId)
  }

  const fetchProducts = async (initial, val) => {
    try {
      const data = await getProductWithInitials(initial)
      setStockList(data || [])
      dispatch(ACTION.SET_PRODUCTS, data)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onchange = (val) => {
    val = val.trim()
    if (val === "") {
      setStockList([])
      // setNextFocus(false)
      return
    }
    val = val.toLowerCase()
    let initialletter = val.split("")[0]
    if (products[0]?.itemName.split("")[0].toLowerCase() === initialletter.toLowerCase()) {
      setStockList(products.filter((item) => item.itemName.toLowerCase().includes((val))))
    }
    else {
      setStockList([])
      fetchProducts(initialletter[0], val)
    }
  }

  const onaddclick = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.STOCK_ADD);
  }

  return (
    <Layout>
      <div id="stocks-container" className="layout-body borderbox">
        <div style={{ width: "100%", height: "5vh", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>
          <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left" }}>Stocks</p>
          <button style={{ width: "15%", height: "100%", borderRadius: "0.5vw", backgroundColor: "#5E48E8", border: "none", color: "#ffffff", fontSize: "0.9em", cursor: "pointer" }} onClick={onaddclick}>Add Stock</button>
        </div>
        <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
          onclick={onclickproduct} header={StockListHeader} data={stockList} />
      </div>
    </Layout>
  );
}
export default Stocks;