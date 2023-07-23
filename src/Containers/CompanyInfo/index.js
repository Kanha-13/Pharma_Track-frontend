import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "../../Store/store";
import { ROUTES } from "../../Constants/routes_frontend";
import { validateUpdateRequest } from "../../utils/vendor";
import { ACTION } from "../../Store/constants";
import { COMPANY, companydetail } from "../../Schema/company";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'
import { deleteCompany, getCompany, updateCompany } from "../../apis/company";

const CompanyInfo = () => {
  const navigate = useNavigate()
  const { dispatch } = useStore();
  const [searchParams] = useSearchParams();
  const [deletePop, setDeletePop] = useState(0);
  const [companyDetail, setCompanyDetail] = useState(companydetail);
  const [disableBtn,setDisableBtn] = useState(false)

  const onchange = (name, value) => {
    setCompanyDetail({ ...companyDetail, [name]: value })
  }

  const fetchCompany = async (cId) => {
    try {
      const res = await getCompany(cId)
      setCompanyDetail(res.data)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onDelete = async () => {
    setDisableBtn(true)
    try {
      const res = await deleteCompany(companyDetail._id)
      dispatch(ACTION.SET_COMPANIES, [])
      alert("Company deleted successfully!")
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.COMPANY)
    } catch (error) {
      setDisableBtn(false)
      alert("Unable to delete company!")
    }
  }
  
  const onUpdate = async () => {
    setDisableBtn(true)
    try {
      if (validateUpdateRequest(companyDetail)) {
        const res = await updateCompany(companyDetail._id, companyDetail)
        dispatch(ACTION.SET_COMPANIES, [])
        alert("Company updated successfully!")
        navigate(ROUTES.PROTECTED_ROUTER + ROUTES.COMPANY)
      }
      else throw new Error("Fields should not be empty")
    } catch (error) {
      setDisableBtn(false)
      console.log(error)
    }
  }

  useEffect(() => {
    const cId = searchParams.get('id');
    fetchCompany(cId)
  }, [])

  return (
    <Layout>
      <div id="companyInfo-container" className="layout-body borderbox">
        <div style={{ width: "100%", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px" }}>
          <p style={{ margin: "0px", fontSize: "1.5em" }}>Company Detail</p>
        </div>
        <Card focus={true} require={true} w="25%" h="4%" name={COMPANY.COMPANY_NAME} label="Company Name" value={companyDetail.companyName} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={COMPANY.COMPANY_ADDRESS} label="Address" value={companyDetail.address} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" name={COMPANY.COMPANY_MOBILE} label="Mobile No." value={companyDetail.mobileNo} onchange={onchange} type="text" />
        <Card require={true} w="25%" h="4%" onchange={onchange} label='GST number' name='gstNo' type='text' value={companyDetail.gstNo} />
        <Card require={true} w="25%" h="4%" onchange={onchange} label='Licence number' name='licenceNo' type='text' value={companyDetail.licenceNo} />
        <button disabled={disableBtn} id="submit-add-prod" className="custom-input-fields" onClick={onUpdate} type="submit">Update Detail</button>
        <button disabled={disableBtn} id="submit-delete-comp" onClick={() => setDeletePop(1)} type="submit">Delete Company</button>
        {
          deletePop ?
            <div id="delete-pop">
              <div id="delete-pop-box">
                <label >Do you really want to delete {companyDetail.itemName}</label>
                <button autoFocus={true} style={{ backgroundColor: "#4de671" }} onClick={() => setDeletePop(false)}>Cancel</button>
                <button style={{ backgroundColor: "#ff4343" }} onClick={onDelete}>Delete</button>
              </div>
            </div> : <></>
        }
      </div>
    </Layout>
  );
}
export default CompanyInfo;