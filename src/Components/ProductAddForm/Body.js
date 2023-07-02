import { PURCHASEPRODUCTINFO } from "../../Schema/purchase";
import { getyyyymm } from "../../utils/DateConverter";
import Card from "../ManualAddProduct/Card";

const Body = ({ mode, purchaseProducts = [], products = [], onChange = () => { }, onDelete = () => { } }) => {
  const getQuantityInput = (index, onchange) => {
    let pId = purchaseProducts[index]?.pId
    let category = products.filter((product) => product.value === pId)[0]?.category
    return (
      category === "TABLET" ?
        <>
          <Card require={true} w="5.5%" h="35%" pd="1.3vh 0.1vw" m="0px" name={PURCHASEPRODUCTINFO.STIRPS} label="" ph="Strips" value={purchaseProducts[index]?.strips} onchange={onchange} type="number" />
          <Card require={true} w="5%" h="35%" pd="1.3vh 0.1vw" m="0px 0px 0px 0px" name={PURCHASEPRODUCTINFO.TABS} label="" ph="Tabs" value={purchaseProducts[index]?.tabs} onchange={onchange} type="number" />
        </>
        :
        <Card require={true} w="5.5%" h="35%" pd="1.3vh 0.1vw" m="0px" name={PURCHASEPRODUCTINFO.QNT} label="" ph="Qnty" value={purchaseProducts[index]?.qnty} onchange={onchange} type="number" />
    )
  }
  return (
    <div style={{ width: "100%", height: "90%" }}>
      {
        purchaseProducts.map((item, index) => {
          const onchangeProductDetail = (name, value) => { onChange(index, name, value) }
          return (
            <div id="purchase-data-container" onClick={() => { }} key={`${item?._id}-purchase-list-${index}`} className="purchase-batch-row" style={{ height: "5vh", margin: "2vh 0px", width: "100%", display: "flex", justifyContent: "space-between" }}>
              <Card require={true} value={purchaseProducts[index]?.pId} w="15%" h="35%" pd="1.3vh 0.1vw" m="0px" name={PURCHASEPRODUCTINFO.PRODUCTID} label="" onchange={onchangeProductDetail} type="select" options={products} />
              <Card require={true} value={purchaseProducts[index]?.qnty} w="5.5%" h="35%" pd="1.3vh 0.1vw" m="0px" label="" ph="Qnty" name={PURCHASEPRODUCTINFO.QNT} onchange={onchangeProductDetail} type="number" />
              <Card require={true} value={purchaseProducts[index]?.free} w="5%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="free" name={PURCHASEPRODUCTINFO.FREE} label="" onchange={onchangeProductDetail} type="number" />
              <Card require={true} value={purchaseProducts[index]?.batch} w="10%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="Batch no." name={PURCHASEPRODUCTINFO.BATCH} label="" onchange={onchangeProductDetail} type="text" />
              <Card require={true} value={purchaseProducts[index]?.expDate} w="12%" h="35%" pd="1.3vh 0.1vw" m="0px" fs="0.9rem" name={PURCHASEPRODUCTINFO.EXPDATE} label="" onchange={onchangeProductDetail} type="month" />
              <Card require={true} value={purchaseProducts[index]?.mrp} w="5%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="mrp" name={PURCHASEPRODUCTINFO.MRP} label="" onchange={onchangeProductDetail} type="text" />
              <Card require={true} value={purchaseProducts[index]?.rate} w="5%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="rate" name={PURCHASEPRODUCTINFO.RATE} label="" onchange={onchangeProductDetail} type="text" />
              <Card require={true} value={purchaseProducts[index]?.schemeDisc} w="3%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="sc%" name={PURCHASEPRODUCTINFO.SC} label="" onchange={onchangeProductDetail} type="text" />
              <Card require={true} value={purchaseProducts[index]?.cashDisc} w="3%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="cd%" name={PURCHASEPRODUCTINFO.CD} label="" onchange={onchangeProductDetail} type="text" />
              <Card require={true} value={purchaseProducts[index]?.netValue} w="8%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="value" name={PURCHASEPRODUCTINFO.N_VALUE} label="" onchange={onchangeProductDetail} type="text" />
              <Card require={true} value={purchaseProducts[index]?.gst} w="3%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="gst%" name={PURCHASEPRODUCTINFO.GST} label="" onchange={onchangeProductDetail} type="text" />
              <Card require={true} value={purchaseProducts[index]?.netAmt} w="8%" h="35%" pd="1.3vh 0.1vw" m="0px" ph="net amt" name={PURCHASEPRODUCTINFO.N_AMT} label="" onchange={onchangeProductDetail} type="text" />
              {mode === "add" ? <button onClick={() => onDelete(index)} tabIndex={-1} style={{ display: purchaseProducts.length === 1 ? "none" : "block", padding: "0px", fontSize: "1.5rem", textAlign: "left", minWidth: "1.5vw", cursor: "pointer", backgroundColor: "transparent", border: "none" }}>x</button> : <></>}
            </div>
          )
        })
      }
    </div>
  );
}
export default Body;