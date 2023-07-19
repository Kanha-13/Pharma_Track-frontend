import { getmmyy } from "../../utils/DateConverter";
import { InvoiceHeaders } from "./constants";

const Body = ({ productsList = [] }) => {
  const getValue = (item, value) => {
    if (value === "expDate")
      return getmmyy(item[value])

    if (value === "disc" || value === "gst")
      return item[value] + "%"
    else
      return item[value]
  }
  return (
    <div style={{ width: "100%", height: "25vh", alignItems: "center", borderBottom: "2px solid black", display: "flex", flexWrap: "wrap", flexDirection: "column" }}>
      <table style={{ fontSize: "0.8rem", width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ padding: "0.5%", boxSizing: "border-box", borderBottom: "2px solid black" }}>
          <tr >
            {InvoiceHeaders.map((head) => <th key={head.name + "in-choose-batch"} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
          </tr>
        </thead>
      </table>
      {
        productsList.length > 0 ?
          <div style={{ width: "100%", overflow: "auto" }}>
            <table style={{ fontSize: "0.8rem", width: "100%", borderCollapse: "collapse" }}>
              <tbody style={{ borderCollapse: "collapse" }}>
                {
                  productsList.map((item, index) => {
                    return (
                      <tr key={`${item._id}-stock-list`}>
                        {
                          InvoiceHeaders.map((head) => <td key={head.name + "in-choose-batch-row"} style={{ width: head.colSize, textAlign: "left" }}>{getValue(item, head.value)}</td>)
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