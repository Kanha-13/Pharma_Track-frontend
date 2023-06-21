import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import ProductsList from "../../Components/ProductsList/ProductsList";
import { ACTION } from "../../Store/constants";
import { getProduct, getProductWithInitials } from "../../apis/products";
import './index.css'
import { useStore } from "../../Store/store";
import Card from "../../Components/ManualAddProduct/Card";
import { PRODUCT, productdetail } from "../../Schema/products";
import { STOCK } from "../../Schema/stock";
import { StockListHeader } from "../../Constants/stock";

const Stocks = () => {
  const { products, dispatch } = useStore();
  const [productsList, setProductsList] = useState([])
  const [productDetail, setProductDetail] = useState(productdetail)
  const [isSearchActive, setSearchActive] = useState(false)
  const [isFocusItemName, setFocus] = useState(false)

  const onclickproduct = async (itemId) => {
    try {
      const res = await getProduct(itemId)
      setProductDetail(res)
      setSearchActive(false)
      setProductsList([])
      setFocus(true)
    } catch (error) {
      alert("Failed to load product detail!")
    }
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

  const onchangeProdDetail = (name, val) => {
    setProductDetail({ ...productDetail, [name]: val })
  }

  const addStock = () => {
    console.log("update stock")
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
      <div id="stocks-container" className="layout-body borderbox">
        <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
         onclick={onclickproduct} header={StockListHeader} data={productsList} />
        {
          isSearchActive ? <></> :
            <div style={{
              display: "flex", alignItems: "start", flexWrap: "wrap", flexDirection: "row",
              width: "100%", height: "65%", marginTop: "5%"
            }}>
              <Card focus={isFocusItemName} require={true} w="25%" h="4%" name={STOCK.ITEMNAME} label="Item Name" value={productDetail.itemName} onchange={onchangeProdDetail} type="text" />
              <Card require={true} w="25%" h="4%" name={STOCK.MRP} label="MRP" value={productDetail.mrp} onchange={onchangeProdDetail} type="text" />
              <Card require={true} w="25%" h="4%" name={STOCK.EXPDATE} label="Exp Date" value={productDetail.expDate} onchange={onchangeProdDetail} type="month" />
              <Card require={true} w="25%" h="4%" name={STOCK.QNT} label="Quantity" value={productDetail.qnty} onchange={onchangeProdDetail} type="number" />
              <Card require={true} w="25%" h="4%" name={STOCK.RATE} label="Rate" value={productDetail.rate} onchange={onchangeProdDetail} type="text" />
              <Card require={true} w="25%" h="4%" name={STOCK.NETRATE} label="Net Rate" value={productDetail.netRate} onchange={onchangeProdDetail} type="text" productDetail={productDetail} />
              <Card require={true} w="25%" h="4%" name={STOCK.BATCH} label="Batch Number" value={productDetail.batch} onchange={onchangeProdDetail} type="text" />
              <button className="custom-input-fields" id="stock-enter" tabIndex="" onClick={addStock} type="submit">Add Stock</button>
            </div>
        }
      </div>
    </Layout>
  );
}
export default Stocks;