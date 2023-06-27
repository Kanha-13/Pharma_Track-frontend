import './expirymenu.css'
const ExpiryMenu = ({ stockDetail, onClose, onSettle, onDelete }) => {
  return (
    <div id="expiremenu-pop">
      <div id="expiremenu-pop-box">
        <label >Select action for {stockDetail.itemName}</label>
        <button autoFocus={true} style={{ backgroundColor: "#c7c7c7", color: "#ffffff" }} onClick={onClose}>Close</button>
        <button style={{ backgroundColor: "#3fc05e" }} onClick={onSettle}>Return for settlement</button>
        <button style={{ backgroundColor: "#ef3737" }} onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
export default ExpiryMenu;