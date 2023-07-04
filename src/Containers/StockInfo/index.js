import { useEffect, useState } from "react";
import { deleteStock, queryStocks, updateStockDetial } from "../../apis/stock";
import { StockInfoHeader } from "./Constants";
import { useNavigate, useSearchParams } from "react-router-dom";

import Layout from "../../Components/Layout/Layout";
import './index.css'
import { getmmyy } from "../../utils/DateConverter";
import { getProduct } from "../../apis/products";
import ProductsList from "../../Components/ProductsList/ProductsList";
import StockUpdateModal from "../../Components/StockUpdateModal/StockUpdateModal";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { ROUTES } from "../../Constants/routes_frontend";

const StockInfo = () => {
  const { dispatch } = useStore();
  const navigate = useNavigate()
  const [productInfo, setProductInfo] = useState({})
  const [stockInfo, setStockInfo] = useState([])
  const [currentStock, setCurrentStock] = useState({})
  const [searchParams] = useSearchParams();
  const [isModal, setModal] = useState(false)

  const fetchProductInfo = async (pId) => {
    const res = await getProduct(pId);
    if (res.category === "TABLET")
      res.pkg = res.pkg + " 's"
    setProductInfo(res)
  }
  const fetchStockDetail = async (pId) => {
    let res = await queryStocks(pId);
    res = res.data.map((row, index) => {
      return {
        ...row,
        vendorName: row.vendorDetail[0]?.vendorName,
      }
    })
    setStockInfo(res)
  }

  const ondelete = async (stockId) => {
    try {
      const res = await deleteStock(stockId)
      setModal(false);
      dispatch(ACTION.SET_PRODUCTS, []);
      dispatch(ACTION.SET_STOCKS, []);
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.STOCKS);
    } catch (error) {
      console.log(error)
    }
  }

  const onupdate = async (newdata) => {
    try {
      const res = await updateStockDetial(newdata)
      setModal(false);
      dispatch(ACTION.SET_PRODUCTS, []);
      dispatch(ACTION.SET_STOCKS, []);
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.STOCKS);
    } catch (error) {
      console.log(error)
    }
  }

  const oncancel = () => {
    setModal(false)
  }

  const onchange = () => { }

  const onclickstock = (stockId) => {
    setModal(true)
    const stock = stockInfo.filter((e, index) => e._id === stockId)
    setCurrentStock(stock[0])
  }

  useEffect(() => {
    const pId = searchParams.get('id');
    fetchStockDetail(pId);
    fetchProductInfo(pId);
  }, [])
  return (
    <Layout>
      <div id="stockInfo-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Stock Detail</p>
        <div style={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "2vh" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "15%" }}>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>Product Name</p>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>Company</p>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>HSN</p>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>Stock</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "30%", justifyContent: "space-between" }}>
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none" }} value={productInfo?.itemName} />
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none" }} value={productInfo?.company} />
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none" }} value={productInfo?.hsn_sac} />
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none" }} value={productInfo?.qnty} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "15%" }}>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>GST</p>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>Pkg</p>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>Location</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "30%", justifyContent: "" }}>
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none", margin: "0px 0px 4px 0px" }} value={`${productInfo?.gst} %`} />
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none", margin: "0px 0px 4px 0px" }} value={productInfo?.pkg} />
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none", margin: "0px 0px 4px 0px" }} value={productInfo?.location} />

          </div>
        </div>
        <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
          onclick={onclickstock} header={StockInfoHeader} data={stockInfo} />
      </div>
      {isModal ? <StockUpdateModal info={currentStock} onupdate={onupdate} oncancel={oncancel} ondelete={ondelete} /> : <></>}
    </Layout>
  );
}
export default StockInfo;