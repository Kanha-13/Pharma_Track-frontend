import { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import './index.css'
import { StateContext } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { ACTION } from "../../Store/constants";
import Message from "../../Components/Vendors/Message/Message";
import VendorList from "../../Components/Vendors/VendorList/VendorList";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";

const Vendors = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const { vendors, dispatch } = useContext(StateContext)

  const fetchallvendors = async () => {
    try {
      const res = await getVendors()
      dispatch(ACTION.SET_VENDORS, res)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onAddNewClick = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.VENDORS_ADD)
  }

  useEffect(() => {
    if (!vendors.length)
      fetchallvendors();
    setTimeout(() => {
      setLoading(false)
    }, 400);
  }, [])

  return (
    <Layout>
      {
        loading ? <Loading /> :
          <div id="vendor-container" className="layout-body">
            {
              vendors.length ? <VendorList vendors={vendors} onAdd={onAddNewClick} /> :
                <Message onAdd={onAddNewClick} />
            }
          </div>
      }
    </Layout>
  );
}
export default Vendors;