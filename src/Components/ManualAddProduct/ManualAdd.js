import { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { PRODUCT, productdetail } from "../../Schema/products";
import { addProdManually } from "../../apis/products";
import { StateContext } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { ACTION } from "../../Store/constants";

const ManualAdd = () => {
  const { vendors = [], dispatch } = useContext(StateContext)
  const [productDetail, setProductDetail] = useState(productdetail);
  const onchange = (name, value) => {
    setProductDetail({ ...productDetail, [name]: value })
  }

  const addProd = async (e) => {
    e.preventDefault();

    try {
      if (productDetail.category === "tablet")
        productDetail.stock = parseInt(productDetail.qnty) * parseInt(productDetail.pkg)
      else
        productDetail.stock = productDetail.qnty

      productDetail.qnty = productDetail.pkg
      const ress = await addProdManually(productDetail)
      e.target.reset()
      setProductDetail(productdetail)
      alert("Product added successfully 👍")
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const fetchallvendors = async () => {
    try {
      const res = await getVendors()
      console.log(res)
      dispatch(ACTION.SET_VENDORS, res)
    } catch (error) {
      alert("Something went wrong!")
    }
  }
  useEffect(() => {
    if (!vendors.length)
      fetchallvendors();
  }, [])

  return (
    <form onSubmit={addProd} className="layout-body" style={{
      border: "2px solid #D6D8E7", display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "3%", flexDirection: "column", flexWrap: "wrap", width: "100%", height: "100%", borderRadius: "0.8vw"
    }}>
      {/* <input type="" /> */}
      <Card focus={true} require={true} w="25%" h="4%" name={PRODUCT.ITEMNAME} label="Item Name" value={productDetail.itemName} onchange={onchange} type="text" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.COMPANY} label="Company Name" value={productDetail.company} onchange={onchange} type="text" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.CATEGORY} label="Category" value={productDetail.category} onchange={onchange} type="radio" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.MRP} label="MRP" value={productDetail.mrp} onchange={onchange} type="text" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.HSN} label="HSN / SAC" value={productDetail.hsn_sac} onchange={onchange} type="text" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.MNFDATE} label="Mnf Date" value={productDetail.mnfDate} onchange={onchange} type="month" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.EXPDATE} label="Exp Date" value={productDetail.expDate} onchange={onchange} type="month" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.PURDATE} label="Purchase Date" value={productDetail.purDate} onchange={onchange} type="date" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.PACKING} label="Packing" value={productDetail.pkg} onchange={onchange} type="number" productDetail={productDetail} />
      <Card require={true} w="25%" h="4%" name={PRODUCT.QNT} label="Quantity" value={productDetail.qnty} onchange={onchange} type="number" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.RATE} label="Rate" value={productDetail.rate} onchange={onchange} type="text" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.GST} label="GST" value={productDetail.gst} onchange={onchange} type="number" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.NETRATE} label="Net Rate" value={productDetail.netRate} onchange={onchange} type="text" productDetail={productDetail} />
      <Card require={true} w="25%" h="4%" name={PRODUCT.VENDOR} label="Vendor" value={productDetail.vendor} onchange={onchange} type="select" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.BILLNO} label="Bill Number" value={productDetail.billNo} onchange={onchange} type="text" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.BATCH} label="Batch Number" value={productDetail.batch} onchange={onchange} type="text" />
      <Card require={true} w="25%" h="4%" name={PRODUCT.LOCATION} label="Storage Location" value={productDetail.location} onchange={onchange} type="text" />
      <button type="submit" style={{
        color: "#ffffff", fontSize: "1.3em", textAlign: "center",
        backgroundColor: "#5E48E8", padding: "1.5% 1.5%", width: "28%",
        borderRadius: "0.8vw", margin: "1.5%", cursor: "pointer", outline: "none", border: "none"
      }}>
        Add Product
      </button>
    </form >
  );
}
export default ManualAdd;