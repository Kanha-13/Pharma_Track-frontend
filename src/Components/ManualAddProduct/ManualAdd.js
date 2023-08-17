import { useEffect, useState } from "react";
import { PRODUCT, productdetail } from "../../Schema/products";
import { addProdManually } from "../../apis/products";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { ProductCategories, ProductParentCategories } from "../../Constants/productCategories";
import { getCompanies, getCompanyQuery } from "../../apis/company";

import Layout from "../Layout/Layout";
import Card from "./Card";

import './manualadd.css'
import './card.css'
import { ROUTES } from "../../Constants/routes_frontend";
import KEY from "../../Constants/keyCode";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../utils/useLocalStorage";
import ProductsList from "../ProductsList/ProductsList";
import { CompanyListHeader } from "../../Constants/company";

const ManualAdd = () => {
  const { dispatch, companies } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [storedValue, setValue] = useLocalStorage("pendingProductAdd")
  const [productDetail, setProductDetail] = useState(productdetail);
  const [iscompList, setCompanylist] = useState(false)
  const [keyword, setkeyword] = useState("")

  const onchange = (name, value) => {
    if (name === "company") {
      setkeyword(value)
      return setCompanylist(true)
    }
    setProductDetail({ ...productDetail, [name]: value })
    setValue({ ...productDetail, [name]: value })
  }

  const addProd = async (e) => {
    e.preventDefault();
    try {
      const res = await addProdManually(productDetail)
      setValue(null)
      setProductDetail(productdetail)
      dispatch(ACTION.SET_PRODUCTS, [])
      alert("Product added successfully 👍")
      if (location?.state?.callBackPath)
        navigate(location.state.callBackPath)
      window.location.reload()
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const fetchCompanies = async (initials) => {
    try {
      const res = await getCompanyQuery(initials);
      dispatch(ACTION.SET_COMPANIES, res.data)
    } catch (error) {
      console.log(error)
      alert("unable to get companies!")
    }
  }

  const onclickcompany = (cId) => {
    try {
      setCompanylist(false)
      const comp = companies.filter((cmp) => cmp._id === cId)[0]
      setProductDetail({ ...productDetail, company: comp.companyName })
      setValue({ ...productDetail, company: comp.companyName })
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
    if (storedValue)
      setProductDetail(storedValue)
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
      <div id="manualadd-prod-container" className="layout-body borderbox" >
        {
          iscompList ? <ProductsList listName="companys" show={iscompList} mh="400%" h="100%" w="100%" onchange={fetchCompanies}
            onclick={onclickcompany} header={CompanyListHeader} data={companies} keyword={keyword} /> :
            <>
              <div style={{ width: "100%", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px" }}>
                <p style={{ margin: "0px", fontSize: "1.5em" }}>Add Product</p>
              </div>
              <Card focus={true} require={true} w="25%" h="4%" name={PRODUCT.ITEMNAME} label="Item Name" value={productDetail.itemName} onchange={onchange} type="text" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.COMPANY} label="Company Name" value={productDetail.company} onchange={onchange} type="text" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.CATEGORY} label="Category" value={productDetail.category} onchange={onchange} type="select" options={ProductCategories} />
              <Card require={true} w="25%" h="4%" name={PRODUCT.PARENT_CATEGORY} label="Parent Cat." value={productDetail.parentCategory} onchange={onchange} type="select" options={ProductParentCategories} />
              <Card require={true} w="25%" h="4%" name={PRODUCT.HSN} label="HSN / SAC" value={productDetail.hsn_sac} onchange={onchange} type="text" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.PACKING} label="Packing" value={productDetail.pkg} onchange={onchange} type="text" />
              <Card require={true} w="25%" h="4%" name={PRODUCT.GST} label="GST" value={productDetail.gst} onchange={onchange} type="text" />
              <Card require={false} w="25%" h="4%" name={PRODUCT.LOCATION} label="Storage Location" value={productDetail.location} onchange={onchange} type="text" />
              <button id="submit-add-prod" className="custom-input-fields" onClick={addProd} type="submit">Add Product</button>
            </>
        }
      </div >
    </Layout>
  );
}
export default ManualAdd;