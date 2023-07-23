import { QuotationListHeader } from "../../Constants/billing";
import { getmmyy } from "../../utils/DateConverter";
import Card from "../ManualAddProduct/Card";

const CartRow = ({ isCN, item, onRemove, onchange, openProductLists, onchangedisc, index }) => {
  const changeqnt = (value, qnty) => {
    if (value > qnty && !isCN)
      alert("Insufficient stocks")
    else
      onchange(index, value)
  }
  const onchangeDisc = (name, value) => {
    onchangedisc(index, value)
  }

  const onclicked = () => {
    openProductLists(index)
  }

  return (
    <div key={item.pId + "in-quotation-row"} style={{ alignItems: "center", height: "6vh", display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
      {
        QuotationListHeader.map((head, ind) => {
          if (head.value === "itemName")
            return <Card key={head + ind} focus={true} require={true} w="19%" h="4%" pd="1.3vh 0.5vw" m="0px" name={""} label="" ph={head.ph} value={item[head.value]} onchange={onclicked} type="text" />
          if (head.value === "soldQnty")
            return <Card key={head + ind} min={1} max={isCN ? "" : item.qnty} require={true} w={head.colSize} h="4%" pd="1.3vh 0.5vw" m="0px" name={""} label="" ph={head.ph} value={item[head.value]} onchange={(name, value) => changeqnt(value, item.qnty)} type="number" />
          if (head.value === "disc")
            return <Card key={head + ind} min={0} max={100} require={true} w={head.colSize} h="4%" pd="1.3vh 0.5vw" m="0px" name={""} label="" ph={head.ph} value={item[head.value]} onchange={onchangeDisc} type="number" />
          if (head.value === "expDate")
            return <p key={head + ind} style={{ width: head.colSize, margin: "0px" }}>{getmmyy(item[head.value])}</p>
          return <p key={head + ind} style={{ width: head.colSize, margin: "0px" }}>{item[head.value]}</p>
        })
      }
      <p onClick={() => onRemove(item.stockId)} style={{ cursor: "pointer", margin: "0px" }}>x</p>
    </div>
  )
}
export default CartRow;