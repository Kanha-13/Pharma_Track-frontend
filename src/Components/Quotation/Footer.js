import { useEffect, useState } from "react"
import KEY from "../../Constants/keyCode"
import Card from "../ManualAddProduct/Card"
import ChooseCN from "./ChooseCN"
import { getCNInfo } from "../../apis/billing"
import { calcProfit, validatesalesbill } from "../../utils/billing"

const Footer = ({ isCN, resetproducts, addField, carts = [], oncheckout, onsetCNInfo }) => {
  const [patientName, setPatient] = useState("")
  const [prescribedBy, setPrescribedBy] = useState("")
  const [mobileNumber, setmobileNumber] = useState("")
  const [address, setaddress] = useState("")
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [roundOff, setRoundOff] = useState(0)
  const [creditAmt, setCreditAmt] = useState()
  const [grandTotal, setGrandTotal] = useState(0)
  const [amtPaid, setamtPaid] = useState(0)
  const [isMergeCN, setIsMergeCN] = useState(false)

  const resetFields = () => {
    setPatient("");
    setPrescribedBy("")
    setmobileNumber("")
    setaddress("")
    setTotal(0)
    setDiscount(0)
    setGrandTotal(0)
    setamtPaid(0)
    setCreditAmt()
  }

  const resetallfields = () => {
    resetFields()
    resetproducts()
  }

  const onMergeCN = () => {
    if (carts[0].pId) setIsMergeCN(true)
    else alert("Empty cart! Add items first")
  }

  const onSumbmit = (e) => {
    e.preventDefault()

    if (carts.length) {
      const profit = calcProfit(carts)
      const billDetail = {
        patientName: patientName,
        mobileNumber: mobileNumber,
        address: address,
        prescribedBy: prescribedBy,
        subTotal: total,
        grandTotal: grandTotal,
        amtPaid: amtPaid,
        amtDue: grandTotal - amtPaid,
        discount: discount,
        roundoff: roundOff,
        creditAmt: creditAmt,
        profit: profit - (roundOff * -1)
      }
      const { success, error } = validatesalesbill(billDetail, carts);
      if (error)
        return alert(error)
      if (isCN) {
        billDetail.amtRefund = amtPaid
        delete billDetail.amtPaid
      }
      oncheckout(billDetail, resetFields)
    } else {
      alert("Empty cart!")
    }
  }

  const handleChooseCN = async (cnId) => {
    try {
      const res = await getCNInfo(cnId);
      setCreditAmt(res.data.amtRefund)
      setGrandTotal((prev) => prev - res.data.amtRefund)
      setamtPaid((prev) => prev - res.data.amtRefund)
      onsetCNInfo(res.data)
    } catch (error) {
      console.log(error)
      alert("Unable to get cn info!")
    }
    setIsMergeCN(false)
  }

  const onchangeamtpaid = (value) => {
    if (value === "") setamtPaid("")
    let isnum = /^\d+$/.test(value);
    if (isnum) setamtPaid(value)
  }

  useEffect(() => {
    try {
      let subtotal = "0";// for total without discount
      let total = "0";//for total with discount
      let incarts = carts.filter((cart) => cart.pId)
      incarts.map((cart, index) => {
        let mrp_per_unit = cart.mrp  // tablet or bottle
        if (cart.category === "TABLET")
          mrp_per_unit = cart.mrp / cart.pkg
        subtotal = parseFloat(mrp_per_unit * cart.soldQnty) + parseFloat(subtotal)
        total = parseFloat(cart.total) + parseFloat(total)
      })
      let discountInRS = parseFloat(subtotal - total).toFixed(2)
      setDiscount(discountInRS)
      let gttl = Math.round(total)
      setRoundOff(parseFloat(gttl - (subtotal - discountInRS)).toFixed(2))
      setTotal(parseFloat(subtotal).toFixed(2))
      setGrandTotal(gttl)
      setamtPaid(gttl)
    } catch (error) {
    }
  }, [carts])

  const handleKeyUp = (event) => {
    switch (event.keyCode) {
      case KEY.F10:
        event.preventDefault();
        addField();
        break;
      case KEY.END:
        event.preventDefault();
        const tags = document.getElementsByName("Doctor Name") || []
        if (tags[0])
          tags[0].focus()
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyUp);
    };
  }, []);


  return (
    <div onSubmit={onSumbmit} style={{
      display: "flex",
      justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: "30%", width: "95%"
    }}>
      <div style={{
        height: "100%", width: "60%",
        display: "flex", justifyContent: "space-around", alignItems: "start"
      }}>
        <div style={{ width: "35%", height: "100%", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
          <h5 style={{ margin: "5px" }}>Prescribed by:</h5>
          <h5 style={{ margin: "5px" }}>Patient name:</h5>
          <h5 style={{ margin: "5px" }}>Mobile number:</h5>
          <h5 style={{ margin: "5px" }}>Address:</h5>
        </div>
        <div style={{ width: "55%", height: "100%", display: "flex", justifyContent: "space-around", flexDirection: "column" }}>
          <Card w="50%" h="3%" pd="1.3vh 0.5vw" m="0px" name={""} label="" ph="Doctor Name" value={prescribedBy} onchange={(name, value) => setPrescribedBy(value)} type="text" />
          <Card require={true} w="50%" h="3%" pd="1.3vh 0.5vw" m="0px" name={""} label="" ph="Patient Name" value={patientName} onchange={(name, value) => setPatient(value)} type="text" />
          <Card w="50%" h="3%" pd="1.3vh 0.5vw" m="0px" name={""} label="" ph="Mobile Number" value={mobileNumber} onchange={(name, value) => setmobileNumber(value)} type="text" />
          <Card w="50%" h="3%" pd="1.3vh 0.5vw" m="0px" name={""} label="" ph="Address" value={address} onchange={(name, value) => setaddress(value)} type="text" />
        </div>
      </div>
      <div style={{ height: "100%", width: "39%", flexWrap: "wrap", display: "flex", justifyContent: "centre", alignItems: "start" }}>
        <div style={{ marginTop: "2%", height: "80%", width: "60%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
          <h5 style={{ height: "20%", margin: "0px" }}>Sub Total:</h5>
          <h5 style={{ height: "20%", margin: "0px" }}>Discount:</h5>
          <h5 style={{ height: "20%", margin: "0px" }}>Round Off:</h5>
          {creditAmt ? <h5 style={{ height: "20%", margin: "0px" }}>Credit amt.:</h5> : <></>}
          <h5 style={{ height: "20%", margin: "0px" }}>Grand Total:</h5>
          <h5 style={{ height: "20%", margin: "0px" }}>Amount {isCN ? "Refund" : "Paid"}:</h5>
        </div>
        <div style={{ marginTop: "2%", height: "80%", width: "40%", display: "flex", justifyContent: "space-between", flexDirection: "column" }}>
          <h5 style={{ height: "20%", margin: "0px" }}>{parseFloat(total || "0").toFixed(2)}</h5>
          <h5 style={{ height: "20%", margin: "0px" }}>{discount || 0}</h5>
          <h5 style={{ height: "20%", margin: "0px" }}>{roundOff || 0}</h5>
          {creditAmt ? <h5 style={{ height: "20%", margin: "0px" }}>{creditAmt || 0}</h5> : <></>}
          <h5 style={{ height: "20%", margin: "0px", marginTop: "0px", }}>{grandTotal || 0}</h5>
          <Card w="50%" h="3%" pd="1.3vh 0.5vw" m="0px" name={""} label="" ph="Amt." value={amtPaid} onchange={(name, value) => onchangeamtpaid(value)} type="text" />

        </div>
        <div style={{ width: "100%", height: "4vh", marginTop: "3vh", display: "flex", justifyContent: "space-between" }} >
          <button onClick={onSumbmit} className="custom-input-fields" disabled={!carts.length} type="submit" style={{
            height: "100%", width: "30%", fontSize: "1rem",
            border: "none", backgroundColor: carts.length ? "#5E48E8" : "#b0a5ed", color: "#FFFFFF", cursor: "pointer",
            borderRadius: "0.5vw", fontWeight: "bold"
          }}>Check Out</button>
          {!isCN && <button onClick={onMergeCN} className="custom-input-fields" disabled={!carts.length} type="submit" style={{
            height: "100%", width: "30%", fontSize: "1rem",
            border: "none", backgroundColor: carts.length ? "#5E48E8" : "#b0a5ed", color: "#FFFFFF", cursor: "pointer",
            borderRadius: "0.5vw", fontWeight: "bold"
          }}>Merge CN</button>}
          <button onClick={resetallfields} type="reset" style={{
            height: "100%", width: "20%", fontSize: "1rem",
            border: "none", backgroundColor: "#a4a4a4", color: "#FFFFFF", cursor: "pointer",
            borderRadius: "0.5vw", fontWeight: "bold"
          }}>Reset</button>
        </div>
      </div>
      {
        isMergeCN && <ChooseCN onEnter={handleChooseCN} closeModal={() => setIsMergeCN(false)} />
      }
    </div>
  );
}
export default Footer;