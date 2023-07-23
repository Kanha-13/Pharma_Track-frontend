import { useEffect, useState } from "react";
import { getyyyymm } from "../../utils/DateConverter";
import Card from "../ManualAddProduct/Card";

const Body = ({ mode, headers, dataList = [], onChange = () => { }, onDelete = () => { } }) => {
  const [list, setList] = useState([]);
  const [heads, setHeads] = useState([]);

  const getValue = (item, name) => {
    if (name === "expDate" && item[name]) {
      return getyyyymm(item[name])
    }
    return item[name] || ""
  }

  useEffect(() => {
    setList(dataList)
    setHeads(headers)
  }, [headers, dataList])
  return (
    <div style={{ width: "100%", height: "90%" }}>
      {
        list.map((item, index) => {
          const onchangeProductDetail = (name, value) => { onChange(index, name, value) }
          return (
            <div id="purchase-data-container" onClick={() => { }} key={`${item?._id}-purchase-list-${index}`} className="purchase-batch-row" style={{ height: "5vh", margin: "2vh 0px", width: "100%", display: "flex", justifyContent: "space-between" }}>
              {heads.map((head, index) => <Card key={head.value + "in-body-list"} require={true} value={getValue(item, head.value)} w={head.colSize} h="35%" pd="1.3vh 0.1vw" m="0px" ph={head.ph} name={head.value} label="" onchange={onchangeProductDetail} type={head.type} options={head.options} />)}
              {mode === "add" ? <button onClick={() => onDelete(index)} tabIndex={-1} style={{ display: list.length === 1 ? "none" : "block", padding: "0px", fontSize: "1.5rem", textAlign: "left", minWidth: "1.5vw", cursor: "pointer", backgroundColor: "transparent", border: "none" }}>x</button> : <></>}
            </div>
          )
        })
      }
    </div>
  );
}
export default Body;