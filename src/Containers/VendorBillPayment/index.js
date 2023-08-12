import { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import { getVendors } from "../../apis/vendors";
import { ACTION } from "../../Store/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { getPurchases, purchaseBillPayment } from "../../apis/purchase";
import { PurchaseHistoryListHeader } from "../../Constants/Purchase";
import { toddmmyy } from "../../utils/DateConverter";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'
import { BILLTYPES } from "../../Constants/billing";
import BillPayCheckOut from "../../Components/VendorBillPay/BillPayCheckout";
import KEY from "../../Constants/keyCode";
import InputDate from "../../Components/CustomDateInput/DateInput";

const VendorBillPayment = () => {
  const { vendors, dispatch } = useStore();
  const navigate = useNavigate();
  const [purchaseLists, setPurchases] = useState([])
  const [vendorIdToSearch, setVendorIdToSearch] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [vendorslist, setVendorlist] = useState([])
  const [billType, setBillType] = useState("")
  const [checkAll, setCheckAll] = useState(false);
  const [checkedBills, setCheckedBills] = useState([])
  const [totalBalance, setTotalBal] = useState(0)
  const [totalPay, setTotalPay] = useState(0)
  const [remainingBal, setRemainingBal] = useState(0)
  const [isModal, setModal] = useState(false)

  const formatevendorslist = (vendorss) => {
    const vendorsoption = vendorss.map((vendor) => {
      return { label: vendor.vendorName, value: vendor._id }
    })
    setVendorlist([{ label: "Select Vendor", value: "" }, ...vendorsoption])
  }

  const fetchVendorsList = async () => {
    try {
      const res = await getVendors();
      formatevendorslist(res.data)
      dispatch(ACTION.SET_VENDORS, res.data)
    } catch (error) {
      alert("Unable to get vendors list!")
    }
  }

  const searchPurchaseHistory = async () => {
    setPurchases([])
    try {
      if ((vendorIdToSearch && billType) || (fromDate && toDate)) {
        const res = await getPurchases(vendorIdToSearch, null, { from: fromDate, to: toDate }, billType)
        if (!res.data?.length)
          alert("no records found")

        setPurchases(res.data)
      } else {
        alert("At least one field is required to search purchase history!")
      }
    } catch (error) {
      alert("Unable to get purchase history")
      console.log(error)
    }
  }

  const getValue = (item, value) => {
    if (value === "purDate")
      return toddmmyy(item[value])
    else
      return item[value]
  }

  const onEnter = (id) => {
    // navigate(ROUTES.PROTECTED_ROUTER + ROUTES.PURCHASE_INFO + `id=${id}`)
  }

  const oncheckAll = () => {
    let checkboxes = document.getElementsByClassName('check-bill-pay');
    for (let checkbox of checkboxes) {
      checkbox.checked = !checkAll;
    }
    setCheckAll(!checkAll)

    if (!checkAll) {
      let total = 0;
      purchaseLists.map((bill) => {
        total += bill.totalAmt
      })
      setCheckedBills(purchaseLists.map((bill) => bill._id))
      setTotalPay(total)
      setRemainingBal(0)
    }
    else {
      setTotalPay(0)
      setRemainingBal(totalBalance)
      setCheckedBills([])
    }
  }

  const onchekOne = (e, billId, amt) => {
    let pay = 0;
    if (e.target.checked) {
      pay = totalPay + amt
      setCheckedBills([...checkedBills, billId])
    } else {
      pay = totalPay - amt
      setCheckedBills(checkedBills.filter((bill) => bill._id !== billId))
    }
    setTotalPay(pay)
    setRemainingBal(totalBalance - pay)
  }

  const submitPayment = async (data) => {
    closeModal();
    data.amtPaid = totalPay;
    try {
      const requestData = {
        vId: vendorIdToSearch,
        bills: checkedBills,
        paymentDetail: data,
        billType: billType,
      }
      const res = await purchaseBillPayment(requestData)
      alert("Payment recorded successfully!")
      navigate(0);
    } catch (error) {
      console.log(error)
      alert("unable to process payment record!")
    }
  }

  useEffect(() => {
    let total = 0;
    purchaseLists.map((bill) => {
      total += bill.totalAmt
    })
    setTotalBal(total)
    setRemainingBal(total)
  }, [purchaseLists])

  useEffect(() => {
    if (vendors.length) { formatevendorslist(vendors) }
    else fetchVendorsList();
  }, [])

  const openModal = (e) => {
    e.stopPropagation();
    if (checkedBills.length)
      setModal(true);
    else
      alert("No bill selected")
  }

  const closeModal = (event) => {
    if (event?.keyCode) {
      if (event.keyCode === KEY.ESC) {
        setModal((prev) => {
          if (prev) event.stopPropagation()
          return false
        })
      }
    }
    else // if the method is called directly by some other function
      setModal(false)
  }

  useEffect(() => {
    document.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('click', closeModal);
      document.removeEventListener('keydown', closeModal);
    };
  }, [])
  return (
    <Layout>
      <div id="products-container" className="layout-body borderbox">
        <div style={{ width: "100%", height: "5vh", borderBottom: "2px solid #D6D8E7", paddingBottom: "0px", display: "flex", marginBottom: "2vh" }}>
          <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left" }}>Vendor Bill-Payment</p>
        </div>
        <div style={{ alignItems: "center", width: "100%", height: "90%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Card focus={true} require={true} w="20%" h="2vh" m="0px" pd="1.1vh 0.5vw" name="vId" label="" value={vendorIdToSearch} onchange={(name, value) => setVendorIdToSearch(value)} type="select" options={vendorslist} />
          <Card require={true} w="15%" h="2vh" pd="1.1vh 0.5vw" name="billType" label="" ph="Bill Type" value={billType} onchange={(name, value) => setBillType(value)} type="select" options={BILLTYPES} />
          <InputDate require={true} w="13%" h="2vh" pd="1.1vh 0.5vw" name="from" label="From" ph="From" value={fromDate} onchange={(name, value) => setFromDate(value)} type="month" />
          <InputDate require={true} w="13%" h="2vh" pd="1.1vh 0.5vw" name="to" label="To" ph="To" value={toDate} onchange={(name, value) => setToDate(value)} type="month" />
          <button className="custom-input-fields" onClick={searchPurchaseHistory} style={{ backgroundColor: "#5E48E8", border: "none", fontSize: "1rem", color: "#ffffff", borderRadius: "0.5vw", height: "4vh", width: "5vw", cursor: "pointer" }}>Search</button>

          <div style={{ width: "100%", height: "100%" }}>
            <table style={{ height: "5vh", width: "100%", borderCollapse: "collapse" }}>
              <thead style={{
                backgroundColor: "#ebe8fc", height: "5vh",
                marginBottom: "10px", borderBottom: "1px solid gray"
              }}>
                <tr >
                  {PurchaseHistoryListHeader.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
                  <th>Select All <input type="checkbox" onClick={oncheckAll} style={{ width: "2.5vh", height: "2.5vh" }} /></th>
                </tr>
              </thead>
            </table>
            {
              purchaseLists.length > 0 ?
                <div style={{ width: "100%", maxHeight: "65vh", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody style={{ borderCollapse: "collapse" }}>
                      {
                        purchaseLists.map((item, index) => {
                          return (
                            <tr id={`purchase-history-row${item._id}`} onClick={() => onEnter(item._id)} key={`${item._id}-stock-list`} className="purchase-history-row" style={{ height: "5vh", marginBottom: "3vh" }}>
                              {
                                PurchaseHistoryListHeader.map((head) => <td key={head.name + "in-choose-batch-row"} style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
                              }
                              <td><input type="checkbox" className="check-bill-pay" onClick={(e) => onchekOne(e, item._id, item.totalAmt)} style={{ width: "2.5vh", height: "2.5vh" }} /></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div> : <></>
            }
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ width: "20%", border: "1px solid #5e48e8", padding: "0.8% 2%", borderRadius: "0.4vw" }}>Total Balance: {totalBalance}</p>
          <p style={{ width: "20%", border: "1px solid #5e48e8", padding: "0.8% 2%", borderRadius: "0.4vw" }}>Total Pay: {totalPay}</p>
          <p style={{ width: "20%", border: "1px solid #5e48e8", padding: "0.8% 2%", borderRadius: "0.4vw" }}>Remaining Balance: {remainingBal}</p>
          <button onClick={openModal} style={{ cursor: "pointer", width: "10vw", height: "5vh", border: "none", borderRadius: "0.4vw", backgroundColor: "#5e48e8", color: "#ffffff", fontSize: "1rem" }}>Pay</button>
        </div>
        {isModal && <BillPayCheckOut oncancel={closeModal} billType={billType} onsubmit={submitPayment} />}
      </div>
    </Layout>
  );
}

export default VendorBillPayment;