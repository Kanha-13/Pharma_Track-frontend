import { useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

import "./productslist.css"
import { datetoJSformat, getmmyy } from "../../utils/DateConverter";

const ProductsList = ({ h = "100%", w = "43%", showRate = false, products = [], onclick, onchange }) => {
  const [search, setSearch] = useState("");
  const [listClass, setClass] = useState("layout-body close-animation")
  const onchangeval = (val) => {
    onchange(val)
    setSearch(val)
  }

  const onselectproduct = (itemName) => {
    onclick(itemName)
  }

  useEffect(() => {

    if (products.length)
      setClass("layout-body open-animation")
    else
      setClass("layout-body close-animation")
  }, [products])

  return (
    <div id="productslist-container" style={{ height: h, width: w }} className={listClass}>
      <div style={{ backgroundColor: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "8vh", width: "100%", position: "sticky", top: "0px" }}>
        <SearchBar onchange={onchangeval} h="3vh" w="90%" placeholder="Search product..." val={search} />
      </div>
      {
        products.length > 0 ?
          <table>
            <thead style={{
              backgroundColor: "#ebe8fc", height: "5vh",
              position: "sticky", top: "8vh",
              marginBottom: "10px", borderBottom: "1px solid gray"
            }}>
              <tr>
                <th style={{}}>Item</th>
                <th style={{}}>Pack</th>
                <th style={{}}>Batch</th>
                <th style={{ paddingLeft: "5%" }}>MRP</th>
                {showRate ? <th>Net.R</th> : <></>}
                <th style={{}}>Exp. date</th>
                <th style={{}}>Stock</th>
              </tr>
            </thead>
            <tbody >
              {
                products.map((item, index) => {
                  return (
                    <tr onClick={() => onselectproduct(item.itemName)} style={{ cursor: "pointer", height: "10vh" }}>
                      <td style={{ width: "30%" }}><button>{item.itemName}</button></td>
                      <td style={{ width: "15%" }}>{item.qnty}</td>
                      <td style={{ width: "15%", wordBreak: "break-word" }}>{item.batch}</td>
                      <td style={{ width: "15%", paddingLeft: "5%" }}>{item.mrp}</td>
                      {showRate ? <th style={{ width: "8%" }}>{item.netRate}</th> : <></>}
                      <td style={{ width: "15%" }}>{getmmyy(item.expDate)}</td>
                      <td style={{ width: "15%" }}>{item.stock}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table> : <></>}
    </div>
  );
}
export default ProductsList;