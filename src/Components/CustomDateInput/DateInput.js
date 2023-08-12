import { useEffect, useState } from "react";
import KEY from "../../Constants/keyCode";

const InputDate = ({ value, name, type, onchange, w = "25%", h = "15%", label, m = "1.5%", pd = "1.5%", fs = "1rem" }) => {
    const [dd, setdd] = useState("")
    const [mm, setmm] = useState("")
    const [yyyy, setyyyy] = useState("")


    const formatMonth = (month) => {
        if (month === "")
            return ""
        if (month === "1" || month === "0")
            return month
        if (parseInt(month / 10) === 1 && parseInt(month % 10) > 3)
            return parseInt(month / 10)
        if (month !== "0")
            return `${parseInt(month / 10)}${parseInt(month % 10)}`
        return ""
    }

    const handlechange = (Value, Name) => {

        switch (Name) {
            case "dd":
                if (Value.split("").length < 3) onchange(name, yyyy + "-" + formatMonth(mm) + "-" + Value)
                break;
            case "mm":
                if (Value.split("").length < 3)
                    if (type === "fulldate") onchange(name, yyyy + "-" + formatMonth(Value) + "-" + dd)
                    else onchange(name, yyyy + "-" + formatMonth(Value) + "-" + "01")
                break;
            default:
                if (Value.split("").length < 5)
                    if (type === "fulldate") onchange(name, Value + "-" + formatMonth(mm) + "-" + dd)
                    else onchange(name, Value + "-" + formatMonth(mm) + "-" + "01")
                break;
        }
    }

    const checkForEnterKey = (event) => {
        if (event.keyCode === KEY.ENTER) {
            event.preventDefault();
            if (event.target.value === "")
                return alert("Cannot be blank!")
            const inputs = Array.from(document.getElementsByClassName('custom-input-fields'));
            const currentIndex = inputs.indexOf(event.target);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length + 1) {
                const nextInput = inputs[nextIndex];
                try { nextInput.focus(); } catch (error) { }
            }
        }
    }

    useEffect(() => {
        if (value) {
            const date_array = value.split("-")
            setdd(date_array[2])
            setmm(date_array[1])
            setyyyy(date_array[0])
        } else {
            setdd("")
            setmm("")
            setyyyy("")
        }
    }, [value])
    return (
        <div className="manualadd-inputs-div" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", alignItems: "center", flexDirection: "row", height: h, width: w, margin: m, padding: pd }}>
            <p style={{
                padding: "0px 2%",
                position: "absolute",
                top: -25, left: 20,
                color: "#5e48e8",
                backgroundColor: "#ffffff", textAlign: "left"
            }}>{label}</p>
            {
                type != "month" ?
                    <>
                        <input style={{ textAlign: "center", width: "25%", fontSize: fs }} value={dd} placeholder="dd" required={true} onChange={(e) => handlechange(e.target.value, "dd")} className="custom-input-fields" onKeyDown={checkForEnterKey} />
                        <span>/</span>
                    </> : <></>
            }
            <input style={{ textAlign: "center", width: "40%", fontSize: fs }} value={mm} placeholder="mm" required={true} onChange={(e) => handlechange(e.target.value, "mm")} className="custom-input-fields" onKeyDown={checkForEnterKey} />
            <span>/</span>
            <input style={{ textAlign: "center", width: "40%", fontSize: fs }} value={yyyy} placeholder="yyyy" required={true} onChange={(e) => handlechange(e.target.value, "yyyy")} className="custom-input-fields" onKeyDown={checkForEnterKey} />
        </div>
    );
}

export default InputDate;