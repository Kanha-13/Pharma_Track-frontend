import { useContext, useEffect, useState } from "react"
import { PRODUCT } from "../../Schema/products"
import { StateContext } from "../../Store/store"

const Card = ({ require = false, w = "25%", h = "15%", productDetail,
 label = "", name = "", value = "", type = "text", onchange,focus=false }) => {
  const { vendors } = useContext(StateContext)
  const [selectedCategory, setCategory] = useState("tablet")
  const [typee, setTyp] = useState(type);
  const onclickbutton = (val) => {
    setCategory(val)
    if (val === "bottle")
      onchange(name, "bottle")
    else
      onchange(name, "tablet")
  }

  const getbg = (val) => {
    if (val === selectedCategory)
      return "#5e48e8"
    else
      return "#ffffff"
  }

  const getcolor = (val) => {
    if (val === selectedCategory)
      return "#ffffff"
    else
      return "#000000"
  }

  useEffect(() => {
    if (productDetail?.category === "tablet" && name === PRODUCT.PACKING)
      setTyp("number")
    else if (productDetail?.category === "bottle" && name === PRODUCT.PACKING)
      setTyp("text")
  }, [productDetail?.category])

  useEffect(() => {

    if (name === PRODUCT.NETRATE) {
      const rate = parseFloat(productDetail?.rate)
      const gst = parseFloat(productDetail?.gst)

      let calcNetRate = ((rate * gst) / 100) + rate || rate || 0
      onchange(PRODUCT.NETRATE, calcNetRate)
    }
  }, [productDetail?.rate, productDetail?.gst])

  useEffect(() => {
    console.log(vendors)
  }, [])

  return (
    <div style={{
      position: "relative",
      color: "#5E48E8", border: "2px solid #D6D8E7", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "1.5%", width: w, height: h, borderRadius: "0.8vw", margin: "1.5%"
    }}>
      <p style={{
        padding: "0px 2%",
        position: "absolute",
        top: -25, left: 20,
        backgroundColor: "#ffffff", textAlign: "left"
      }}>{label}</p>
      {
        name === PRODUCT.VENDOR ?
          <select required={require} style={{ outline: "none", fontSize: "1.15rem", border: "none", margin: "0%", cursor: "pointer" }} onChange={(e) => onchange(name, e.target.value)}>
            <option value="" style={{ cursor: "pointer" }}>Select vendor</option>
            {
              vendors.map((vendor) => <option style={{ cursor: "pointer" }} value={vendor.partyName}>{vendor.partyName}</option>)
            }
          </select> :
          type === "radio" ?
            <div style={{ width: "100%" }}>
              <button type="button" onClick={() => onclickbutton("bottle")} style={{
                cursor: "pointer", color: getcolor("bottle"), width: "50%", border: "none",
                backgroundColor: getbg("bottle"), fontSize: "1.15rem"
              }}>Bottle</button>
              <button type="button" onClick={() => onclickbutton("tablet")} style={{
                cursor: "pointer", color: getcolor("tablet"), width: "50%", border: "none",
                backgroundColor: getbg("tablet"), fontSize: "1.15rem"
              }}>Tablet</button>
            </div> :
            <input placeholder={label} autoFocus={focus} required={require} value={value} type={typee} onChange={(e) => onchange(name, e.target.value)}
              style={{ fontSize: "1.15rem", cursor: "pointer", border: "none", outline: "none" }} />
      }
    </div>
  );
}
export default Card;