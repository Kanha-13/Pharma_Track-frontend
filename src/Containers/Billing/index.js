import { useState } from "react";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getProductWithInitials } from "../../apis/products";

import Layout from "../../Components/Layout/Layout";
import Quotation from "../../Components/Quotation/Quotation";
import ProductsList from "../../Components/ProductsList/ProductsList";

import './index.css'

const Billing = () => {
  const { products, dispatch } = useStore();
  const [productsList, setProductsList] = useState([])//this product list is the filtered list
  const [inCart, setCart] = useState([])

  const checkIfProdAlreadyExist = (itemId) => {
    return !inCart.filter((cart) => cart._id === itemId).length
  }

  const onclickproduct = (itemId) => {
    const selectedProd = productsList.filter((prod) => prod._id === itemId)[0];
    selectedProd.soldQnt = 1
    if (checkIfProdAlreadyExist(itemId))
      setCart([...inCart, selectedProd]);
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
  }

  const onremoveItem = (itemName) => {
    setCart(inCart.filter((item) => item.itemName !== itemName))
  }

  return (
    <Layout>
      <div id="billing-container" className="layout-body borderbox">
        <ProductsList onchange={onchange} onclick={onclickproduct} products={productsList} />
        <hr margi="2%" color="#D6D8E7" />
        <Quotation onremoveItem={onremoveItem} onReset={onresetall} itemsIncart={inCart} onchangeqnty={onchangeqnty} />
      </div>
    </Layout>
  );
}
export default Billing;