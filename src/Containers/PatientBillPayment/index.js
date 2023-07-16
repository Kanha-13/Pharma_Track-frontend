import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toddmmyy } from "../../utils/DateConverter";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";

import './index.css'
import { BillingHistoryListHeader } from "../../Constants/billing";
import BillPayCheckOut from "../../Components/VendorBillPay/BillPayCheckout";
import KEY from "../../Constants/keyCode";
import { billPayment, getBillingHistory } from "../../apis/billing";

const PatientBillpayment = () => {
  const navigate = useNavigate();
  const [billingLists, setBillings] = useState([])
  const [patientName, setPatientName] = useState("")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [checkAll, setCheckAll] = useState(false);
  const [checkedBills, setCheckedBills] = useState([])
  const [totalBalance, setTotalBal] = useState(0)
  const [totalPay, setTotalPay] = useState(0)
  const [remainingBal, setRemainingBal] = useState(0)
  const [isModal, setModal] = useState(false)


  const searchBills = async () => {
    setBillings([])
    try {
      if ((patientName && fromDate && toDate)) {
        const res = await getBillingHistory("", "", patientName, "", { from: fromDate, to: toDate }, true)
        if (!res.data?.length)
          alert("no records found")

        setBillings(res.data)
      } else {
        alert("All field are required to search billing history!")
      }
    } catch (error) {
      alert("Unable to get billing history")
      console.log(error)
    }
  }

  const getValue = (item, value) => {
    if (value === "billingDate")
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
      billingLists.map((bill) => {
        total += bill.amtDue
      })
      setCheckedBills(billingLists.map((bill) => bill._id))
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
        patientName: patientName,
        bills: checkedBills,
        paymentDetail: data,
      }
      const res = await billPayment(requestData)
      alert("Payment recorded successfully!")
      navigate(0);
    } catch (error) {
      console.log(error)
      alert("unable to process payment record!")
    }
  }

  useEffect(() => {
    let total = 0;
    billingLists.map((bill) => {
      total += bill.amtDue
    })
    setTotalBal(total)
    setRemainingBal(total)
  }, [billingLists])

  const openModal = (e) => {
    e.stopPropagation();
    if (checkedBills.length)
      setModal(true);
    else
      alert("No bill selected")
  }

  const closeModal = (event) => {
    if (event?.keyCode) {
      if (event.keyCode === KEY.ESC)
        setModal(false)
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
          <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left" }}>Credit Bill-Payment</p>
        </div>
        <div style={{ alignItems: "center", width: "100%", height: "90%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Card focus={true} require={true} w="20%" h="2vh" m="0px" pd="1.1vh 0.5vw" name="vId" label="Patient Name" value={patientName} onchange={(name, value) => setPatientName(value)} type="text" />
          <Card require={true} w="13%" h="2vh" pd="1.1vh 0.5vw" name="from" label="From" ph="From" value={fromDate} onchange={(name, value) => setFromDate(value)} type="month" />
          <Card require={true} w="13%" h="2vh" pd="1.1vh 0.5vw" name="to" label="To" ph="To" value={toDate} onchange={(name, value) => setToDate(value)} type="month" />
          <button className="custom-input-fields" onClick={searchBills} style={{ backgroundColor: "#5E48E8", border: "none", fontSize: "1rem", color: "#ffffff", borderRadius: "0.5vw", height: "4vh", width: "5vw", cursor: "pointer" }}>Search</button>

          <div style={{ width: "100%", height: "100%" }}>
            <table style={{ height: "5vh", width: "100%", borderCollapse: "collapse" }}>
              <thead style={{
                backgroundColor: "#ebe8fc", height: "5vh",
                marginBottom: "10px", borderBottom: "1px solid gray"
              }}>
                <tr >
                  {BillingHistoryListHeader.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
                  <th>Select All <input type="checkbox" onClick={oncheckAll} style={{ width: "2.5vh", height: "2.5vh" }} /></th>
                </tr>
              </thead>
            </table>
            {
              billingLists.length > 0 ?
                <div style={{ width: "100%", maxHeight: "65vh", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody style={{ borderCollapse: "collapse" }}>
                      {
                        billingLists.map((item, index) => {
                          return (
                            <tr id={`purchase-history-row${item._id}`} onClick={() => onEnter(item._id)} key={`${item._id}-stock-list`} className="purchase-history-row" style={{ height: "5vh", marginBottom: "3vh" }}>
                              {
                                BillingHistoryListHeader.map((head) => <td key={head.name + "in-choose-batch-row"} style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
                              }
                              <td><input type="checkbox" className="check-bill-pay" onClick={(e) => onchekOne(e, item._id, item.amtDue)} style={{ width: "2.5vh", height: "2.5vh" }} /></td>
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
        {isModal && <BillPayCheckOut oncancel={closeModal} billType={"CREDIT"} onsubmit={submitPayment} />}
      </div>
    </Layout>
  );
}

export default PatientBillpayment;