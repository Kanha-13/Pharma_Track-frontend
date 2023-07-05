import { QuotationListHeader } from "../../Constants/billing";
import { getmmyy } from "../../utils/DateConverter";

const CartRow = ({ item, onRemove, onchange, onchangedisc, index }) => {
  const changeqnt = (value, qnty) => {
    if (value > qnty)
      alert("Insufficient stocks")
    else
      onchange(index, value)
  }
  const onchangeDisc = (event) => {
    onchangedisc(index, event.target.value)
  }
  return (
    <tr key={item.pId + "in-quotation-row"}>
      {
        QuotationListHeader.map((head, ind) => {
          if (head.value === "soldQnty")
            return <input type="number" autoFocus min={0} max={item.qnty} style={{ width: "5vh" }} key={head + ind} value={item[head.value]} onChange={(e) => changeqnt(e.target.value, item.qnty)} />
          if (head.value === "disc")
            return <input min={0} max={100} style={{ width: "5vh" }} key={head + ind} value={item[head.value]} onChange={onchangeDisc} />
          if (head.value === "expDate")
            return <td key={head + ind}>{getmmyy(item[head.value])}</td>
          return <td key={head + ind}>{item[head.value]}</td>
        })
      }
      <td onClick={() => onRemove(item.stockId)} style={{ cursor: "pointer" }}>x</td>
    </tr>
  )
}
export default CartRow;