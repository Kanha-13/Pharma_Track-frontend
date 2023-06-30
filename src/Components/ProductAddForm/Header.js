import { PurchaseProductListHeader } from "../../Constants/Purchase";

const Header = () => {
  return (
    <div style={{
      backgroundColor: "#ebe8fc", borderBottom: "1px solid gray", width: "100%", display: "flex"
    }}>
      {PurchaseProductListHeader.map((head, index) => <p key={head.name + "in-choose-batch" + index} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</p>)}
    </div>
  );
}
export default Header;