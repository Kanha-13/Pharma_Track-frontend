import { QuotationListHeader } from "../../Constants/billing";
import { checkoutBill } from "../../apis/billing";

import Footer from "./Footer";
import CartRow from "./CartRow";

import './quotation.css'

const Quotation = ({ onremoveItem, itemsIncart = [], onchangeqnty, changeDisc, resetCart }) => {

  const oncheckout = async (billInfo, resetBillInfo) => {
    let modified_prod_list = itemsIncart.map((cart)=>{
      delete cart.qnty
      return cart
    })
    try {
      let data = {
        billInfo: billInfo,
        productsDetail: modified_prod_list
      }
      const res = await checkoutBill(data)
      resetBillInfo()
      resetCart()
    } catch (error) {
      console.log(error)
      alert("Can't process the bill, something went wrong!")
    }
  }

  return (
    <div id="quotation-container" className="borderbox" style={{

    }}>
      <h2 style={{ margin: "1% 0%" }}>Invoice #</h2>
      <hr width="90%" />
      <div style={{ height: "70%", width: "90%" }}>
        <table>
          <thead style={{ borderBottom: "1px solid gray" }}>
            <tr>
              {QuotationListHeader.map((head) => <th key={head.name + "in-quotation-table-head"}>{head.name}</th>)}
              <th></th>
            </tr>
          </thead>
          <tbody >
            {
              itemsIncart.map((item, index) => <CartRow onRemove={onremoveItem} item={item} onchangedisc={changeDisc} onchange={onchangeqnty} index={index} />)
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