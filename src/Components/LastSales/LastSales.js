import { useEffect, useState } from "react";
import { getLatestBills } from "../../apis/billing";
import { BILLING } from "../../Schema/billing";
import { toddmmyy } from "../../utils/DateConverter";

const LastSales = () => {
  const [data, setData] = useState([])
  const fetchLastFiveSales = async () => {
    try {
      let res = await getLatestBills(BILLING.BILLING_DATE, 5)
      setData(res.data)
    } catch (error) {
      console.log(error)
      alert("Cannot get last sales bills!")
    }
  }
  useEffect(() => {
    fetchLastFiveSales()
  }, [])
  const Card = ({ data = [] }) => {
    return (
      <div style={{ display: "flex", width: "100%", height: "90%", margin: "auto", flexDirection: "column" }}>
        <div style={{ display: "flex", width: "100%", justifyContent: "space-between", margin: "2vh 0px" }}>
          <p className="dashboard-label">Invoice No.</p>
          <p className="dashboard-label">Patient Name</p>
          <p className="dashboard-label">Amount</p>
          <p className="dashboard-label">Bill Date</p>
        </div>
        {
          data.map((d, index) => {
            return (
              <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
                <p className="dashboard-label">{d.invoiceNo}</p>
                <p className="dashboard-label" style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{d.patientName}</p>
                <p className="dashboard-label">{d.grandTotal}</p>
                <p className="dashboard-label">{toddmmyy(d.billingDate)}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
  return (
    <div className="dashboard-card" style={{ width: "32%", height: "22vh" }}>
      <p className="dashboard-title">Last Sales</p>
      <Card data={data} />
    </div>
  );
}
export default LastSales;