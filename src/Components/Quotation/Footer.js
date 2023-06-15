import { useEffect, useState } from "react"

const Footer = ({ carts = [], oncheckout }) => {
  const [patientName, setPatient] = useState("")
  const [prescribedBy, setPrescribedBy] = useState("")
  const [mobileNumber, setmobileNumber] = useState("")
  const [address, setaddress] = useState("")
  const [total, setTotal] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)
  const [amtPaid, setamtPaid] = useState(0)

  const resetFields = () => {
    setPatient("");
    setPrescribedBy("")
    setmobileNumber("")
    setaddress("")
    setTotal(0)
    setDiscount(0)
    setGrandTotal(0)
    setamtPaid(0)
  }

  const oncheckOut = (e) => {
    e.preventDefault()
    alert("happy shopping")

    if (carts.length) {
      const billDetail = {
        patientName: patientName,
        mobileNo: mobileNumber,
        address: address,
        prescribedBy: prescribedBy,
        gttl: grandTotal,
        paid: amtPaid,
        amtDue: grandTotal - amtPaid,
        discount: discount,
        date: new Date(),
        roundoff: grandTotal - (parseFloat(total - (total * discount / 100)).toFixed(3)),
        changeInProfit: 0,
        changeInSell: 0,
      }
      oncheckout(billDetail, resetFields)
    } else {
      alert("Empty cart!")
    }
  }

  useEffect(() => {
    let total = 0;
    carts.map((cart, index) => {
      total += cart.soldQnt * (cart.mrp / cart.qnty)
    })
    setTotal(total.toFixed(2))
    total = parseFloat(total - (total * discount / 100)).toFixed(2)
    setGrandTotal(Math.round(total))
  }, [carts])

  useEffect(() => {
    setGrandTotal(Math.round(total - (total * discount / 100)))
  }, [discount])

  return (
    <form onSubmit={oncheckOut} style={{
      display: "flex",
      justifyContent: "space-between", alignItems: "center", flexDirection: "row", height: "30%", width: "90%"
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
          <input required placeholder="Doctor name" onChange={(e) => setPrescribedBy(e.target.value)} value={prescribedBy} />
          <input required placeholder="Patient name" onChange={(e) => setPatient(e.target.value)} value={patientName} />
          <input required placeholder="Mobile name" onChange={(e) => setmobileNumber(e.target.value)} value={mobileNumber} />
          <input required placeholder="Address" onChange={(e) => setaddress(e.target.value)} value={address} />
        </div>
      </div>
      <div style={{ height: "100%", width: "39%", display: "flex", justifyContent: "centre", alignItems: "start" }}>
        <div style={{ marginTop: "5%", height: "100%", width: "60%", display: "flex", justifyContent: "start", flexDirection: "column" }}>
          <h5 style={{ height: "20%", margin: "0px" }}>Total:</h5>
          <h5 style={{ height: "20%", margin: "0px" }}>Discount:</h5>
          <h5 style={{ height: "20%", margin: "0px" }}>Grand Total:</h5>
          <h5 style={{ height: "20%", margin: "0px" }}>Amount Paid:</h5>
        </div>
        <div style={{ marginTop: "5%", width: "40%", height: "100%", display: "flex", justifyContent: "start", flexDirection: "column" }}>
          <h5 style={{ height: "15%", margin: "0px" }}>{total}</h5>
          <input type="number" min={0} max={100} style={{
            height: "15%", margin: "10% 0px"
          }} onChange={(e) => setDiscount(e.target.value)} value={discount} />
          <h5 style={{ height: "15%", margin: "0px", marginTop: "1.2vh", }}>{grandTotal}</h5>
          <input type="number" min={0} style={{
            height: "15%", margin: "10% 0px"
          }} onChange={(e) => setamtPaid(e.target.value)} value={amtPaid} />
          <button disabled={!carts.length} type="submit" style={{
            height: "25%", width: "100%", marginTop: "10%",
            border: "none", backgroundColor: carts.length ? "#5E48E8" : "#b0a5ed", color: "#FFFFFF", cursor: "pointer",
            borderRadius: "0.5vw", fontWeight: "bold"
          }}>Check Out</button>
        </div>
      </div>
    </form>
  );
}
export default Footer;