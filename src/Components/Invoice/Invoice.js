import './invoice.css'
const Invoice = () => {
  return (
    <div id="invoice-print" className="print-sale-container">
      <div className="outer-most-boundry">
        <div className="upper-head-tax">TAX INVOICE</div>
        <div className="info-div">
          <div className="store-info">
            <h4>AGRAWAL MEDICAL AND GENERAL STORE</h4>
            <h5 className="store-h5">BajrangPara,Main Road,Near Electric Office,Silyari,Raipur,(C.G.)</h5>
            <h5 className="store-h5">Silyari Raipur (C.G.)</h5>
            <h5 className="store-h5">Raipur-492001</h5>
            <h5 className="store-h5">Mob.:7987575131</h5>
            <h5 className="store-h5">DL.NO.: 20/CG-RZ1-40016,21/40017</h5>
          </div>
          <div className="patient-info">
            <h5>Patient Name&emsp;: <input id="pName" type="text" /></h5>
            <h5>Mobile No. &emsp; &emsp;: <input id="mob" type="text" /></h5>
            <h5>Dr.Name.&emsp;&emsp;&emsp;: <input id="drName" type="text" /></h5>
            {/* <!-- <h5>Age &emsp;&emsp;&emsp;&emsp; &emsp;: <input id="age" type="text" /></h5> --> */}
            <h5>Address&emsp; &emsp; &emsp;: <input id="adrs" type="text" /></h5>
            <h5>Date &emsp; &emsp;&emsp; &emsp; : <input id="bil-date" value="0" type="text" /></h5>
            <h5>Invoice No.&emsp;&emsp; : <input id="invo" style={{ fontWeight: "bold" }} type="text" /></h5>
          </div>
        </div>
        <div className="discription-header" style={{ fontWeight: "bolder", borderBottom: "2px solid black" }}>
          <h4 id="sno" className="item-desc">S.No</h4>
          <h4 id="im" className="item-desc">Item Name</h4>
          <h4 id="pk" className="item-desc">Pack. tab/ml</h4>
          <h4 id="exp" className="item-desc">Exp.</h4>
          <h4 id="bth" className="item-desc">Batch</h4>
          <h4 id="hsn" className="item-desc">HSN. /SAC</h4>
          <h4 id="mrp" className="item-desc">MRP</h4>
          <h4 id="qty" className="item-desc">Qty.</h4>
          <h4 id="rt" className="item-desc">Rate</h4>
          <h4 id="ct" className="item-desc">CGST &emsp;%</h4>
          <h4 id="st" className="item-desc">SGST &emsp;%</h4>
          <h4 id="dis" className="item-desc">Disc &emsp;%</h4>
          <h4 id="ttl" className="item-desc">Total</h4>
        </div>
        <div id="res-items-to-print"></div>

        <div className="amt-words" style={{ borderBottom: "2px solid black", paddingLeft: "5px" }}>
          <h4 style={{ display: "inline" }}>Amt. in words. : <h4 style={{ display: "inline" }} id="in-words"></h4>
          </h4>
        </div>
        <div className="amt-calc">
          <div className="terms-condi-part">
            <h4>Terms & Conditions</h4>
            <h5>1.Goods once sold will not be returned back</h5>
            <h5>2.Subject to Raipur Judiciary Only</h5>
            <h5>3.Amount due should to paid with in 10 days from the bill/invoice date</h5>
            <h5>4.Consult with doctor before using any medicine</h5>
          </div>
          <div className="recieveing">
            <div className="receiver_sign">
              <h4>Receiver's Signature:</h4>
            </div>
            <div className="store-seal">
              <h3>.</h3>
              <h3></h3>
              <h5>Store Seal</h5>
              <h3></h3>
            </div>
            <div className="str-nm-sign">
              <h5>For Agrawal Medical & General Store,Silyari</h5>
              <h1></h1>
              <h5>Authorized Signature</h5>
            </div>
          </div>
          <div className="cal-part">
            <h4>Sum Total &emsp; : <input id="bil-Ttl" style={{ width: "12%" }} type="text" />&emsp;Total Tax. Amt.
              :
              <input id="taxRs" style={{ width: "12%" }} type="text" />
            </h4>
            <h4>Discount Rs&emsp;: <input id="DiscRs" style={{ width: "12%" }} type="text" />&emsp; Round
              Off&emsp;&emsp;: <input id="ROff" style={{ width: "12%" }} type="text" /></h4>
            <h4>Grand Total &emsp;: <input id="g-ttl" style={{ width: "12%" }} type="text" />&emsp;
              Paid&emsp;&emsp;
              &emsp; &emsp;: <input id="at-paid" style={{ width: "12%" }} type="text" /></h4>
            <h4>Amt.Due&emsp; &emsp; : <input id="at-due" style={{ width: "12%" }} type="text" /></h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Invoice;