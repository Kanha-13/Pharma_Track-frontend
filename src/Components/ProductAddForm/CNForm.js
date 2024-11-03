import { useContext, useEffect, useState } from "react";
import Card from "../ManualAddProduct/Card";
import { getProductWithInitials } from "../../apis/products";
import InputDate from "../CustomDateInput/DateInput";
import ProductsList from "../ProductsList/ProductsList";
import { StockListHeader } from "../../Constants/stock";
import ChooseBatch from "../ChooseBatch/ChooseBatch";
import KEY from "../../Constants/keyCode";
import { getVendorsQuery } from "../../apis/vendors";
import { VendorsListHeader } from "../../Constants/vendors";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { addPurchaseCN } from "../../apis/purchase";

const CNForm = ({ setCNData }) => {
  const { dispatch, vendors } = useStore();
  const [products, setProducts] = useState([{}])
  const [stockList, setStocklist] = useState([])
  const [isStockList, setIsStockList] = useState(false)
  const [isChooseOpen, setIsChooseBatch] = useState(false)
  const [isVendorList, setisVendor] = useState(false)
  const [currentPID, setCurrentPId] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keyword, setKeyWord] = useState("");
  const [vendorKeyword, setVendorKey] = useState("");
  const [vendorName, setVendorName] = useState("")
  const [vendorId, setVendorId] = useState("")
  const [cnDate, setCnDate] = useState("")
  const [cnNo, setCnNo] = useState("")

  const fetchStockList = async (initials) => {
    try {
      const res = await getProductWithInitials(initials);
      setStocklist(res || [])
    } catch (error) {
      alert("Unable to get stock list")
    }
  }

  const fetchVendorsList = async (value) => {
    try {
      const res = await getVendorsQuery(value);
      dispatch(ACTION.SET_VENDORS, res.data)
    } catch (error) {
      alert("Unable to get vendors list!")
    }
  }

  const onChange = (name, value, index) => {
    if (name === "itemName") {
      setKeyWord(value)
      setIsStockList(true)
    }
    else {
      let update = products.map((prod, ind) => {
        if (name === "qnty")
          if (value > parseInt(prod.qnty_Stock / prod.pkg)) {
            alert("Insufficient stock!!")
            return prod
          }
        if (ind === index) return { ...prod, [name]: value }
        else return prod
      })
      if (name === "disc" || name === "qnty") {
        let total = (update[index].qnty || 0) * update[index].mrp
        let disc = total * update[index].disc / 100
        update[index].totalAmt = total - disc
      }
      setProducts(update)
    }
  }

  const handleBatchChoose = (stock) => {
    const duplicate = products.filter((prod, index) => prod.stockId === stock._id)
    if (!duplicate.length) {
      const selectedProd = stockList.filter((stock, index) => stock._id === currentPID)
      selectedProd[0].stockId = stock._id
      selectedProd[0].batch = stock.batch
      selectedProd[0].qnty = ""
      selectedProd[0].qnty_Stock = stock.qnty
      selectedProd[0].mrp = stock.mrp
      selectedProd[0].expDate = stock.expDate
      selectedProd[0].pId = selectedProd[0]._id
      delete selectedProd[0]._id
      products[currentIndex] = selectedProd[0]
      setProducts(products)
    }
    setIsChooseBatch(false)
    try {
      const tag = document.getElementsByName("qnty")
      tag[currentIndex].focus()
    } catch (error) { }
  }

  const onclickproduct = (pId) => {
    setIsStockList(false)
    setIsChooseBatch(true)
    setCurrentPId(pId)
  }

  const onchangekey = (val) => {
    val = val.trim()
    if (val === "") {
      setStocklist([])
      return
    }
    fetchStockList(val)
  }

  const submitCN = async () => {
    let array_trim = products.filter(value => Object.keys(value).length !== 0);
    if (array_trim.length) {
      try {
        let totalAmt = 0;
        products.map((prod) => {
          if (prod.totalAmt)
            totalAmt += prod.totalAmt
        })
        const data = {
          productsDetail: array_trim,
          cnDate: cnDate,
          vId: vendorId,
          totalAmt: totalAmt,
          cnNo: cnNo,
        }
        const res = await addPurchaseCN(data)
        setCNData({ totalAmt: totalAmt, cnId: res.data._id })
        alert("CN added success!")
      } catch (error) {
        console.log(error)
        alert("Unable to add CN!")
      }
    }
    else alert("Empty list!!")

  }

  const handlenextfield = (event) => {
    if (event.keyCode === KEY.ENTER) {
      setProducts([...products, {}])
      const tag = document.getElementsByName("itemName")
      try {
        setTimeout(() => {
          if (tag[currentIndex + 1])
            tag[currentIndex + 1].focus();
        }, 100);
      } catch (error) {

      }
    }
  }

  const handleKeyUp = (event) => {
    switch (event.keyCode) {
      case KEY.ESC:
        event.stopPropagation();
        setIsChooseBatch(false)
        setIsStockList(false)
        break;
      case KEY.END:
        submitCN();
        break;
      default:
        break;
    }
  }

  const onclickVendor = (value) => {
    const filterr = vendors.filter((ven) => ven._id === value)[0]
    setVendorName(filterr.vendorName)
    setVendorId(filterr._id)
    setisVendor(false)
    const tags = document.getElementsByName("cnDate")
    if (tags[0])
      tags[0].focus()
  }

  const openVendor = (name, value) => {
    setVendorKey(value)
    setisVendor(true)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyUp);
    };
  }, []);

  return (
    <div style={{ marginTop: "-20vh", borderRadius: "0.5vw", padding: "1%", border: "1px solid purple", position: "absolute", backgroundColor: "#ffffff", width: "80vw", height: "80vh" }}>
      <h2 style={{ borderBottom: "1px solid gray", margin: "2px 2px" }}>CN Form</h2>
      <div style={{ width: "100%", display: "flex", width: "100%", height: "12vh", alignItems: "center" }}>
        <Card focus={true} require={true} value={vendorName} m="5px 0px" w="18%" h="30%" pd="1.3vh 0.1vw" ph="Vendor Name" name="vendorName" label="Vendor Name" onchange={openVendor} type="text" />
        <InputDate name="cnDate" onchange={(name, value) => setCnDate(value)} type="fulldate" value={cnDate} fs="1vw" h="55%" label="CN Date" m="5px 10px" pd="" w="12%" />
        <Card require={true} value={cnNo} m="5px 0px" w="18%" h="30%" pd="1.3vh 0.1vw" ph="CN Number" name="cnNo" label="CN No." onchange={(name, value) => setCnNo(value)} type="text" />
      </div>
      <div style={{ display: "flex", width: "100%", borderBottom: "1px solid gray", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "bold", width: "13%", margin: "5px 0px" }}>Item name</p>
        <p style={{ fontWeight: "bold", width: "13%", margin: "5px 0px" }}>Batch</p>
        <p style={{ fontWeight: "bold", width: "7%", margin: "5px 0px" }}>Pkg</p>
        <p style={{ fontWeight: "bold", width: "8%", margin: "5px 0px" }}>Exp. Date</p>
        <p style={{ fontWeight: "bold", width: "8%", margin: "5px 0px" }}>MRP</p>
        <p style={{ fontWeight: "bold", width: "7%", margin: "5px 0px" }}>Qnty.-strips</p>
        <p style={{ fontWeight: "bold", width: "7%", margin: "5px 0px" }}>Discount</p>
        <p style={{ fontWeight: "bold", width: "9%", margin: "5px 0px" }}>Total amt.</p>
      </div>
      {
        isStockList ? <div style={{ width: "98%", height: "100%", position: "absolute", top: 0, backgroundColor: "#ffffff" }}>
          <ProductsList mh="400%" h="100%" w="100%" onchange={onchangekey} keyword={keyword}
            onclick={onclickproduct} header={StockListHeader} data={stockList} />
        </div> :
          <div style={{ width: "100%", height: "60%", overflowY: "auto", display: "flex", flexDirection: "column" }}>
            {
              products.map((prod, index) => {
                const onchangevalue = (name, value) => {
                  onChange(name, value, index)
                }
                return (
                  <div key={index + "cn-form-list"} style={{ width: "80vw", height: "10vh", justifyContent: "space-between", display: "flex" }}>
                    <Card require={true} value={prod.itemName} m="5px 0px" w="13%" h="12%" pd="1.3vh 0.1vw" ph="Item Name" name="itemName" label="" onchange={(name, value) => { setCurrentIndex(index); onChange(name, value) }} type="text" />
                    <Card require={true} value={prod.batch} m="5px 0px" w="13%" h="12%" pd="1.3vh 0.1vw" ph="Batch" name="batch" label="" onchange={()=>{}} type="text" />
                    <Card require={true} value={prod.pkg} m="5px 0px" w="7%" h="12%" pd="1.3vh 0.1vw" ph="pkg" name="pkg" label="" onchange={()=>{}} type="text" />
                    <InputDate name="expDate" onchange={() => { }} type="month" value={prod.expDate} fs="1vw" h="35%" m="5px 0px" pd="" w="12%" />
                    <Card require={true} value={prod.mrp} m="5px 0px" w="8%" h="12%" pd="1.3vh 0.1vw" ph="mrp" name="mrp" label="" onchange={()=>{}} type="text" />
                    <Card require={true} value={prod.qnty} m="5px 0px" w="7%" h="12%" pd="1.3vh 0.1vw" ph="qnty" name="qnty" label="" onchange={onchangevalue} type="text" />
                    <Card require={true} value={prod.disc} m="5px 0px" w="7%" h="12%" pd="1.3vh 0.1vw" ph="discount" name="disc" label="" onchange={onchangevalue} type="text" />
                    <Card keypress={handlenextfield} require={true} value={prod.totalAmt} m="5px 0px" w="9%" h="12%" pd="1.3vh 0.1vw" ph="total amt" name="totalAmt" label="" onchange={onchangevalue} type="text" />
                  </div>
                )
              })
            }
          </div>
      }
      <div style={{ width: "100%", display: "flex" }}>
        <button onClick={submitCN} style={{ backgroundColor: "#5e48e8", color: "#ffffff", cursor: "pointer", borderRadius: "0.5vw", marginLeft: "3vw", width: "11vw", height: "6vh", fontSize: "1vw" }}>Submit</button>
        <button onClick={() => setProducts([{}])} style={{ cursor: "pointer", borderRadius: "0.5vw", marginLeft: "3vw", width: "11vw", height: "6vh", fontSize: "1vw" }}>Reset</button>
        <button onClick={() => setProducts([...products, {}])} style={{ cursor: "pointer", borderRadius: "0.5vw", marginLeft: "3vw", width: "11vw", height: "6vh", fontSize: "1vw" }}>Add field</button>
      </div>
      {isVendorList ? <div style={{ width: "80vw", position: "absolute", top: 0, backgroundColor: "#ffffff", height: "100%" }}>
        <ProductsList listName="vendors" mh="400%" h="100%" w="100%" onchange={fetchVendorsList}
          onclick={onclickVendor} header={VendorsListHeader} data={vendors} keyword={vendorKeyword} />
      </div>
        : <></>}
      {isChooseOpen ? <div style={{ width: "80vw", backgroundColor: "#ffffff", height: "100%" }}>
        <ChooseBatch pId={currentPID} show={isChooseOpen} onEnter={handleBatchChoose} />
      </div>
        : <></>}
    </div>
  );
}

export default CNForm;