import { useEffect, useState } from "react";
import KEY from "../../Constants/keyCode";

const InputDate = ({ value, name, type, onchange, h, w, m, pd, label, fs }) => {
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
                if (Value.split("").length < 3) onchange(name, Value + "-" + formatMonth(mm) + "-" + yyyy)
                break;
            case "mm":
                if (Value.split("").length < 3)
                    if (type === "fulldate") onchange(name, formatMonth(Value) + "-" + dd + "-" + yyyy)
                    else onchange(name, formatMonth(Value) + "-" + "01" + "-" + yyyy)
                break;
            default:
                if (Value.split("").length < 5)
                    if (type === "fulldate") onchange(name, formatMonth(mm) + "-" + dd + "-" + Value)
                    else onchange(name, formatMonth(mm) + "-" + "01" + "-" + Value)
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
            setdd(date_array[1])
            setmm(date_array[0])
            setyyyy(date_array[2])
        }
    }, [value])
    return (
        <div className="manualadd-inputs-div" style={{ display: "flex", justifyContent: "space-between", backgroundColor: "white", alignItems: "center", flexDirection: "row", height: h, width: w, margin: m, padding: pd, marginTop: "2.3vh" }}>
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
                        <input style={{ width: "25%", fontSize: fs }} value={dd} placeholder="dd" required={true} onChange={(e) => handlechange(e.target.value, "dd")} className="custom-input-fields" onKeyDown={checkForEnterKey} />
                        <span>/</span>
                    </> : <></>
            }
            <input style={{ width: "40%", fontSize: fs }} value={mm} placeholder="mm" required={true} onChange={(e) => handlechange(e.target.value, "mm")} className="custom-input-fields" onKeyDown={checkForEnterKey} />
            <span>/</span>
            <input style={{ width: "40%", fontSize: fs }} value={yyyy} placeholder="yyyy" required={true} onChange={(e) => handlechange(e.target.value, "yyyy")} className="custom-input-fields" onKeyDown={checkForEnterKey} />
        </div>
    );
}

export default InputDate;