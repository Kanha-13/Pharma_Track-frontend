import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toddmmyy } from "../../utils/DateConverter";
import { ROUTES } from "../../Constants/routes_frontend";
import { getBillingHistory, getCNHistory } from "../../apis/billing";
import { BillingHistoryListHeader, CNHistoryListHeader } from "../../Constants/billing";

import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";
import KEY from "../../Constants/keyCode";

import "./index.css"
import InputDate from "../../Components/CustomDateInput/DateInput";

const BillingHistory = () => {
  const navigate = useNavigate()
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [invoiceNo, setInvoiceNo] = useState("")
  const [patientName, setPatientName] = useState("")
  const [mobileNumber, setMobileNo] = useState("")
  const [prescribedBy, setPrescribedBy] = useState("")
  const [currentIndex, setIndex] = useState()
  const [tableHeaders, setHeaders] = useState([])
  const [dataList, setDataList] = useState([])
  const [title, setTitle] = useState("")
  const [isCN, setIsCN] = useState(0)

  const searchSaleHistory = async () => {
    setDataList([])
    try {
      if (patientName || invoiceNo || mobileNumber || prescribedBy || (fromDate && toDate)) {
        let res;
        if (isCN)
          res = await getCNHistory(mobileNumber, invoiceNo, patientName, prescribedBy, { from: fromDate, to: toDate })
        else
          res = await getBillingHistory(mobileNumber, invoiceNo, patientName, prescribedBy, { from: fromDate, to: toDate }, false)

        if (!res.data?.length)
          alert("No records found")

        setDataList(res.data)
      } else {
        alert("At least one field is required to search purchase history!")
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

  const getBg = (name, item) => {
    if (name === "Status" && item.status === "REFUNDED") return "#c3d6ff"
    else if (name === "Status" && item.status === "PENDING") return "#ffecc8"
    else return ""
  }
  const getTextAlign = (name) => {
    if (name === "Status") return "center"
    else return "left"
  }
  const getBRadius = (name) => {
    if (name === "Status") return "0.5vw"
    else return "0px"
  }

  const onEnter = (id) => {
    if (isCN)
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.BILLING_CN_INFO + `id=${id}`)
    else
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.BILLING_INFO + `id=${id}`)
  }

  const handleKeyDown = (event) => {
    if ((currentIndex || currentIndex === 0) && dataList.length)
      switch (event.keyCode) {
        case KEY.ARROW_DOWN:
          event.preventDefault();
          if (currentIndex < dataList.length - 1)
            return setIndex(prev => prev + 1)
          break;
        case KEY.ARROW_UP:
          event.preventDefault();
          if (currentIndex > 0)
            return setIndex(prev => prev - 1)
          break
        case KEY.ENTER:
          event.preventDefault();
          return onEnter(dataList[currentIndex]?._id)
        default:
          break;
      }
    else
      setIndex(0)
  };

  useEffect(() => {
    if (window.location.pathname.includes("creditnote")) {
      setHeaders(CNHistoryListHeader)
      setTitle("CN History")
      setIsCN(1)
    }
    else {
      setHeaders(BillingHistoryListHeader)
      setTitle("Billing History")
    }
  }, [])

  return (
    <Layout>
      <div id="billingHistory-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "1vh" }}>{title}</p>
        <div style={{ alignItems: "center", width: "100%", height: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Card focus={true} require={true} m="1.5% 0px" w="15%" h="2vh" pd="1.1vh 0.5vw" name="patientName" label="" ph="Patient Name" value={patientName} onchange={(name, value) => { setIndex(null); setPatientName(value) }} type="text" />
          <Card require={true} m="1.5% 0.5%" w="10%" h="2vh" pd="1.1vh 0.5vw" name="invoiceNo" label="" ph="Invoice no." value={invoiceNo} onchange={(name, value) => { setIndex(null); setInvoiceNo(value) }} type="text" />
          <Card require={true} m="1.5% 0.5%" w="10%" h="2vh" pd="1.1vh 0.5vw" name="mobileNumber" label="" ph="Mobile no." value={mobileNumber} onchange={(name, value) => { setIndex(null); setMobileNo(value) }} type="text" />
          <Card require={true} m="1.5% 0.5%" w="10%" h="2vh" pd="1.1vh 0.5vw" name="prescribedBy" label="" ph="Prescribed By" value={prescribedBy} onchange={(name, value) => { setIndex(null); setPrescribedBy(value) }} type="text" />
          <InputDate require={true} m="1.5% 0.5%" w="10%" h="2vh" pd="1.1vh 0.5vw" name="from" label="From" ph="From" value={fromDate} onchange={(name, value) => { setIndex(null); setFromDate(value) }} type="month" />
          <InputDate require={true} m="1.5% 0.5%" w="10%" h="2vh" pd="1.1vh 0.5vw" name="to" label="To" ph="To" value={toDate} onchange={(name, value) => { setIndex(null); setToDate(value) }} type="month" />
          <button className="custom-input-fields" onKeyDown={handleKeyDown} onClick={searchSaleHistory} style={{ backgroundColor: "#5E48E8", border: "none", fontSize: "1rem", color: "#ffffff", borderRadius: "0.5vw", height: "4vh", width: "5vw", cursor: "pointer", marginLeft: "3vw" }}>Search</button>
          <div style={{ width: "100%", height: "100%" }}>
            <table style={{ height: "5vh", width: "100%", borderCollapse: "collapse" }}>
              <thead style={{
                backgroundColor: "#ebe8fc", height: "5vh",
                marginBottom: "10px", borderBottom: "1px solid gray"
              }}>
                <tr >
                  {tableHeaders.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
                </tr>
              </thead>
            </table>
            {
              dataList.length > 0 ?
                <div style={{ width: "100%", maxHeight: "65vh", overflow: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <tbody style={{ borderCollapse: "collapse" }}>
                      {
                        dataList.map((item, index) => {
                          return (
                            <tr id={`purchase-history-row${item._id}`} onClick={() => onEnter(item._id)} key={`${item._id}-stock-list`} className="purchase-history-row" style={{ height: "5vh", marginBottom: "3vh", backgroundColor: currentIndex === index ? "#d4d4d4" : "" }}>
                              {
                                tableHeaders.map((head) => <td key={head.name + "in-choose-batch-row"} style={{ width: head.colSize, backgroundColor: getBg(head.name, item), borderRadius: getBRadius(head.name), textAlign: getTextAlign(head.name) }}>{getValue(item, head.value)}</td>)
                              }
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
      </div>
    </Layout>
  );
}
export default BillingHistory;