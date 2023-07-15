import { useEffect, useState } from "react";
import { PRODUCT, productdetail } from "../../Schema/products";
import { addProdManually } from "../../apis/products";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { ProductCategories, ProductParentCategories } from "../../Constants/productCategories";
import { getCompanies } from "../../apis/company";

import Layout from "../Layout/Layout";
import Card from "./Card";

import './manualadd.css'
import './card.css'

const ManualAdd = () => {
  const { dispatch, companies } = useStore();
  const [productDetail, setProductDetail] = useState(productdetail);
  const [companieslist, setCompanieslist] = useState([])

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

  const formatCompanieslist = (companies) => {
    let comp = [{ label: "Select Company", value: "" }];
    companies.map((company) => {
      comp.push({ label: company.companyName, value: company.companyName })
    })
    setCompanieslist(comp)
  }

  const fetchCompanies = async () => {
    try {
      const res = await getCompanies();
      formatCompanieslist(res.data)
      dispatch(ACTION.SET_COMPANIES, res.data)
    } catch (error) {
      console.log(error)
      alert("unable to get companies!")
    }
  }

  useEffect(() => {
    if (!companies.length)
      fetchCompanies()
    else
      formatCompanieslist(companies)
  }, [])

  return (
    <Layout>
      <div id="manualadd-prod-container" className="layout-body borderbox" >
        <div style={{ width: "100%", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px" }}>
          <p style={{ margin: "0px", fontSize: "1.5em" }}>Add Product</p>
        </div>
        <Card focus={true} require={true} w="25%" h="4%" name={PRODUCT.ITEMNAME} label="Item Name" value={productDetail.itemName} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.COMPANY} label="Company Name" value={productDetail.company} onchange={onchange} type="select" options={companieslist} />
        <Card require={true} w="25%" h="4%" name={PRODUCT.CATEGORY} label="Category" value={productDetail.category} onchange={onchange} type="select" options={ProductCategories} />
        <Card require={true} w="25%" h="4%" name={PRODUCT.PARENT_CATEGORY} label="Parent Cat." value={productDetail.parentCategory} onchange={onchange} type="select" options={ProductParentCategories} />
        <Card require={true} w="25%" h="4%" name={PRODUCT.HSN} label="HSN / SAC" value={productDetail.hsn_sac} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.PACKING} label="Packing" value={productDetail.pkg} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.GST} label="GST" value={productDetail.gst} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.LOCATION} label="Storage Location" value={productDetail.location} onchange={onchange} type="text" />
        <button id="submit-add-prod" className="custom-input-fields" onClick={addProd} type="submit">Add Product</button>
      </div >
    </Layout>
  );
}
export default ManualAdd;