const DashboardCard = ({ w = "30%", h = "30%", count = "0", label = "", icon, onclick = "", bgColor = "#ffffff" }) => {
  return (
    <div onClick={onclick}
      style={{
        cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: w, height: h, border: "2px solid #D6D8E7", borderRadius: "0.8vw"
      }}>
      <p style={{ fontWeight: "bold" }}>{label}</p>
      <div style={{ display: "flex", height: "60%" }}>
        {
          icon ?
            <img src={icon} style={{ width: "80%", height: "70%", backgroundSize: "contains", fill: "yellow" }} /> : <></>
        }
        <p>{count}</p>
      </div>
    </div>
  );
}
export default DashboardCard;