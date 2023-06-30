import { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { useNavigate } from "react-router-dom";
import { ACTION } from "../../Store/constants";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'
import { PaymentTypesLits, PurchaseProductListHeader } from "../../Constants/Purchase";
import { PURCHASEBILLINFO, PURCHASEPRODUCTINFO, purchasebilldetail, purchaseproductdetail } from "../../Schema/purchase";
import { getAllProducts } from "../../apis/products";
import { addPurchaseDetial } from "../../apis/purchase";
import { calculateNetRate, checkIfMissingValues } from "../../utils/purchase";
import ProductAddForm from "../../Components/ProductAddForm/ProductAddForm";

const PurchaseAdd = () => {
  const { dispatch, vendors, products } = useStore();
  const navigate = useNavigate()
  const [purchaseBillDetail, setPurchaseBill] = useState(purchasebilldetail)
  const [purchaseProducts, setPurchaseProducts] = useState(Array.from({ length: 5 }, (_, index) => purchaseproductdetail))
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
      return { label: product.itemName, value: product._id, category: product.category }
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

  const getNet = (name, product, value) => {
    let prod = { ...product, [name]: value }
    let rate = prod.rate
    let cd = prod.cashDisc
    let sc = prod.schemeDisc
    let qnty = parseInt(prod.qnty)
    let free = parseInt(prod.free)
    let gst = product.gst

    let taxedAmt = (rate * gst / 100) * qnty
    let netDiscountedRate_perunit = (rate - rate * sc / 100) - (rate - rate * sc / 100) * cd / 100
    let total = ((netDiscountedRate_perunit * qnty) + taxedAmt)
    return {
      totalvalue: parseFloat(netDiscountedRate_perunit * qnty).toFixed(2),
      netamt: parseFloat(total).toFixed(2),
      netrateperunit: parseFloat(total / (qnty + free)).toFixed(2)
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
          else if (name === PURCHASEPRODUCTINFO.QNT || name === PURCHASEPRODUCTINFO.SC || name === PURCHASEPRODUCTINFO.RATE || name === PURCHASEPRODUCTINFO.CD || name === PURCHASEPRODUCTINFO.FREE) {
            let { totalvalue, netamt, netrateperunit } = getNet(name, purchaseProducts[index], value)
            return { ...detail, [name]: value, totalValue: totalvalue, netAmt: netamt, netRate: netrateperunit }
          }
          else if (name === PURCHASEPRODUCTINFO.GST)
            return detail
          else if (name === PURCHASEPRODUCTINFO.TOTAL_VALUE)
            return detail
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
  }

  const addPurchase = async () => {
    alert(purchaseProducts[0].netRate)
    try {
      const cleared_productlist = removeBlankRow(purchaseProducts)
      // const final_productlist = calculateNetRate(cleared_productlist)
      if (checkIfMissingValues(purchaseBillDetail, cleared_productlist))
        alert("No missing values allowed")
      else {
        const data = {
          billInfo: purchaseBillDetail,
          productsDetail: final_productlist
        }
        const res = await addPurchaseDetial(data)
        setPurchaseProducts(Array.from(({ length: 5 }, (_, index) => purchaseproductdetail)))
        setPurchaseBill(purchasebilldetail)
        alert("Pruchase updated successfully!")
        dispatch(ACTION.SET_STOCKS, [])
      }
    } catch (error) {
      console.log(error)
      alert("Unable to add purchase entry!")
    }
  }

  const addField = () => {
    setPurchaseProducts([...purchaseProducts, {}])
  }

  const deleteField = (index) => {
    setPurchaseProducts(purchaseProducts.filter((_, ind) => ind !== index))
  }

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
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", height: "15%", width: "100%" }}>
          <Card focus={true} require={true} value={purchaseBillDetail.vId} m="1.5% 0px" w="25%" h="15%" name={PURCHASEBILLINFO.VENDORID} label="Vendor Name" onchange={onchangeBillDetail} type="select" options={vendorslist} />
          <Card require={true} value={purchaseBillDetail.billNo} m="1.5% 1%" w="15%" h="15%" name={PURCHASEBILLINFO.BILLNUMBER} label="Bill No." onchange={onchangeBillDetail} type="text" />
          <Card require={true} value={purchaseBillDetail.purDate} m="1.5% 1%" w="15%" h="15%" name={PURCHASEBILLINFO.PURCHASEDATE} label="Purchase Date" onchange={onchangeBillDetail} type="date" />
          <Card require={true} value={purchaseBillDetail.paymentType} m="1.5% 1%" w="10%" h="15%" name={PURCHASEBILLINFO.PAYMENTTYPE} label="Payment Type" onchange={onchangeBillDetail} type="select" options={PaymentTypesLits} />
        </div>
        {
          purchaseProducts.length > 0 ?
            <ProductAddForm onSubmit={addPurchase} addField={addField} deleteField={deleteField} purchaseProducts={purchaseProducts} products={productslist} onChange={onchangeproductlist} /> : <></>
        }
      </div>
    </Layout>
  );
}

export default PurchaseAdd;