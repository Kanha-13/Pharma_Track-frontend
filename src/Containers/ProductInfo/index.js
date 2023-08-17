import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "../../Store/store";
import { deleteProduct, getProduct, udpateProduct } from "../../apis/products";
import { ROUTES } from "../../Constants/routes_frontend";
import { PRODUCT, productdetail } from "../../Schema/products";
import { validateUpdateRequest } from "../../utils/product";
import { ACTION } from "../../Store/constants";
import { ProductCategories, ProductParentCategories } from "../../Constants/productCategories";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'
import { CompanyListHeader } from "../../Constants/company";
import { getCompanyQuery } from "../../apis/company";
import ProductsList from "../../Components/ProductsList/ProductsList";
import KEY from "../../Constants/keyCode";

const ProductInfo = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const { dispatch, companies } = useStore();
  const [searchParams] = useSearchParams();
  const [deletePop, setDeletePop] = useState(0);
  const [productDetail, setProductDetail] = useState(productdetail);
  const [iscompList, setCompanylist] = useState(false)
  const [keyword, setkeyword] = useState("")

  const fetchCompanies = async (initials) => {
    try {
      const res = await getCompanyQuery(initials);
      dispatch(ACTION.SET_COMPANIES, res.data)
    } catch (error) {
      console.log(error)
      alert("unable to get companies!")
    }
  }

  const onchange = (name, value) => {
    if (name === "company") {
      setkeyword(value)
      return setCompanylist(true)
    }
    setProductDetail({ ...productDetail, [name]: value })
  }

  const fetchProduct = async (pId) => {
    try {
      const res = await getProduct(pId)
      setProductDetail(res || productdetail)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onDelete = async () => {
    try {
      const res = await deleteProduct(productDetail._id, productDetail)
      dispatch(ACTION.SET_PRODUCTS, [])
      alert("Product deleted successfully!")
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCTS)
    } catch (error) {
      alert("Unable to delete product!")
    }
  }
  const onUpdate = async () => {
    try {
      if (validateUpdateRequest(productDetail)) {
        const res = await udpateProduct(productDetail._id, productDetail)
        dispatch(ACTION.SET_PRODUCTS, [])
        alert("Product updated successfully!")
        if (location?.state?.callBackPath)
          navigate(location.state.callBackPath)
        else
          navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PRODUCTS)
      }
      else throw new Error("Fields should not be empty")
    } catch (error) {
      console.log(error)
      alert(error)
    }
  }

  const onclickcompany = (cId) => {
    try {
      setCompanylist(false)
      const comp = companies.filter((cmp) => cmp._id === cId)[0]
      setProductDetail({ ...productDetail, company: comp.companyName })
      setTimeout(() => {
        const tags = document.getElementsByName("category") || []
        if (tags[0])
          tags[0].focus()
      }, 100);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const pId = searchParams.get('id');
    fetchProduct(pId)
  }, [])
  const closeListModal = (event) => {
    if (event.keyCode === KEY.ESC) {
      setCompanylist((prev) => {
        if (prev) event.stopPropagation()
        return false
      });
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', closeListModal);
    return () => {
      document.removeEventListener('keydown', closeListModal);
    };
  }, [])
  return (
    <Layout>
      <div id="prodInfo-container" className="layout-body borderbox">
        {
          iscompList ? <ProductsList listName="companys" show={iscompList} mh="400%" h="100%" w="100%" onchange={fetchCompanies}
            onclick={onclickcompany} header={CompanyListHeader} data={companies} keyword={keyword} /> :
            <>
              <div style={{ width: "100%", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px" }}>
                <p style={{ margin: "0px", fontSize: "1.5em" }}>Product Detail</p>
              </div>
              <Card focus={true} require={true} w="25%" h="4%" name={PRODUCT.ITEMNAME} label="Item Name" value={productDetail.itemName} onchange={onchange} type="text" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.COMPANY} label="Company Name" value={productDetail.company} onchange={onchange} type="text" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.CATEGORY} label="Category" value={productDetail.category} onchange={onchange} type="select" options={ProductCategories} />
              <Card require={true} w="25%" h="4%" name={PRODUCT.PARENT_CATEGORY} label="Parent Cat." value={productDetail.parentCategory} onchange={onchange} type="select" options={ProductParentCategories} />
              <Card require={true} w="25%" h="4%" name={PRODUCT.HSN} label="HSN / SAC" value={productDetail.hsn_sac} onchange={onchange} type="text" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.PACKING} label="Packing" value={productDetail.pkg} onchange={onchange} type="text" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.GST} label="GST" value={productDetail.gst} onchange={onchange} type="number" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.LOCATION} label="Storage Location" value={productDetail.location} onchange={onchange} type="text" />
              <button id="submit-add-prod" className="custom-input-fields" onClick={onUpdate} type="submit">Update Product</button>
              <button id="submit-delete-prod" onClick={() => setDeletePop(1)} type="submit">Delete Product</button>
              {
                deletePop ?
                  <div id="delete-pop">
                    <div id="delete-pop-box">
                      <label >Do you really want to delete {productDetail.itemName}</label>
                      <button autoFocus={true} style={{ backgroundColor: "#3fc05e" }} onClick={() => setDeletePop(false)}>Cancel</button>
                      <button style={{ backgroundColor: "#ef3737" }} onClick={onDelete}>Delete</button>
                    </div>
                  </div> : <></>
              }
            </>
        }
      </div>
    </Layout>
  );
}
export default ProductInfo;