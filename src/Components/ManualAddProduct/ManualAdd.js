import { useState } from "react";
import { PRODUCT, productdetail } from "../../Schema/products";
import { addProdManually } from "../../apis/products";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { ProductCategories } from "../../Constants/productCategories";

import Layout from "../Layout/Layout";
import Card from "./Card";

import './manualadd.css'
import './card.css'

const ManualAdd = () => {
  const { dispatch } = useStore();
  const [productDetail, setProductDetail] = useState(productdetail);
  const onchange = (name, value) => {
    setProductDetail({ ...productDetail, [name]: value })
  }

  const addProd = async (e) => {
    e.preventDefault();
    try {
      const res = await addProdManually(productDetail)
      setProductDetail(productdetail)
      dispatch(ACTION.SET_PRODUCTS, [])
      alert("Product added successfully 👍")
      window.location.reload()
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  return (
    <Layout>
      <div id="manualadd-prod-container" className="layout-body borderbox" >
        <div style={{ width: "93%", marginLeft: "1.5vw", paddingLeft: "2vw", borderBottom: "1px solid gray", paddingBottom: "5px" }}>
          <p style={{ margin: "0px", fontSize: "1.5em" }}>Add Product</p>
        </div>
        <Card focus={true} require={true} w="25%" h="4%" name={PRODUCT.ITEMNAME} label="Item Name" value={productDetail.itemName} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.COMPANY} label="Company Name" value={productDetail.company} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.CATEGORY} label="Category" value={productDetail.category} onchange={onchange} type="select" options={ProductCategories} />
        <Card require={true} w="25%" h="4%" name={PRODUCT.HSN} label="HSN / SAC" value={productDetail.hsn_sac} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.PACKING} label="Packing" value={productDetail.pkg} onchange={onchange} type="text"/>
        <Card require={true} w="25%" h="4%" name={PRODUCT.GST} label="GST" value={productDetail.gst} onchange={onchange} type="number" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.LOCATION} label="Storage Location" value={productDetail.location} onchange={onchange} type="text" />
        <button id="submit-add-prod" className="custom-input-fields" onClick={addProd} type="submit">Add Product</button>
      </div >
    </Layout>
  );
}
export default ManualAdd;