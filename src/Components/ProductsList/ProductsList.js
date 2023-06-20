import { useEffect, useRef, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

import "./productslist.css"
import { getmmyy } from "../../utils/DateConverter";

const ProductsList = ({ h = "100%", w = "43%", showRate = false, products = [], onclick, onchange }) => {
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);//-1 means none selected
  const [listClass, setClass] = useState("borderbox close-animation");

  const onchangeval = (val) => {
    onchange(val)
    setSearch(val)
  }

  const handleEnterPress = () => {
    console.log(currentIndex, "enter")
    if (currentIndex !== -1)
      onclick(products[currentIndex]._id)
  }

  const onselectproduct = (pId) => {
    onclick(pId)
  }

  const handleListNav = (direction) => {
    if (direction === "down") {
      if (currentIndex < products.length - 1)
        setCurrentIndex((prev) => prev + 1)
      else if (currentIndex === products.length - 1)
        setCurrentIndex(0)
    }
    else {
      if (currentIndex > 0)
        setCurrentIndex((prev) => prev - 1)
      else if (currentIndex === 0)
        setCurrentIndex(products.length - 1)
    }
  }

  useEffect(() => {
    if (currentIndex !== -1) {
      const rows = document.getElementsByClassName("prod-row") || []
      try {
        products.map((row, index) => {
          if (index === currentIndex) rows[index].style.backgroundColor = "#D6D8E7"
          else rows[index].style.backgroundColor = "transparent"
        })
      } catch (error) { }
    }
  }, [currentIndex])

  useEffect(() => {
    const rows = document.getElementsByClassName("prod-row") || []
    try {
      products.map((row, index) => {
        if (index === 0) rows[index].style.backgroundColor = "#D6D8E7"
        else rows[index].style.backgroundColor = "transparent"
      })
    } catch (error) { }
  }, [products])

  useEffect(() => {
    if (products.length)
      setClass("borderbox open-animation")
    else
      setClass("borderbox close-animation")
  }, [products])

  return (
    <div id="productslist-container" style={{ height: h, width: w }} className={listClass}>
      <div style={{ backgroundColor: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "8vh", width: "100%", position: "sticky", top: "0px" }}>
        <SearchBar onEnter={handleEnterPress} onNav={handleListNav} onchange={onchangeval} h="3vh" w="90%" placeholder="Search product..." val={search} />
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
                    <tr key={`${item._id}-product-list`} className="prod-row" onClick={() => onselectproduct(item._id)} style={{ cursor: "pointer", height: "10vh" }}>
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