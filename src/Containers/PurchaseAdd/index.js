import { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { useNavigate } from "react-router-dom";
import { ACTION } from "../../Store/constants";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'
import { PaymentTypesLits, PurchaseProductListHeader } from "../../Constants/Purchase";
import { PURCHASEBILLINFO, PURCHASEPRODUCTINFO, purchasebilldetail } from "../../Schema/purchase";
import { getAllProducts } from "../../apis/products";
import { addPurchaseDetial } from "../../apis/purchase";
import { calculateNetRate, checkIfMissingValues } from "../../utils/purchase";

const PurchaseAdd = () => {
  const { dispatch, vendors, products } = useStore();
  const navigate = useNavigate()
  const [purchaseBillDetail, setPurchaseBill] = useState(purchasebilldetail)
  const [purchaseProducts, setPurchaseProducts] = useState(Array.from(({ length: 5 })))
  const [vendorslist, setVendorlist] = useState([]);
  const [productslist, setProductslist] = useState([]);

  const formatevendorslist = (vendorss) => {
    const vendorsoption = vendorss.map((vendor) => {
      return { label: vendor.vendorName, value: vendor._id }
    })
    setVendorlist([{ label: "Select Vendor", value: "" }, ...vendorsoption])
  }

  const formateproductslist = (productss) => {
    const productoptions = productss.map((product) => {
      return { label: product.itemName, value: product._id }
    })
    setProductslist([{ label: "Select Product", value: "" }, ...productoptions])
  }

  const fetchVendorsList = async () => {
    try {
      const res = await getVendors();
      formatevendorslist(res.data)
      dispatch(ACTION.SET_VENDORS, res.data)
    } catch (error) {
      alert("Unable to get vendors list!")
    }
  }

  const fetchProductsList = async () => {
    try {
      const res = await getAllProducts();
      formateproductslist(res.data)
      dispatch(ACTION.SET_PRODUCTS, res.data)
    } catch (error) {
      alert("Unable to get products list!")
    }
  }

  const onchangeBillDetail = (name, value) => {
    setPurchaseBill({ ...purchaseBillDetail, [name]: value })
  }

  const getQnty = (name, product, value) => {
    switch (name) {
      case PURCHASEPRODUCTINFO.TABS:
        return ((parseInt(product.strips) + parseInt(product.free)) * parseInt(product.pkg)) + parseInt(value)
      case PURCHASEPRODUCTINFO.STIRPS:
        return parseInt(product.tabs) + (parseInt(product.pkg) * (parseInt(value) + parseInt(product.free)))
      case PURCHASEPRODUCTINFO.FREE:
        return parseInt(product.tabs) + (parseInt(product.pkg) * (parseInt(value) + parseInt(product.strips)))
      default:
        break;
    }
  }

  const onchangeproductlist = (index, name, value) => {
    try {
      setPurchaseProducts(purchaseProducts.map((detail, ind) => {
        if (ind === index) {
          if (name === PURCHASEPRODUCTINFO.PRODUCTID) {//feeding extra detail needed to calculate netrate later
            const selectedProd = products.filter((prod, index) => prod._id === value)[0]
            if (selectedProd)
              return { ...detail, [name]: value, pkg: selectedProd.pkg, category: selectedProd.category, gst: selectedProd.gst, vId: purchaseBillDetail.vId }
          }
          if (purchaseProducts[index].category === "TABLET" && (name === PURCHASEPRODUCTINFO.STIRPS || name === PURCHASEPRODUCTINFO.TABS || name === PURCHASEPRODUCTINFO.FREE))
            return { ...detail, [name]: value, qnty: getQnty(name, purchaseProducts[index], value) }//calculating qnty(total tabs)
          return { ...detail, [name]: value }
        }
        else
          return detail
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const removeBlankRow = (productlist = []) => {
    return productlist.filter(prod => prod !== null && prod !== undefined)
    // return productlist.filter(prod => Object.keys(prod).length > 0)
  }

  const addPurchase = async () => {
    try {
      const cleared_productlist = removeBlankRow(purchaseProducts)
      const final_productlist = calculateNetRate(cleared_productlist)
      if (checkIfMissingValues(purchaseBillDetail, final_productlist))
        alert("No missing values allowed")
      else {
        const data = {
          billInfo: purchaseBillDetail,
          productsDetail: final_productlist
        }
        const res = await addPurchaseDetial(data)
        setPurchaseProducts(Array.from({ length: 5 }))
        setPurchaseBill(purchasebilldetail)
        alert("Pruchase updated successfully!")
        dispatch(ACTION.SET_STOCKS, [])
      }
    } catch (error) {
      console.log(error)
      alert("Unable to add purchase entry!")
    }
  }

  const getQuantityInput = (index, onchange) => {
    let pId = purchaseProducts[index]?.pId
    let category = products.filter((product) => product._id === pId)[0]?.category
    return (
      category === "TABLET" ?
        <>
          <Card require={true} w="5.5%" h="35%" pd="1.3vh 0.1vw" m="0px" name={PURCHASEPRODUCTINFO.STIRPS} label="" ph="Strips" value={purchaseProducts[index]?.strips} onchange={onchange} type="number" />
          <Card require={true} w="5%" h="35%" pd="1.3vh 0.1vw" m="0px 0px 0px -1.6vw" name={PURCHASEPRODUCTINFO.TABS} label="" ph="Tabs" value={purchaseProducts[index]?.tabs} onchange={onchange} type="number" />
        </>
        :
        <Card require={true} w="5.5%" h="35%" pd="1.3vh 0.1vw" m="0px" name={PURCHASEPRODUCTINFO.QNT} label="" ph="Qnty" value={purchaseProducts[index]?.qnty} onchange={onchange} type="number" />
    )
  }

  const addField = () => {
    setPurchaseProducts([...purchaseProducts, {}])
  }

  const deleteField = (index) => {
    setPurchaseProducts(purchaseProducts.filter((_, ind) => ind !== index))
  }

  // useEffect(() => {
  //   let keyPressed = {}
  //   const handleKeydown = (event) => {
  //     //SHORT CUT KEY COMBINATIONS
  //     keyPressed[event.key] = true;
  //     if (keyPressed['Control'] && keyPressed['m']) {
  //       event.preventDefault()
  //       alert("pressed")
  //     }
  //   }
  //   const handleKeyup = (event) => {
  //     keyPressed[event.key] = false;
  //   }
  //   document.addEventListener("keyup", handleKeyup)
  //   document.addEventListener("keydown", handleKeydown)
  //   return () => {
  //     document.removeEventListener("keyup", handleKeyup)
  //     document.removeEventListener("keydown", handleKeydown)
  //   }
  // }, [])

  useEffect(() => {
    if (vendors.length) { formatevendorslist(vendors) }
    else fetchVendorsList();
    if (products.length) { formateproductslist(products) }
    else fetchProductsList();
  }, [])

  return (
    <Layout>
      <div id="purchaseadd-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "2vh" }}>Purchase Entry</p>
        {/* <div style={{ width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap", marginBottom: "2vh" }}>
          <div style={{ display: "flex", flexDirection: "column", width: "15%" }}>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>Vendor Name</p>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>Purchase Date</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "30%", justifyContent: "space-between" }}>
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none" }} value={purchaseBillDetail?.itemName} />
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none" }} value={purchaseBillDetail?.company} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "15%" }}>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>GST</p>
            <p style={{ fontWeight: "600", margin: "0px 0px 5px 0px" }}>Pkg</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "30%", justifyContent: "" }}>
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none", margin: "0px 0px 4px 0px" }} value={purchaseBillDetail?.gst} />
            <input readOnly style={{ border: "none", userSelect: "none", outline: "none", margin: "0px 0px 4px 0px" }} value={purchaseBillDetail?.pkg} />
          </div>
        </div> */}
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", height: "15%", width: "100%" }}>
          <Card focus={true} require={true} value={purchaseBillDetail.vId} m="1.5% 0px" w="25%" h="15%" name={PURCHASEBILLINFO.VENDORID} label="Vendor Name" onchange={onchangeBillDetail} type="select" options={vendorslist} />
          <Card require={true} value={purchaseBillDetail.billNo} m="1.5% 1%" w="15%" h="15%" name={PURCHASEBILLINFO.BILLNUMBER} label="Bill No." onchange={onchangeBillDetail} type="text" />
          <Card require={true} value={purchaseBillDetail.purDate} m="1.5% 1%" w="15%" h="15%" name={PURCHASEBILLINFO.PURCHASEDATE} label="Purchase Date" onchange={onchangeBillDetail} type="date" />
          <Card require={true} value={purchaseBillDetail.paymentType} m="1.5% 1%" w="10%" h="15%" name={PURCHASEBILLINFO.PAYMENTTYPE} label="Payment Type" onchange={onchangeBillDetail} type="select" options={PaymentTypesLits} />
        </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", height: "65%" }}>
          <table style={{ height: "5vh", width: "100%", borderCollapse: "collapse" }}>
            {/* <thead style={{
              backgroundColor: "#ebe8fc", height: "5vh",
              marginBottom: "10px", borderBottom: "1px solid gray"
            }}>
              <tr >
                {PurchaseProductListHeader.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
              </tr>
            </thead> */}
          </table>
          {
            purchaseProducts.length > 0 ?
              <div style={{ width: "100%", height: "80%", overflowY: "auto", marginTop: "2vh" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", height: "100%" }}>
                  <thead style={{
                    backgroundColor: "#ebe8fc", height: "5vh",
                    marginBottom: "10px", borderBottom: "1px solid gray"
                  }}>
                    <tr >
                      {PurchaseProductListHeader.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
                    </tr>
                  </thead>
                  <tbody style={{ borderCollapse: "collapse" }}>
                    {
                      purchaseProducts.map((item, index) => {
                        const onchangeProductDetail = (name, value) => { onchangeproductlist(index, name, value) }
                        return (
                          <div id="stock-data-container" onClick={() => { }} key={`${item?._id}-stock-list`} className="stock-batch-row" style={{ height: "5vh", marginBottom: "3vh", width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <Card require={true} value={purchaseProducts[index]?.pId} w="15%" h="35%" pd="1.3vh 0.1vw" m="0px" name={PURCHASEPRODUCTINFO.PRODUCTID} label="" onchange={onchangeProductDetail} type="select" options={productslist} />
                            {getQuantityInput(index, onchangeProductDetail)}
                            <Card require={true} value={purchaseProducts[index]?.free} w="5%" h="35%" pd="1.3vh 1vw" m="0px" ph="free" name={PURCHASEPRODUCTINFO.FREE} label="" onchange={onchangeProductDetail} type="number" />
                            <Card require={true} value={purchaseProducts[index]?.batch} w="10%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="Batch no." name={PURCHASEPRODUCTINFO.BATCH} label="" onchange={onchangeProductDetail} type="text" />
                            <Card require={true} value={purchaseProducts[index]?.expDate} w="12%" h="35%" pd="1.3vh 1vw" m="0px" fs="0.9rem" name={PURCHASEPRODUCTINFO.EXPDATE} label="" onchange={onchangeProductDetail} type="month" />
                            <Card require={true} value={purchaseProducts[index]?.mrp} w="5%" h="35%" pd="1.3vh 1vw" m="0px" ph="mrp" name={PURCHASEPRODUCTINFO.MRP} label="" onchange={onchangeProductDetail} type="text" />
                            <Card require={true} value={purchaseProducts[index]?.rate} w="5%" h="35%" pd="1.3vh 1vw" m="0px" ph="rate" name={PURCHASEPRODUCTINFO.RATE} label="" onchange={onchangeProductDetail} type="text" />
                            <Card require={true} value={purchaseProducts[index]?.schemeDisc} w="5%" h="35%" pd="1.3vh 1vw" m="0px" ph="rate" name={PURCHASEPRODUCTINFO.RATE} label="" onchange={onchangeProductDetail} type="text" />
                            <Card require={true} value={purchaseProducts[index]?.cashDisc} w="5%" h="35%" pd="1.3vh 1vw" m="0px" ph="rate" name={PURCHASEPRODUCTINFO.RATE} label="" onchange={onchangeProductDetail} type="text" />
                            <Card require={true} value={purchaseProducts[index]?.value} w="5%" h="35%" pd="1.3vh 1vw" m="0px" ph="rate" name={PURCHASEPRODUCTINFO.RATE} label="" onchange={onchangeProductDetail} type="text" />
                            <Card require={true} value={purchaseProducts[index]?.gst} w="5%" h="35%" pd="1.3vh 1vw" m="0px" ph="rate" name={PURCHASEPRODUCTINFO.RATE} label="" onchange={onchangeProductDetail} type="text" />
                            <Card require={true} value={purchaseProducts[index]?.netAmt} w="5%" h="35%" pd="1.3vh 1vw" m="0px" ph="rate" name={PURCHASEPRODUCTINFO.RATE} label="" onchange={onchangeProductDetail} type="text" />
                            <button onClick={() => deleteField(index)} tabIndex={-1} style={{ padding: "0px", fontSize: "1.5rem", textAlign: "left", minWidth: "2.5vw", cursor: "pointer", backgroundColor: "transparent", border: "none" }}>x</button>
                          </div>
                        )
                      })
                    }
                  </tbody>
                </table>
              </div> : <></>
          }
        </div>
        <div style={{ width: "30%", display: "flex", justifyContent: "space-around" }}>
          <button onClick={addPurchase} className="custom-input-fields" style={{ border: "none", backgroundColor: "#5e48e8", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>Submit</button>
          <button onClick={addField} style={{ border: "none", backgroundColor: "#8e7fef", fontSize: "1.2rem", cursor: "pointer", color: "#ffffff", height: "5vh", width: "9vw", borderRadius: "0.4vw" }}>Add field</button>
        </div>
      </div>
    </Layout>
  );
}

export default PurchaseAdd;