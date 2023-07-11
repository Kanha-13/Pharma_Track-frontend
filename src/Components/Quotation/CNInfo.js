import { CNListInQuotation } from "../../Constants/billing";
import CartRow from "./CartRow";

const CNInfo = ({ data }) => {
  return (
    <div style={{ width: "100%", marginTop: "auto", marginBottom: "5vh", userSelect: "none" }}>
      <p style={{ margin: "0px", marginTop: "3vh" }}>RET/EXP/DAMAGE/NON-SALABLE</p>
      <div style={{ borderBottom: "1px solid gray", display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between" }}>
        {CNListInQuotation.map((head) => <p key={head.name + "in-quotation-table-head"} style={{ width: head.colSize, margin: "0.5vh 0px" }}>{head.name}</p>)}
        <p style={{ margin: "0px" }}></p>
      </div>
      <div style={{ height: "auto", borderBottom: "1px solid gray", display: "flex", flexDirection: "column", width: "100%" }}>
        {
          data.productsDetail?.map((item, index) => {
            item.soldQnty = item.returnedQnty
            return <CartRow key={item._id + "billing-quotation-cartrow"} openProductLists={() => { }} onRemove={() => { }} item={item} onchangedisc={() => { }} onchange={() => { }} index={index} />
          })
        }
      </div>
    </div>
  );
}
export default CNInfo;