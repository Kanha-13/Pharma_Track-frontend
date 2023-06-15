import { useContext, useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";

import './index.css'
import Quotation from "../../Components/Quotation/Quotation";
import ProductsList from "../../Components/ProductsList/ProductsList";
import { getProductWithInitials } from "../../apis/products";
import { StateContext } from "../../Store/store";
import { ACTION } from "../../Store/constants";

const Billing = () => {
  const { products, dispatch } = useContext(StateContext)
  const [productsList, setProductsList] = useState([])//this product list is the filtered list
  const [inCart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  const checkIfProdAlreadyExist = (item) => {
    return !inCart.filter((cart) => cart.itemName === item).length
  }

  const onclickproduct = (itemname) => {
    const selectedProd = productsList.filter((prod) => prod.itemName === itemname)[0];
    selectedProd.soldQnt = 1
    if (checkIfProdAlreadyExist(itemname))
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
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 400);
  }

  const onremoveItem = (itemName) => {
    setCart(inCart.filter((item) => item.itemName !== itemName))
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 400);
  }, [])

  return (
    <Layout>
      {
        loading ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem", width: "100%", height: "100%" }}>Loading...</div> :
          <div id="billing-container" className="layout-body">
            <ProductsList onchange={onchange} onclick={onclickproduct} products={productsList} />
            <hr margi="2%" color="#D6D8E7" />
            <Quotation onremoveItem={onremoveItem} onReset={onresetall} itemsIncart={inCart} onchangeqnty={onchangeqnty} />
          </div>
      }
    </Layout>
  );
}
export default Billing;