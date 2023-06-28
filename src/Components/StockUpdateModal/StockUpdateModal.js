import { useEffect, useState } from "react";
import { STOCK } from "../../Schema/stock";
import Card from "../ManualAddProduct/Card";
import { useStore } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { getyyyymm } from "../../utils/DateConverter";
import { ACTION } from "../../Store/constants";

const StockUpdateModal = ({ oncancel, onupdate, ondelete, info }) => {
  const { dispatch, vendors } = useStore();
  const [vendorslist, setvendors] = useState([])
  const [stockInfo, setStock] = useState(info)
  const [deletePop, setDeletePop] = useState(false)

  const onDelete = () => {
    ondelete(stockInfo._id)
  }

  const onUpdate = () => {
    onupdate(stockInfo)
  }

  const onCancel = () => {
    oncancel()
  }

  const onchange = (name, value) => {
    setStock({ ...stockInfo, [name]: value })
  }

  const formatvendors = (vendorss = []) => {
    const format = vendorss.map((vendor) => {
      return { label: vendor.vendorName, value: vendor._id }
    })
    setvendors([{ label: "Select vendor", value: "" }, ...format]);
  }

  const fetchVendors = async () => {
    try {
      const res = await getVendors();
      formatvendors(res.data)
      dispatch(ACTION.SET_VENDORS, res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (vendors.length < 1)
      fetchVendors()
    else
      formatvendors(vendors)
  }, [])
  return (
    <div style={{ position: "absolute", width: "91%", height: "81%", backgroundColor: "#ffffff", borderRadius: "0.4vw", top: "12.5vh", left: "4.2vw", display: "flex", flexWrap: "wrap" }}>
      <Card focus={true} require={true} w="25%" h="4%" name={STOCK.BATCH} label="Batch" value={stockInfo.batch} onchange={onchange} type="text" />
      <Card require={true} w="25%" h="4%" name={STOCK.EXPDATE} label="Exp. Date" value={getyyyymm(stockInfo.expDate)} onchange={onchange} type="month" />
      <Card require={true} w="25%" h="4%" name={STOCK.QNT} label="Qnty." value={stockInfo.qnty} onchange={() => { }} type="text" />
      <Card require={true} w="25%" h="4%" name={STOCK.MINQNTY} label="Min Qnty." value={stockInfo.minQnty} onchange={onchange} type="number" />
      <Card require={false} w="25%" h="4%" name={STOCK.VID} label="Vendor" value={stockInfo.vId} onchange={onchange} type="select" options={vendorslist} />
      <button style={{ height: "8vh" }} id="submit-add-prod" className="custom-input-fields" onClick={onUpdate} type="submit">Update Stock</button>
      <button style={{ height: "8vh", backgroundColor: "#acabb4" }} id="submit-add-prod" onClick={onCancel} type="submit">Cancel</button>
      <button style={{ height: "8vh" }} id="submit-delete-prod" onClick={() => setDeletePop(1)} type="submit">Delete Product</button>
      {
        deletePop ?
          <div id="delete-pop">
            <div id="delete-pop-box">
              <label >Do you really want to delete this stock?</label>
              <button autoFocus={true} style={{ backgroundColor: "#3fc05e" }} onClick={() => setDeletePop(false)}>Cancel</button>
              <button style={{ backgroundColor: "#ef3737" }} onClick={onDelete}>Delete</button>
            </div>
          </div> : <></>
      }
    </div>
  );
}
export default StockUpdateModal;