import { useState } from "react";
import { PatientMedicineHistoryHeader } from "../../Constants/patients";
import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/ManualAddProduct/Card";
import Header from "../../Components/ProductAddForm/Header";
import './index.css'
import { getMedicineHistory } from "../../apis/patient";
import { toddmmyy } from "../../utils/DateConverter";

const Patients = () => {
  const [medicineHistory, setHistory] = useState([])
  const [filterList, setFilterList] = useState([])
  const [patientName, setPatientName] = useState("")
  const [itemName, setItemName] = useState("")
  const [isDisabled, setDisabled] = useState(false)

  const fetchMedicineHistory = async () => {
    setDisabled(true)
    try {
      const res = await getMedicineHistory(patientName)
      let medicineList = []
      let _ = res.data?.map((bill) => {
        let __ = bill.products?.map((product) => {
          medicineList.push({ itemName: product.itemName, batch: product.batch, soldQnty: product.soldQnty, billingDate: bill.billingDate, invoiceNo: bill.invoiceNo })
        })
      }) || []
      if (!_.length)
        alert("No Record found!")
      setHistory(medicineList)
      setFilterList(medicineList)
    } catch (error) {
      console.log(error)
      alert("Unable to get medicine history")
    }
    setDisabled(false)
  }

  const onfilterList = (name, value) => {
    value = value.toUpperCase()
    setItemName(value)
    const filterlist = medicineHistory.filter((item) => item.itemName.includes(value))
    setFilterList(filterlist)
  }

  const getValue = (data, name) => {
    if (name === "billingDate")
      return toddmmyy(data[name])
    else
      return data[name]
  }

  return (
    <Layout>
      <div id="patients-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "0vh" }}>Medicine History</p>
        <div style={{ height: "10%", width: "100%", display: "flex", alignItems: "center" }}>
          <Card focus={true} require={true} w="25%" h="2vh" m="0px" pd="1.1vh 0.5vw" ph="Patient name" name="patientName" label="" value={patientName} onchange={(name, value) => setPatientName(value)} type="text" />
          <button id="searchBtn" disabled={isDisabled} className="custom-input-fields" onClick={fetchMedicineHistory} style={{ backgroundColor: "#5E48E8", border: "none", fontSize: "1rem", color: "#ffffff", borderRadius: "0.5vw", height: "5vh", width: "5vw", cursor: "pointer", margin: "0px auto 0px 2vw" }}>Search</button>
          <Card require={true} w="25%" h="2vh" m="0px" pd="1.1vh 0.5vw" ph="Medicine name" name="itemName" label="" value={itemName} onchange={onfilterList} type="text" />
        </div>
        <Header headers={PatientMedicineHistoryHeader} />
        <div style={{ width: "100%", overflow: "auto", height: "80%" }}>
          <table style={{ width: "100%" }}>
            <tbody>
              {
                filterList.map((item, index) => {
                  return (
                    <tr key={`${item._id}-product-list`} className="prod-row" onClick={() => { }} style={{ cursor: "pointer", height: "10vh" }}>
                      {
                        PatientMedicineHistoryHeader.map((head) => <td key={head.name + "in-prod-row"} style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
export default Patients;