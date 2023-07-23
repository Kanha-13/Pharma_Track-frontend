import { useEffect, useState } from "react"
import DatePicker from "./DatePicker"

const SelectDuration = ({ value, onchange }) => {
  const [isDatePicker, setDatePicker] = useState(false)
  const onvaluechange = (e) => {
    if (e.target.value === "custom")
      setDatePicker(true)
    else
    onchange(e.target.value)
  }
  const onchangedate = (value) => {
    setDatePicker(false)
    onchange(value)
  }

  const handleClick = () => {
    setDatePicker(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
  return (
    <>
      <select onClick={(e) => e.stopPropagation()} onChange={onvaluechange} value={value} style={{ width: "1.3vw", border: "none", cursor: "pointer", marginLeft: "auto" }}>
        <option value={"month"} style={{ fontSize: "1rem" }}>Month</option>
        <option value={"year"} style={{ fontSize: "1rem" }}>Year</option>
        <option value={"custom"} style={{ fontSize: "1rem" }}>Custom</option>
      </select>
      {
        isDatePicker && <DatePicker onchangedate={onchangedate} />
      }
    </>
  );
}
export default SelectDuration;