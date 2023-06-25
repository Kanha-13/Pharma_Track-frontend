import { useState } from "react";

const MultiBoxInput = ({ boxes, value, name, label }) => {
  const totalInput = Array.from(boxes);
  const [values, setValues] = useState([]);

  const onchange = (e, ind) => {
    setValues(values.map((val, index) => index === ind ? e.target.value : val))
  }
  
  return (
    <div>
      {totalInput.map((_, index) => <input placeholder={label} value={values[index]} onChange={(e) => onchange(e, index)} />)}
    </div>
  );
}
export default MultiBoxInput;