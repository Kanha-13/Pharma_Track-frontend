import { useEffect, useState } from "react";
import { getStockInfo } from "../../apis/stock";
import { StockInfoHeader } from "./Constants";
import { useSearchParams } from "react-router-dom";

import Layout from "../../Components/Layout/Layout";
import './index.css'
import { getmmyy } from "../../utils/DateConverter";
import { getProduct } from "../../apis/products";

const StockInfo = () => {
  const [productInfo, setProductInfo] = useState({})
  const [stockInfo, setStockInfo] = useState([])
  const [searchParams] = useSearchParams();

  const fetchProductInfo = async (pId) => {
    const res = await getProduct(pId);
    setProductInfo(res)
  }
  const fetchStockDetail = async (pId) => {
    const res = await getStockInfo(pId);
    setStockInfo(res.data)
  }

  const onselectproduct = () => {

  }
  const getValue = (item, value) => {
    if (value === "expDate")
      return getmmyy(item[value])
    else
      return item[value]
  }

  useEffect(() => {
    const pId = searchParams.get('id');
    fetchStockDetail(pId);
    fetchProductInfo(pId);
  }, [])
  return (
    <Layout>
      <div id="stockInfo-container" className="layout-body borderbox">
        <p style={{ width: "90%", paddingBottom: "1vh", borderBottom: "1px solid #000000", fontWeight: "500", fontSize: "1.4rem" }}>Stock Detail</p>
        <div style={{ width: "90%", display: "flex", flexDirection: "row", marginBottom: "2vh" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "15%" }}>
            <p style={{ fontWeight:"600", margin: "0px 0px 5px 0px" }}>Product Name</p>
            <p style={{ fontWeight:"600", margin: "0px 0px 5px 0px" }}>Company</p>
            <p style={{ fontWeight:"600", margin: "0px 0px 5px 0px" }}>HSN</p>
            <p style={{ fontWeight:"600", margin: "0px 0px 5px 0px" }}>Stock</p>
            <p style={{ fontWeight:"600", margin: "0px 0px 5px 0px" }}>GST</p>
            <p style={{ fontWeight:"600", margin: "0px 0px 5px 0px" }}>Pkg</p>
            <p style={{ fontWeight:"600", margin: "0px 0px 5px 0px" }}>Location</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "30%", justifyContent: "space-between" }}>
            <input value={productInfo?.itemName} />
            <input value={productInfo?.company} />
            <input value={productInfo?.hsn_sac} />
            <input value={productInfo?.qnty} />
            <input value={productInfo?.gst} />
            <input value={productInfo?.pkg} />
            <input value={productInfo?.location} />
          </div>
        </div>
        <table style={{ height: "5vh", width: "90%", borderCollapse: "collapse" }}>
          <thead style={{
            backgroundColor: "#ebe8fc", height: "5vh",
            marginBottom: "10px", borderBottom: "1px solid gray"
          }}>
            <tr >
              {StockInfoHeader.map((head) => <th style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
            </tr>
          </thead>
        </table>
        {
          stockInfo.length > 0 ?
            <div id="stock-data-container" style={{ width: "90%", maxHeight: "65vh", overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody style={{ borderCollapse: "collapse" }}>
                  {
                    stockInfo.map((item, index) => {
                      return (
                        <tr key={`${item._id}-stock-list`} className="stock-batch-row" style={{ backgroundColor: index % 2 ? "#ededed" : "", height: "5vh" }}>
                          {
                            StockInfoHeader.map((head) => <td style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div> : <></>
        }
      </div>
    </Layout>
  );
}
export default StockInfo;