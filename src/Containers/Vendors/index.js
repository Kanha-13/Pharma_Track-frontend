import { useContext, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import './index.css'
import { StateContext } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { ACTION } from "../../Store/constants";

const Vendors = () => {
  const { vendors, dispatch } = useContext(StateContext)
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
    fetchallvendors();
  }, [])
  return (
    <Layout>
      <div id="vendor-container" className="layout-body">
        <p>Hello</p>
        <p>Bye</p>

      </div>
    </Layout>
  );
}
export default Vendors;