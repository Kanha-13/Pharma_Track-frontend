import { useEffect, useState } from "react";
import { ACTION } from "../../Store/constants";
import { getProduct, getProductWithInitials } from "../../apis/products";
import { useStore } from "../../Store/store";
import { STOCK, stockdetail } from "../../Schema/stock";
import { StockListHeader } from "../../Constants/stock";
import { addStockDetial } from "../../apis/stock";
import { checkIfAllDataPresent } from "../../utils/stock";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";
import ProductsList from "../../Components/ProductsList/ProductsList";

import './index.css'
import InputDate from "../../Components/CustomDateInput/DateInput";

const StocksAdd = () => {
  const { products, dispatch } = useStore();
  const [stockList, setStockList] = useState([])
  const [stockDetail, setStockDetail] = useState(stockdetail)
  const [isSearchOpen, setIsSearchOpen] = useState(true);

  const onclickproduct = async (itemId) => {
    setIsSearchOpen(false)
    try {
      let res = await getProduct(itemId)
      res.pId = res._id
      res.qnty = ""
      delete res._id
      setStockDetail(res)
      setStockList([])
    } catch (error) {
      alert("Failed to load product detail!")
    }
  }

  const fetchProducts = async (initial) => {
    try {
      const data = await getProductWithInitials(initial)
      setStockList(data || [])
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onchange = (val) => {
    val = val.trim()
    if (val === "") {
      setStockList([])
      return
    }
    fetchProducts(val)
  }

  const onchangeStockDetail = (name, val) => {
    if (name === "itemName")
      setIsSearchOpen(true)
    setStockDetail({ ...stockDetail, [name]: val })
  }

  const addStock = async () => {
    if (stockDetail.category === "TABLET")
      stockDetail.qnty = parseInt(stockDetail.strips * stockDetail.pkg) + parseInt(stockDetail.tabs)
    if (checkIfAllDataPresent(stockDetail))
      try {
        const res = await addStockDetial(stockDetail)
        setStockDetail(stockdetail)
        dispatch(ACTION.SET_PRODUCTS, [])
        window.location.reload()
        alert("Stock updated successfully!")
      } catch (error) {
        console.log(error)
        alert("Unable to add stock!")
      }
    else
      alert("Missing information!")
  }

  const getQuantityInput = () => {
    return (
      stockDetail.category === "TABLET" ?
        <>
          <Card require={true} w="10%" h="4%" name={STOCK.STIRPS} label="Strips" value={stockDetail.strips} onchange={onchangeStockDetail} type="number" />
          <Card require={true} w="9%" h="4%" name={STOCK.TABS} label="Tablet" value={stockDetail.tabs} onchange={onchangeStockDetail} type="number" />
        </>
        :
        <Card require={true} w="25%" h="4%" name={STOCK.QNT} label="Quantity" value={stockDetail.qnty} onchange={onchangeStockDetail} type="number" />
    )
  }

  return (
    <Layout>
      <div id="stocks-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Add Stock</p>
        {
          isSearchOpen ?
            <ProductsList show={isSearchOpen} mh="400%" h="100%" w="100%" onchange={onchange}
              onclick={onclickproduct} header={StockListHeader} data={stockList} /> :
            <div style={{
              display: "flex", alignItems: "start", flexWrap: "wrap", flexDirection: "row",
              width: "100%", height: "65%"
            }}>
              <Card require={true} w="25%" h="4%" name={STOCK.ITEMNAME} label="Item Name" value={stockDetail.itemName} onchange={onchangeStockDetail} type="text" />
              <Card focus={true} require={true} w="15%" h="4%" name={STOCK.MRP} label="MRP" value={stockDetail.mrp} onchange={onchangeStockDetail} type="text" />
              <InputDate require={true} w="10%" h="1.4%" pd="2%" name={STOCK.EXPDATE} label="Exp Date" value={stockDetail.expDate} onchange={onchangeStockDetail} type="month" />
              {getQuantityInput()}
              <Card require={true} w="25%" h="4%" name={STOCK.BATCH} label="Batch Number" value={stockDetail.batch} onchange={onchangeStockDetail} type="text" />
              <button className="custom-input-fields" id="stock-enter" tabIndex="" onClick={addStock} type="submit">Add Stock</button>
            </div>
        }
      </div>
    </Layout>
  );
}
export default StocksAdd;