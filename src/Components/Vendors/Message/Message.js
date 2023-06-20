import './message.css'
import NewVendor from '../../../images/illustrations/newVendor.jpg'
const Message = ({onAdd}) => {
  return (
    <div id="message-container" className="borderbox">
      <p style={{ fontSize: "2rem" }}>No Vendors in the list</p>
      <img style={{ height: "60%", backgroundSize: "cover" }} src={NewVendor} />
      <button onClick={onAdd} style={{
        marginTop: "5%", width: "20%", height: "8%", borderRadius: "0.8vw", border: "none", backgroundColor: "#5E48E8", color: "#ffffff", fontSize: "1.15rem",
        cursor: "pointer", textAlign: "center", alignItems: "center",display:"flex",justifyContent:"center"
      }}>
        <span style={{ fontSize: "2rem",marginRight:"5px" }}>+</span> Add Vendor</button>
    </div>
  );
}
export default Message;