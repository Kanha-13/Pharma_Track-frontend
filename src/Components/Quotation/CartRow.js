import { QuotationListHeader } from "../../Constants/billing";

const CartRow = ({ item, onRemove, onchange, onchangedisc, index }) => {
  const changeqnt = (event) => {
    onchange(index, event.target.value)
  }
  const onchangeDisc = (event) => {
    onchangedisc(index, event.target.value)
  }
  return (
    <tr key={item.pId + "in-quotation-row"}>
      {
        QuotationListHeader.map((head, ind) => {
          if (head.value === "soldQnty")
            return <input autoFocus min={0} max={item.qnty} style={{ width: "5vh" }} key={head + ind} value={item[head.value]} onChange={changeqnt} />
          if (head.value === "disc")
            return <input min={0} max={100} style={{ width: "5vh" }} key={head + ind} value={item[head.value]} onChange={onchangeDisc} />
          else
            return <td key={head + ind}>{item[head.value]}</td>
        })
      }
      <td onClick={() => onRemove(item.stockId)} style={{ cursor: "pointer" }}>x</td>
    </tr>
  )
}
export default CartRow;