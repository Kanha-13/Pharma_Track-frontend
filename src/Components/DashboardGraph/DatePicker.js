import { useState } from "react";
import { getyyyymm } from "../../utils/DateConverter";

const DatePicker = ({ onchangedate }) => {
  const [datefrom, setDateFrom] = useState(getyyyymm(new Date()));
  const [dateto, setDateTo] = useState(getyyyymm(new Date()));
  const onchange = (e, date) => {
    if (date)
      setDateTo(e.target.value)
    else
      setDateFrom(e.target.value)
  }

  const onget = (e) => {
    const [fromyear, frommonth] = datefrom.split("-")
    const [toyear, tomonth] = dateto.split("-")
    onchangedate({ fromMonth: frommonth, toMonth: tomonth, fromYear: fromyear, toYear: toyear })
  }

  return (
    <div onClick={(e) => e.stopPropagation()} style={{ right: 5, marginTop: "3vh", position: "absolute", backgroundColor: "#ffffff", border: "2px solid #5e48e8", borderRadius: "0.4vw", padding: "1% 2%", width: "22vw", height: "15vh", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
      <label style={{ width: "45%", borderBottom: "2px solid #D6D8E7" }}>From:</label>
      <label style={{ width: "45%", borderBottom: "2px solid #D6D8E7" }}>To:</label>
      <input autoFocus style={{ cursor: "pointer", fontSize: "1rem", width: "45%" }} type="month" value={datefrom} onChange={(e) => onchange(e, 0)} />
      <input style={{ cursor: "pointer", fontSize: "1rem", width: "45%" }} type="month" value={dateto} onChange={(e) => onchange(e, 1)} />
      <button onClick={onget} style={{ cursor: "pointer", border: "none", backgroundColor: "#5e48e8", color: "#ffffff", width: "7vw", borderRadius: "0.4vw", height: "4vh", marginLeft: "auto" }}>Get</button>
    </div>
  );
}
export default DatePicker;