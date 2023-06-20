import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProduct, udpateProduct } from "../../apis/products";
import { ROUTES } from "../../Constants/routes_frontend";
import { PRODUCT, productdetail } from "../../Schema/products";
import { validateUpdateRequest } from "../../utils/product";

import Layout from "../../Components/Layout/Layout";

import './index.css'
import Card from "../../Components/ManualAddProduct/Card";
import { PRODUCT_CATEGORY } from "../../Constants/productCategories";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";

const ProductInfo = () => {
  const navigate = useNavigate()
  const { dispatch } = useStore();
  const [searchParams] = useSearchParams();
  const [productDetail, setProductDetail] = useState(productdetail);

  const onchange = (name, value) => {
    setProductDetail({ ...productDetail, [name]: value })
  }

  const fetchProduct = async (pId) => {
    try {
      const res = await getProduct(pId)
      setProductDetail(res)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onUpdate = async () => {
    try {
      if (validateUpdateRequest(productDetail)) {
        const res = await udpateProduct(productDetail._id, productDetail)
        dispatch(ACTION.SET_PRODUCTS, [])
        alert("Product updated successfully!")
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCTS)
      }
      else throw new Error("Fields should not be empty")
    } catch (error) {
      console.log(error)
    }
  }

  const getCategoriesOption = () => {
    const keys = Object.keys(PRODUCT_CATEGORY)
    return keys.map((key) => {
      return { name: key, value: PRODUCT_CATEGORY[key] };
    })
  }

  useEffect(() => {
    const pId = searchParams.get('id');
    fetchProduct(pId)
  }, [])

  return (
    <Layout>
      <div id="prodInfo-container" className="layout-body borderbox">
        <div style={{ width: "93%", marginLeft: "1.5vw", paddingLeft: "2vw", borderBottom: "1px solid gray", paddingBottom: "5px" }}>
          <p style={{ margin: "0px", fontSize: "1.5em" }}>Product Detail</p>
        </div>
        <Card focus={true} require={true} w="25%" h="4%" name={PRODUCT.ITEMNAME} label="Item Name" value={productDetail.itemName} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.COMPANY} label="Company Name" value={productDetail.company} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.CATEGORY} label="Category" value={productDetail.category} onchange={onchange} type="select" options={getCategoriesOption()} />
        <Card require={true} w="25%" h="4%" name={PRODUCT.HSN} label="HSN / SAC" value={productDetail.hsn_sac} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.PACKING} label="Packing" value={productDetail.pkg} onchange={onchange} type="number" productDetail={productDetail} />
        <Card require={true} w="25%" h="4%" name={PRODUCT.GST} label="GST" value={productDetail.gst} onchange={onchange} type="number" />
        <Card require={true} w="25%" h="4%" name={PRODUCT.LOCATION} label="Storage Location" value={productDetail.location} onchange={onchange} type="text" />
        <button id="submit-add-prod" className="custom-input-fields" onClick={onUpdate} type="submit">Update Product</button>
      </div>
    </Layout>
  );
}
export default ProductInfo;