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

const Billing = () => {
  const { products, dispatch } = useStore();
  const [currentPID, setPID] = useState("")
  const [productsList, setProductsList] = useState([])//this product list is the filtered list
  const [inCart, setCart] = useState([])
  const [isChooseOpen, setIsChosse] = useState(false)

  const checkIfProdAlreadyExist = (itemId, stockId) => {
    let duplicate = false
    inCart.filter((cart) => {
      if (cart._id === itemId && cart.stockId === stockId)
        duplicate = true
    })
    return duplicate
  }

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
    setCart(inCart.map((cart, index) => index === indx ? { ...cart, soldQnt: val } : cart))
  }

  const onresetall = () => {
    setCart([])
    setProductsList([])
    dispatch(ACTION.SET_PRODUCTS, [])
    setPID("")
  }

  const onremoveItem = (itemName) => {
    setCart(inCart.filter((item) => item.itemName !== itemName))
  }

  const handleBatchChoose = (stock) => {
    const selectedPrduct = productsList.filter((prod, index) => prod._id === currentPID)[0]
    selectedPrduct.stockId = stock._id
    console.log(inCart)
    setCart([...inCart, selectedPrduct])
    return
  }

  return (
    <Layout>
      <div id="billing-container" className="layout-body borderbox">
        <ProductsList mh="400%" h="100%" w="45%" onchange={onchange}
          onclick={onclickproduct} header={BillingListHeader} data={productsList} />
        <hr margi="2%" color="#D6D8E7" />
        {isChooseOpen ? <ChooseBatch pId={currentPID} show={isChooseOpen} onEnter={handleBatchChoose} /> : <></>}
        <Quotation onremoveItem={onremoveItem} onReset={onresetall} itemsIncart={[]} onchangeqnty={onchangeqnty} />
      </div>
    </Layout>
  );
}
export default Billing;