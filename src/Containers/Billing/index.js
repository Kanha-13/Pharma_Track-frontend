import { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getProductWithInitials } from "../../apis/products";

import Layout from "../../Components/Layout/Layout";
import Quotation from "../../Components/Quotation/Quotation";
import ProductsList from "../../Components/ProductsList/ProductsList";

import './index.css'
import { BillingListHeader } from "../../Constants/billing";
import ChooseBatch from "../../Components/ChooseBatch/ChooseBatch";
import { getmmyy } from "../../utils/DateConverter";
import { calcRate, calcTotal } from "../../utils/billing";

const Billing = () => {
  const { products, dispatch } = useStore();
  const [currentPID, setPID] = useState("")
  const [productsList, setProductsList] = useState([])//this product list is the filtered list
  const [inCart, setCart] = useState([])
  const [isChooseOpen, setIsChosse] = useState(false)

  const onclickproduct = (itemId) => {
    setPID(itemId)
    setIsChosse(true);
  }

  const fetchProducts = async (initial) => {
    try {
      const data = await getProductWithInitials(initial)
      setProductsList(data)
      dispatch(ACTION.SET_PRODUCTS, data)
    } catch (error) {
      alert("Something went wrong!")
    }
  }

  const onchange = (val) => {
    val = val.trim()
    if (val === "") {
      setProductsList([])
      return
    }
    val = val.toLowerCase()
    let initialletter = val.split("")[0]
    if (products[0]?.itemName.split("")[0].toLowerCase() === initialletter.toLowerCase()) {
      setProductsList(products.filter((item) => item.itemName.toLowerCase().includes((val))))
    }
    else {
      setProductsList([])
      fetchProducts(initialletter[0], val)
    }
  }

  const onchangeqnty = (indx, val) => {
    let updated = inCart.map((cart, index) => index === indx ? { ...cart, soldQnty: val, total: calcTotal(cart, val, cart.disc) } : cart)
    setCart(updated)
  }

  const changeDisc = (indx, val) => {
    let updated = inCart.map((cart, index) => index === indx ? { ...cart, disc: val, total: calcTotal(cart, cart.soldQnty, val) } : cart)
    setCart(updated)
  }

  const onresetall = () => {
    setCart([])
    setProductsList([])
    dispatch(ACTION.SET_PRODUCTS, [])
    setPID("")
  }

  const onremoveItem = (stockId) => {
    setCart(inCart.filter((item) => item.stockId !== stockId))
  }

  const handleBatchChoose = (stock) => {
    const checkDuplicate = inCart.filter((cart) => cart.stockId === stock._id)
    if (!checkDuplicate.length) {
      const selectedPrduct = productsList.filter((prod, index) => prod._id === currentPID)[0]
      const carItem = {
        pId: selectedPrduct._id,
        itemName: selectedPrduct.itemName,
        batch: stock.batch,
        mrp: stock.mrp,
        stockId: stock._id,
        category: selectedPrduct.category,
        expDate: getmmyy(stock.expDate),
        pkg: selectedPrduct.pkg,
        soldQnty: 0,
        total: 0,
        gst: selectedPrduct.gst,
        disc: 0,
        qnty: stock.qnty,
        rate: calcRate(stock.mrp, selectedPrduct.gst)
      }
      setCart([...inCart, carItem])
    }
    setIsChosse(false)
  }

  return (
    <Layout>
      <div id="billing-container" className="layout-body borderbox">
        <ProductsList mh="400%" h="100%" w="45%" onchange={onchange}
          onclick={onclickproduct} header={BillingListHeader} data={productsList} />
        <hr margi="2%" color="#D6D8E7" />
        {isChooseOpen ? <ChooseBatch pId={currentPID} show={isChooseOpen} onEnter={handleBatchChoose} /> : <></>}
        <Quotation changeDisc={changeDisc} onremoveItem={onremoveItem} resetCart={onresetall} itemsIncart={inCart} onchangeqnty={onchangeqnty} />
      </div>
    </Layout>
  );
}
export default Billing;