import { useState } from "react";
import { getCNHistory } from "../../apis/billing";
import Card from "../ManualAddProduct/Card";
import KEY from "../../Constants/keyCode";
import { CNHistoryListHeader } from "../../Constants/billing";
import { toddmmyy } from "../../utils/DateConverter";

const ChooseCN = ({ onEnter, closeModal }) => {
  const [patientName, setPatientName] = useState("")
  const [currentIndex, setIndex] = useState("")
  const [dataList, setDataList] = useState("")

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

  const getValue = (item, value) => {
    if (value === "billingDate")
      return toddmmyy(item[value])
    else
      return item[value]
  }

  const fetchCNList = async () => {
    try {
      let res = await getCNHistory("", "", patientName, "", {});
      res.data = res.data.filter((prod, index) => prod.status !== "REFUNDED")

      if (!res.data?.length)
        alert("No credit note found!")
      setDataList(res.data);
    } catch (error) {
      console.log(error)
      alert("Unable to get cn list")
    }
  }
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", top: 0, width: "100%", height: "100%", left: 0, borderRadius: "0.4vw", backgroundColor: "#ffffff", flexDirection: "column" }}>
      <p style={{ width: "90%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "0vh" }}>CN History</p>
      <div style={{ display: "flex", width: "90%", height: "10%", alignItems: "center" }}>
        <Card focus={true} require={true} m="1.5% 0px" w="15%" h="2vh" pd="1.1vh 0.5vw" name="patientName" label="" ph="Patient Name" value={patientName} onchange={(name, value) => { setIndex(null); setPatientName(value) }} type="text" />
        <button className="custom-input-fields" onKeyDown={handleKeyDown} onClick={fetchCNList} style={{ marginLeft: "3vh", backgroundColor: "#5E48E8", border: "none", fontSize: "1rem", color: "#ffffff", borderRadius: "0.5vw", height: "4vh", width: "5vw", cursor: "pointer" }}>Search</button>
        <button onClick={closeModal} style={{ marginLeft: "3vh", backgroundColor: "#a5a5a5", border: "none", fontSize: "1rem", color: "#ffffff", borderRadius: "0.5vw", height: "4vh", width: "5vw", cursor: "pointer" }}>Close</button>
      </div>
      <div style={{ width: "90%", height: "75%" }}>
        <table style={{ height: "5vh", width: "100%", borderCollapse: "collapse" }}>
          <thead style={{
            backgroundColor: "#ebe8fc", height: "5vh",
            marginBottom: "10px", borderBottom: "1px solid gray"
          }}>
            <tr >
              {CNHistoryListHeader.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
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
                            CNHistoryListHeader.map((head) => <td key={head.name + "in-choose-batch-row"} style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
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
  );
}
export default ChooseCN;