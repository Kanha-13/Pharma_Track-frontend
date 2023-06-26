import { useEffect, useState } from "react";
import Footer from "./Footer";
import { datetoJSformat, getmmyy } from "../../utils/DateConverter";
import { prodCheckout } from "../../apis/products";
import { getInvoiceCount } from "../../apis/billing";

import './quotation.css'


const Quotation = ({ onremoveItem, itemsIncart = [], onchangeqnty, onReset }) => {
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const calculateProfit = (data = {}) => {
    let costPrice = 0;
    itemsIncart.map((item) => {
      const qnt = item.category === "bottle" ? 1 : item.qnty
      costPrice += (item.netRate / qnt) * item.soldQnt
    })
    let profit = Math.round(data.gttl - costPrice);
    return profit
  }

  const oncheckout = async (data, resetFields) => {
    data.invoiceNo = invoiceNumber
    data.profit = calculateProfit(data)
    let Data = [{ ...data }]

    itemsIncart.map((item, index) => {
      Data[index + 1] = {
        _id: item._id,
        soldQnt: item.soldQnt,
        disc: data.discount,
        total: parseFloat(item.soldQnt * (item.mrp / item.qnty)).toFixed(2)
      }
    })

    try {
      const res = await prodCheckout([Data, []])
      updateInvoiceNumber();
      resetFields();
      onReset();
    } catch (error) {
      alert("Something went wrong")
    }
  }


  const updateInvoiceNumber = async () => {
    try {
      const data = await getInvoiceCount();
      setInvoiceNumber(data.invoCount)
    } catch (error) {
      alert("Something went wrong.Try again later!")
    }
  }
  useEffect(() => {
    updateInvoiceNumber()
  }, [])
  return (
    <div id="quotation-container" className="borderbox" style={{

    }}>
      <h2 style={{ margin: "1% 0%" }}>Invoice #{invoiceNumber}</h2>
      <hr width="90%" />
      <div style={{ height: "70%", width: "90%" }}>
        <table>
          <thead style={{ borderBottom: "1px solid gray" }}>
            <tr>
              <th>S.No.</th>
              <th>Item</th>
              <th>Batch</th>
              <th>MRP</th>
              <th>Exp. date</th>
              <th>Qnt.</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody >
            {
              itemsIncart.map((item, index) => {
                item.qnty = item.category === "bottle" ? 1 : item.qnty

                return (
                  <tr key={`${item.stockId}-quotation`} style={{  }}>
                    <td style={{ width: "5%" }}>{index + 1}</td>
                    <td style={{ width: "25%" }}>{item.itemName}</td>
                    <td style={{ width: "15%" }}>{item.batch}</td>
                    <td style={{ width: "10%" }}>{item.mrp}</td>
                    <td style={{ width: "15%" }}>{getmmyy(item.expDate)}</td>
                    {/* <input className="quotation-soldqnty" autoFocus={itemsIncart.length - 1 === index} type="number" min={1}
                      max={item.stock} value={item.soldQnt}
                      onChange={(e) => onchangeqnty(index, e.target.value)} /> */}
                    <td style={{ width: "10%" }}>{parseFloat(item.soldQnt * (item.mrp / item.qnty)).toFixed(2)}</td>
                    <td onClick={() => onremoveItem(item.itemName)}
                      style={{ width: "5%" }}><button tabIndex={-1} className="removeCartBtn">X</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <hr width="90%" />
      <Footer oncheckout={oncheckout} carts={itemsIncart} />
    </div>
  );
}
export default Quotation;