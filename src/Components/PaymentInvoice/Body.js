import { getmmyy } from "../../utils/DateConverter";
import { PaymentInvoiceHeaders } from "./constants";

const Body = ({ billsPaid = [] }) => {
  const getValue = (item, value, index) => {
    if (value === "billingDate")
      return getmmyy(item[value])
    if (value === "batch")
      return "vbjhfbjhfbvjhbfgjhgbvhjghvjgjv"
    if (value === "index")
      return (index + 1)
    if (item.pkg / 1 && value === "soldQnty")
      return item[value] + " TAB"
    if (value === "disc" || value === "gst")
      return item[value] + "%"
    else
      return item[value]
  }
  return (
    <div style={{ width: "50vw", height: "25vh", alignItems: "center", borderBottom: "2px solid black", display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
      <table style={{ fontSize: "0.6rem", width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ padding: "0.5%", boxSizing: "border-box", borderBottom: "2px solid black" }}>
          <tr style={{ display: "flex", justifyContent: "space-between" }}>
            {PaymentInvoiceHeaders.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
          </tr>
        </thead>
      </table>
      {
        billsPaid.length > 0 ?
          <div style={{ width: "100%", overflow: "auto" }}>
            <table style={{ fontSize: "0.6rem", width: "100%", borderCollapse: "collapse" }}>
              <tbody style={{ borderCollapse: "collapse" }}>
                {
                  billsPaid.map((item, index) => {
                    return (
                      <tr key={`${item._id}-stock-list`} style={{ display: "flex", justifyContent: "space-between" }}>
                        {
                          PaymentInvoiceHeaders.map((head) => <td key={head.name + "in-choose-batch-row"} style={{ width: head.colSize, textAlign: "left", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{getValue(item, head.value, index)}</td>)
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
export default Body;