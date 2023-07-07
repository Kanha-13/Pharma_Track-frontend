import { useEffect, useState } from "react";
import { queryStocks } from "../../apis/stock";
import { StockInfoHeader } from "../../Containers/StockInfo/Constants";
import { getmmyy } from "../../utils/DateConverter";
import KEY from "../../Constants/keyCode";

const ChooseBatch = ({ show, pId, onEnter }) => {
  const [currentIndex, setIndex] = useState(0)
  const [batchList, setBatchList] = useState([])

  const fetchBatchList = async () => {
    try {
      const res = await queryStocks(pId);
      setBatchList(res.data)
    } catch (error) {
      alert("Unable to get batch list")
    }
  }

  const getValue = (item, value) => {
    if (value === "expDate")
      return getmmyy(item[value])
    else
      return item[value]
  }

  const handleKeyDown = (event) => {
    switch (event.keyCode) {
      case KEY.ARROW_DOWN:
        event.preventDefault();
        if (currentIndex < batchList.length - 1)
        setIndex(prev => prev + 1)
        else
        break;
        case KEY.ARROW_UP:
        event.preventDefault();
        if (currentIndex > 0)
          setIndex(prev => prev - 1)
        break;
      case KEY.ENTER:
        event.preventDefault();
        onEnter(batchList[currentIndex])
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!batchList.length && pId)
      fetchBatchList(pId)
  }, [show])
  return (
    <div id="choose-batch-modal" style={{ zIndex: 2, backgroundColor: "#ffffff", display: show ? "flex" : "none", flexDirection: "column", position: "absolute", width: "90%", height: "90%" }}>
      <input id="nav-input" autoFocus onKeyDown={handleKeyDown} style={{outline:"none", display: "hidden", border: "none", userSelect: "none" }} />
      <table style={{ height: "5vh", width: "100%", borderCollapse: "collapse" }}>
        <thead style={{
          backgroundColor: "#ebe8fc", height: "5vh",
          marginBottom: "10px", borderBottom: "1px solid gray"
        }}>
          <tr >
            {StockInfoHeader.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
          </tr>
        </thead>
      </table>
      {
        batchList.length > 0 ?
          <div style={{ width: "100%", maxHeight: "65vh", overflow: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody style={{ borderCollapse: "collapse" }}>
                {
                  batchList.map((item, index) => {
                    return (
                      <tr id="stock-data-container" autoFocus={currentIndex === index} onClick={() => onEnter(item)} key={`${item._id}-stock-list`} className="stock-batch-row" style={{ cursor: "pointer", backgroundColor: currentIndex === index ? "#ededed" : "", height: "5vh", marginBottom: "3vh" }}>
                        {
                          StockInfoHeader.map((head) => <td key={head.name + "in-choose-batch-row"} style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
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
  );
}
export default ChooseBatch;