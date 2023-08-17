import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";

import "./productslist.css"
import { checkForScroll, scrollElement } from "../../utils/dom";
import { getmmyy, toddmmyy } from "../../utils/DateConverter";
import { useLocation, useNavigate } from "react-router-dom";
import KEY from "../../Constants/keyCode";
import { ROUTES } from "../../Constants/routes_frontend";

const ProductsList = ({ listName = "products", show = true, header = [], h = "100%", w = "43%", ph = "Search product...", data = [], onclick, onchange, keyword = "" }) => {
  const navigate = useNavigate();
  const location = useLocation()
  const [search, setSearch] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listClass, setClass] = useState("borderbox close-animation");

  const onchangeval = (val) => {
    onchange(val)
    setSearch(val)
  }

  const handleEnterPress = () => {
    if (data.length)
      onclick(data[currentIndex]._id)
  }

  const onselectproduct = (pId) => {
    onclick(pId)
  }

  const handleListNav = (direction) => {
    if (direction === "down") {
      if (currentIndex < data.length - 1)
        setCurrentIndex((prev) => prev + 1)
      else if (currentIndex === data.length - 1)
        setCurrentIndex(0)
    }
    else {
      if (currentIndex > 0)
        setCurrentIndex((prev) => prev - 1)
      else if (currentIndex === 0)
        setCurrentIndex(data.length - 1)
    }
  }

  const getValue = (item, value) => {
    if (value === "expDate")
      return getmmyy(item[value])
    if (value === "date")
      return toddmmyy(item[value])
    if (value === "gst")
      return item[value] + " %"
    if (item.category === "TABLET") {
      if (value === "pkg")
        return item[value] + " 's"
      if (value === "category")
        return "Strips/Tabs"
      if (value === "qnty" && item.qnty)
        return `${parseInt(item.qnty / item.pkg)} / ${item.qnty % item.pkg}`
      return item[value] || "NILL"
    }
    else
      return item[value] || "NILL"
  }

  useEffect(() => {
    const rows = document.getElementsByClassName("prod-row") || []
    try {
      data.map((row, index) => {
        if (index === currentIndex) {
          if (!checkForScroll("product-data-container", rows[index]))
            scrollElement("product-data-container", rows[index])
          rows[index].style.backgroundColor = "#D6D8E7"
        }
        else rows[index].style.backgroundColor = "transparent"
      })
    } catch (error) { }
  }, [currentIndex])

  useEffect(() => {
    setCurrentIndex(0)
    const rows = document.getElementsByClassName("prod-row") || []
    try {
      data.map((row, index) => {
        if (index === 0) rows[index].style.backgroundColor = "#D6D8E7"
        else rows[index].style.backgroundColor = "transparent"
      })
    } catch (error) { }
  }, [data])

  useEffect(() => {
    if (data.length)
      setClass("borderbox open-animation")
    else
      setClass("borderbox close-animation")
  }, [data])

  useEffect(() => {
    if (keyword)
      setSearch(keyword)
  }, [keyword])

  const get_ToAdd_Location = () => {
    if (listName === "products")
      return ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCT_ADD_MANUAL
    else if (listName === "companys")
      return ROUTES.PROTECTED_ROUTER + ROUTES.COMPANY_ADD
    else if (listName === "vendors")
      return ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS_ADD
  }

  const get_ToUpdate_Location = async () => {
    let index = 0;
    await setCurrentIndex((prev) => {
      index = prev
      return prev
    })
    const paths = [
      "stock",
      "billing",
      "purchase"
    ]
    if (listName === "products" && data[index])
      return ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCT_INFO + "id=" + data[index]._id
    else if (listName === "companys" && data[index])
      return ROUTES.PROTECTED_ROUTER + ROUTES.COMPANY_INFO + "id=" + data[index]._id
    else if (listName === "vendors" && data[index])
      return ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS_INFO + "id=" + data[index]._id
  }

  const handleKeyUp = async(event) => {
    switch (event.keyCode) {
      case KEY.F2:
        event.stopPropagation();
        event.preventDefault();
        navigate(get_ToAdd_Location(), { state: { callBackPath: location.pathname } })
        break;
      case KEY.F3:
        event.stopPropagation();
        event.preventDefault();
        navigate(await get_ToUpdate_Location(), { state: { callBackPath: location.pathname } })
        break;
      default:
        break;
    }
  };

  return (
    <div id="productslist-container" style={{ display: show ? "flex" : "none", height: h, width: w }} className={listClass}>
      <div style={{ backgroundColor: "#ffffff", display: "flex", justifyContent: "center", alignItems: "center", minHeight: "8vh", width: "100%", position: "sticky", top: "0px" }}>
        <SearchBar keyPress={handleKeyUp} onEnter={handleEnterPress} onNav={handleListNav} onchange={onchangeval} h="3vh" w="90%" placeholder={ph} val={search} />
      </div>
      {
        data.length > 0 ?
          <>
            <table style={{ height: "5vh", width: "90%" }}>
              <thead style={{
                backgroundColor: "#ebe8fc", height: "5vh",
                marginBottom: "10px", borderBottom: "1px solid gray"
              }}>
                <tr >
                  {header.map((head) => <th key={head.name + "in productlist"} style={{ width: head.colSize }}>{head.name}</th>)}
                </tr>
              </thead>
            </table>
            <div id="product-data-container" style={{ width: "90%", maxHeight: "65vh", overflow: "auto" }}>
              <table style={{ width: "100%" }}>
                <tbody>
                  {
                    data.map((item, index) => {
                      return (
                        <tr key={`${item._id}-product-list`} className="prod-row" onClick={() => onselectproduct(item._id)} style={{ cursor: "pointer", height: "10vh" }}>
                          {
                            header.map((head) => <td key={head.name + "in-prod-row"} style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </> : <></>}
    </div>
  );
}
export default ProductsList;