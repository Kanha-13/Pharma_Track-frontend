import { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import { getVendor, getVendorsQuery } from "../../apis/vendors";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ACTION } from "../../Store/constants";
import { PaymentTypesLits } from "../../Constants/Purchase";
import { PURCHASEBILLINFO, PURCHASEPRODUCTINFO, purchasebilldetail, purchaseproductdetail } from "../../Schema/purchase";
import { addPurchaseDetial, getPurchase } from "../../apis/purchase";
import { checkIfMissingValues, checkInvalidFormatAndType, getNet, getTotal, removeBlankRow } from "../../utils/purchase";
import { ROUTES } from "../../Constants/routes_frontend";
import { getyyyymm, getyyyymmdd } from "../../utils/DateConverter";


import './index.css'

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";
import ProductAddForm from "../../Components/ProductAddForm/ProductAddForm";
import InputDate from "../../Components/CustomDateInput/DateInput";
import KEY from "../../Constants/keyCode";
import { useLocalStorage } from "../../utils/useLocalStorage";
import ProductsList from "../../Components/ProductsList/ProductsList";
import { VendorsListHeader } from "../../Constants/vendors";
import ErrorModal from "../../Components/ErrorModal/ErrorModal";

const PurchaseAdd = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()
  const location = useLocation()
  const [storedValue, setValue] = useLocalStorage("pendingPurchaseAdd")
  const { dispatch, vendors, products } = useStore();
  const [purchaseBillDetail, setPurchaseBill] = useState(purchasebilldetail)
  const [purchaseProducts, setPurchaseProducts] = useState(Array.from({ length: 1 }, (_, index) => purchaseproductdetail))
  const [mode, setMode] = useState("add")
  const [keyword, setkeyword] = useState("")
  const [isVendors, setIsVendors] = useState(false)
  const [errMsg, seterr] = useState(false)
  const [pendingEntrys, setPendingEntrys] = useState([])
  const [pendingEntrySelect, setPendingEntrySelect] = useState(null)

  const fetchVendorsList = async (value) => {
    try {
      const res = await getVendorsQuery(value);
      dispatch(ACTION.SET_VENDORS, res.data)
    } catch (error) {
      alert("Unable to get vendors list!")
    }
  }

  const onchangeBillDetail = (name, value) => {
    if (name === "vId") {
      setkeyword(value)
      setIsVendors(true)
    }
    setPurchaseBill({ ...purchaseBillDetail, [name]: value })
    setValue({ billData: { ...purchaseBillDetail, [name]: value }, prodData: purchaseProducts });
  }

  const onchangeproductlist = (index, name, value) => {
    try {
      const updatedetail = purchaseProducts.map((detail, ind) => {
        if (ind === index) {
          if (name === PURCHASEPRODUCTINFO.PRODUCTID) {//feeding extra detail needed to calculate netrate later
            const selectedProd = products.filter((prod, index) => prod._id === value)[0]
            if (selectedProd)
              return { ...detail, [name]: value, itemName: selectedProd.itemName, pkg: selectedProd.pkg, category: selectedProd.category, gst: selectedProd.gst, vId: purchaseBillDetail.vId, parentCategory: selectedProd.parentCategory }
          }
          else if (name === PURCHASEPRODUCTINFO.QNT || name === PURCHASEPRODUCTINFO.SC || name === PURCHASEPRODUCTINFO.RATE || name === PURCHASEPRODUCTINFO.CD || name === PURCHASEPRODUCTINFO.FREE) {
            let { netvalue, nettax, netamt, netrateperunit } = getNet(name, purchaseProducts[index], value)
            let { totalvalue, totaltax, totalamt } = getTotal(purchaseProducts, index, netamt, netvalue, nettax)
            setPurchaseBill({ ...purchaseBillDetail, totalAmt: totalamt, totalValue: totalvalue, totalTax: totaltax })

            return { ...detail, [name]: value, netValue: netvalue, netAmt: netamt, netRate: netrateperunit, netTax: nettax }
          }
          else if (name === PURCHASEPRODUCTINFO.GST || name === PURCHASEPRODUCTINFO.TOTAL_VALUE)
            return detail
          return { ...detail, [name]: value }
        }
        else
          return detail
      })
      setPurchaseProducts(updatedetail);
      setValue({ billData: purchaseBillDetail, prodData: updatedetail });
    } catch (error) {
      console.log(error)
    }
  }

  const onsubmit = () => {
    if (mode === "add")
      addPurchase()
    else
      updatePurchase()
  }

  const addPurchase = async () => {
    try {
      if (purchaseBillDetail.paymentType === "CASH") {
        purchaseBillDetail.paymentDate = purchaseBillDetail.purDate
        purchaseBillDetail.paymentId = "cash"
      }
      const addingVid = purchaseProducts.map((prod) => {
        return { ...prod, vId: purchaseBillDetail.vId }
      })
      const cleared_productlist = removeBlankRow(addingVid)
      const error = checkInvalidFormatAndType(purchaseBillDetail, cleared_productlist)
      if (error)
        seterr(error)
      else if (checkIfMissingValues(purchaseBillDetail, cleared_productlist))
        seterr("No missing values allowed")
      else {
        const data = {
          billInfo: purchaseBillDetail,
          productsDetail: cleared_productlist
        }
        const res = await addPurchaseDetial(data)
        setValue(null)//making session storage null
        if (pendingEntrySelect >= 0) {//making localstorage storage null
          let ls_data = window.localStorage.getItem("pendingPurchaseBill")
          if (ls_data) {
            ls_data = JSON.parse(ls_data)
            if (Array.isArray(ls_data))
              ls_data = ls_data.filter((d) => d.billData.billNo !== purchaseBillDetail.billNo)
          }
          window.localStorage.setItem("pendingPurchaseBill", JSON.stringify(ls_data))
        }
        setPurchaseProducts(Array.from({ length: 1 }, (_, index) => purchaseproductdetail))
        setPurchaseBill(purchasebilldetail)
        alert("Pruchase updated successfully!")
        dispatch(ACTION.SET_STOCKS, [])
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      seterr(`${error.response.data.error}` || "Unable to add purchase entry!")
    }
  }

  const updatePurchase = async () => {

  }

  const addField = () => {
    const newIndex = purchaseProducts.length
    setPurchaseProducts((prev) => [...prev, purchaseproductdetail])
    setTimeout(() => {
      const tags = document.getElementsByName("itemName")
      const newfield = tags[newIndex]
      newfield?.focus()
    }, 200);
  }

  const deleteField = (index) => {
    setPurchaseProducts(purchaseProducts.filter((_, ind) => ind !== index))
  }

  const fetchPurchase = async (id) => {
    try {
      const res = await getPurchase(id);
      const res_data = res.data
      const calc_data = res_data.productsDetail.map((prod) => {
        return { ...prod, expDate: getyyyymm(prod.expDate), gst: Math.round((prod.netTax / prod.qnty) * 100 / prod.rate) }
      })
      setPurchaseProducts(calc_data)
      delete res_data.productsDetail
      res_data.purDate = getyyyymmdd(res_data.purDate)
      if (res_data.paymentDate)
        res_data.paymentDate = getyyyymmdd(res_data.paymentDate)
      const vendor = await getvendorname(res_data.vId)
      setPurchaseBill({ ...res_data, vendorName: vendor })
    } catch (error) {
      console.log(error)
      alert("Unable to get purchase information!")
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PURCHASE)
    }
  }

  const oncancel = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PURCHASE)
  }

  useEffect(() => {
    const purchaseId = searchParams.get("id")
    if (purchaseId) {
      fetchPurchase(purchaseId)
      setMode("update")
    }
  }, [])

  const onclickVendor = (value) => {
    const filterr = vendors.filter((ven) => ven._id === value)[0]
    setPurchaseBill({ ...purchaseBillDetail, vId: value, vendorName: filterr.vendorName })
    setValue({ billData: { ...purchaseBillDetail, vId: value, vendorName: filterr.vendorName }, prodData: purchaseProducts });
    setIsVendors(false)
    const tags = document.getElementsByName("billNo")
    if (tags[0])
      tags[0].focus()
  }

  const getvendorname = async (vid) => {
    const res = await getVendor(vid);
    return res?.data?.vendorName || ""
  }

  const resetAllfield = () => {
    setPurchaseBill(purchasebilldetail)
    setPurchaseProducts(Array.from({ length: 1 }, (_, index) => purchaseproductdetail))
    setValue(null);
    setPendingEntrySelect(null)
    window.location.reload()
  }

  const saveinLS = async () => {
    try {
      let ls_data = window.localStorage.getItem("pendingPurchaseBill")
      if (ls_data)
        ls_data = JSON.parse(ls_data)
      else
        ls_data = []
      ls_data.push({ billData: purchaseBillDetail, prodData: purchaseProducts })
      window.localStorage.setItem("pendingPurchaseBill", JSON.stringify(ls_data));
      resetAllfield()
    } catch (error) {
      alert("Unable to save")
      console.log(error)
    }
  }

  useEffect(() => {
    if (pendingEntrys[pendingEntrySelect]) {
      setPurchaseBill(pendingEntrys[pendingEntrySelect].billData)
      setPurchaseProducts(pendingEntrys[pendingEntrySelect].prodData)
    }
  }, [pendingEntrySelect])

  useEffect(() => {
    if (storedValue) {
      setPurchaseBill(storedValue.billData)
      setPurchaseProducts(storedValue.prodData)
    }
    if (window.localStorage.getItem("pendingPurchaseBill"))
      var parse_data = JSON.parse(window.localStorage.getItem("pendingPurchaseBill"))
    if (Array.isArray(parse_data))
      setPendingEntrys(parse_data)
  }, []);

  const handlekeypress = (event) => {
    switch (event.keyCode) {
      case KEY.END:
        onsubmit();
        break;
      case KEY.ESC:
        setIsVendors((prev) => {
          if (prev) event.stopPropagation()
          return false
        })
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handlekeypress);
    return () => {
      document.removeEventListener('keydown', handlekeypress);
    };
  }, [purchaseBillDetail, purchaseProducts])
  return (
    <Layout>
      <div id="purchaseadd-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "2vh" }}>Purchase Entry</p>
        {
          pendingEntrys.length > 0 &&
          <Card value={pendingEntrySelect} m="-2% 0% 0% 70%" po="absolute" w="15%" h="1%" name="pendingEntrySelect" label="Pending entries" onchange={(name, value) => setPendingEntrySelect(value)} type="select" options={[{ label: "Select pending bill", value: "" }, ...pendingEntrys.map((entry, index) => {
            return { label: entry.billData.billNo + " " + entry.billData.vendorName, value: index }
          })]} />
        }
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", height: "15%", width: "100%" }}>
          <Card focus={true} require={true} value={purchaseBillDetail.vendorName} m="1.5% 0px" w="17%" h="15%" name={PURCHASEBILLINFO.VENDORID} label="Vendor Name" onchange={onchangeBillDetail} type="text" />
          <Card require={true} value={purchaseBillDetail.billNo} m="1.5% 1%" w="9%" h="15%" name={PURCHASEBILLINFO.BILLNUMBER} label="Bill No." onchange={onchangeBillDetail} type="text" />
          <InputDate require={true} value={purchaseBillDetail.purDate} m="1.5% 1%" w="11%" h="2%" pd="2%" name={PURCHASEBILLINFO.PURCHASEDATE} label="Purchase Date" onchange={onchangeBillDetail} type="fulldate" />
          <Card require={true} value={purchaseBillDetail.paymentType} m="1.5% 1%" w="10%" h="15%" name={PURCHASEBILLINFO.PAYMENTTYPE} label="Payment Type" onchange={onchangeBillDetail} type="select" options={PaymentTypesLits} />
          {purchaseBillDetail.paymentId && <Card value={purchaseBillDetail.paymentId} m="1.5% 1%" w="10%" h="15%" name={PURCHASEBILLINFO.PAYMENT_ID} label="Payment Id" onchange={() => { }} type="text" />}
          {purchaseBillDetail.paymentDate && <InputDate require={true} value={purchaseBillDetail.paymentDate} m="1.5% 1%" w="10%" h="2%" pd="2%" name={PURCHASEBILLINFO.PAYMENT_DATE} label="Payment Date" onchange={() => { }} type="fulldate" />}
        </div>
        {
          purchaseProducts.length > 0 ?
            <ProductAddForm resetall={resetAllfield} oncancel={oncancel} saveinLS={saveinLS} mode={mode} onSubmit={onsubmit} addField={addField} deleteField={deleteField} purchaseProducts={purchaseProducts} onChange={onchangeproductlist} /> : <></>
        }
        <div style={{ backgroundColor: "#e4e1f4", width: "20%", padding: "1%", alignSelf: "flex-end", height: "12%", display: "flex", alignItems: "center", justifyContent: 'flex-end' }}>
          <div style={{ height: "100%", width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: "1.2rem", margin: "0px", width: "100%", textAlign: "left" }}>Sub total: </p>
            <p style={{ fontSize: "1.2rem", margin: "0px", width: "100%", textAlign: "left" }}>Tax: </p>
            <p style={{ fontSize: "1.2rem", margin: "0px", width: "100%", textAlign: "left" }}>Grand total: </p>
          </div>
          <div style={{ height: "100%", width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
            <input style={{ border: "none", backgroundColor: "transparent", width: "90%", fontSize: "1.2rem" }} readOnly value={purchaseBillDetail.totalValue} />
            <input style={{ border: "none", backgroundColor: "transparent", width: "90%", fontSize: "1.2rem" }} readOnly value={purchaseBillDetail.totalTax} />
            <input style={{ border: "none", backgroundColor: "transparent", width: "90%", fontSize: "1.2rem" }} readOnly value={purchaseBillDetail.totalAmt} />
          </div>
        </div>
      </div>
      {isVendors &&
        <div style={{ backgroundColor: "#ffffff", left: "4vw", alignItems: "center", justifyContent: "center", position: "absolute", width: "90.5%", zIndex: 2, top: "3vh", height: "91%", display: "flex", flexDirection: 'column' }}>
          <ProductsList listName="vendors" mh="400%" h="100%" w="100%" onchange={fetchVendorsList}
            onclick={onclickVendor} header={VendorsListHeader} data={vendors} keyword={keyword} />
        </div>
      }
      {
        errMsg ? <ErrorModal error={errMsg} closeModal={() => seterr(null)} /> : <></>
      }
    </Layout>
  );
}

export default PurchaseAdd;