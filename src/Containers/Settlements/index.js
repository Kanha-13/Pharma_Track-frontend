import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { deleteSettlement, getSettlements } from "../../apis/settlement";

import './index.css'
import { SettlementsListHeader } from "../../Schema/settlement";
import ProductsList from "../../Components/ProductsList/ProductsList";
import SettlementDeleteModal from "../../Components/SettlementDeleteModal/SettlementDeleteModal";
import { useNavigate } from "react-router-dom";

const Settlements = () => {
  const navigate = useNavigate()
  const { settlements, dispatch } = useStore();
  const [settlementId, setSettlementsId] = useState("")
  const [settlementslist, setSettlementslist] = useState([])
  const [isModal, setModal] = useState(false)

  const fetchSettlements = async () => {
    try {
      let res = await getSettlements() || [];
      res = res.data.map((row) => {
        let product = row.productDetail[0]
        let vendor = row.vendorDetail[0]
        return {
          _id: row._id,
          itemName: product.itemName,
          batch: row.batch,
          mrp: row.mrp,
          expDate: row.expDate,
          vendorName: vendor.vendorName,
          returnQnty: row.returnQnty,
          type: row.type,
          status: row.status,
          date: row.date
        }
      })
      setSettlementslist(res)
      dispatch(ACTION.SET_SETTLEMENTS, res)
    } catch (error) {
      console.log(error)
      alert("unable to get settlements list!")
    }
  }

  const closeModal = () => {
    setSettlementsId("")
    setModal(false)
  }

  const openModal = (id) => {
    setSettlementsId(id)
    setModal(true)
  }

  const ondeleteSettlement = async (date, amtRefunded) => {
    setModal(false)
    try {
      await deleteSettlement(settlementId, date, amtRefunded)
      alert("settlement updated!")
      navigate(0)
    } catch (error) {
      console.log(error)
      alert("Unable to update settlement!")
    }
  }

  const onchange = (val) => {
    const filtered = settlements.filter((prod) => prod.itemName.includes((val).toUpperCase()))
    setSettlementslist(filtered)
  }

  useEffect(() => {
    if (settlements.length > 0) setSettlementslist(settlements)
    else fetchSettlements()
  }, [])

  return (
    <Layout>
      <div id="settlements-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Settlements</p>
        <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
          onclick={openModal} header={SettlementsListHeader} data={settlementslist} />
        {isModal ? <SettlementDeleteModal onDelete={ondeleteSettlement} oncancel={closeModal} /> : <></>}
      </div>
    </Layout>
  );
}
export default Settlements;