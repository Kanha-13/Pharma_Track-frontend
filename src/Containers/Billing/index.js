import { useEffect, useState } from "react";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getProductWithInitials } from "../../apis/products";
import { BillingListHeader } from "../../Constants/billing";
import { calcRate, calcTotal } from "../../utils/billing";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";

import Layout from "../../Components/Layout/Layout";
import Quotation from "../../Components/Quotation/Quotation";
import ProductsList from "../../Components/ProductsList/ProductsList";
import ChooseBatch from "../../Components/ChooseBatch/ChooseBatch";

import './index.css'
import RadioButton from "../../Components/RadioButton/RadioButton";
import KEY from "../../Constants/keyCode";
import { useLocalStorage } from "../../utils/useLocalStorage";

const Billing = () => {
  const { dispatch } = useStore();
  const navigate = useNavigate()
  const [storedValue, setValue] = useLocalStorage("pendingBillCart")
  const [keyword, setkey] = useState("")
  const { oldBillId } = useParams()
  const [currentPID, setPID] = useState("")
  const [productsList, setProductsList] = useState([])//this product list is the filtered list
  const [inCart, setCart] = useState([{}])
  const [isChooseOpen, setIsChosse] = useState(false)
  const [isLists, setIsList] = useState(false)
  const [isCN, setIsCN] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const onclickproduct = (itemId) => {
    setPID(itemId)
    setIsList(false)
    setIsChosse(true);
  }

  const fetchProducts = async (initial) => {
    try {
      const data = await getProductWithInitials(initial)
      setProductsList(data)
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
    fetchProducts(val)
  }

  const onchangeqnty = (indx, val) => {
    let updated = inCart.map((cart, index) => index === indx ? { ...cart, soldQnty: val, total: calcTotal(cart, val, cart.disc) } : cart)
    setCart(updated)
    setValue(updated)
  }

  const changeDisc = (indx, val) => {
    let updated = inCart.map((cart, index) => index === indx ? { ...cart, disc: val, total: calcTotal(cart, cart.soldQnty, val) } : cart)
    setCart(updated)
    setValue(updated)
  }

  const onresetall = () => {
    setCart([{}])
    setValue(null)
    setProductsList([])
    dispatch(ACTION.SET_PRODUCTS, [])
    setPID("")
  }

  const onremoveItem = (stockId) => {
    setCart(inCart.filter((item) => item.stockId !== stockId))
    setValue(inCart.filter((item) => item.stockId !== stockId))
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
        purchaseRate: stock.netRate,
        stockId: stock._id,
        category: selectedPrduct.category,
        parentCategory: selectedPrduct.parentCategory,
        expDate: stock.expDate,
        pkg: selectedPrduct.pkg,
        soldQnty: "",
        total: 0,
        gst: selectedPrduct.gst,
        hsn_sac: selectedPrduct.hsn_sac,
        disc: 0,
        qnty: stock.qnty,
        rate: calcRate(stock.mrp, selectedPrduct.gst)
      }
      inCart[currentIndex] = carItem
      setCart(inCart)
      setValue(inCart)
    }
    setIsChosse(false)
  }

  const toBillingHistory = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.BILLING_HISTORY)
  }

  const toCNHistory = () => {
    navigate(ROUTES.PROTECTED_ROUTER + ROUTES.BILLING_CN_HISTORY)
  }

  const switchMode = () => {
    setIsCN(prev => !prev)
  }

  const openList = (index, value) => {
    setCurrentIndex(index)
    setkey(value)
    setIsList(true)
  }

  const addField = () => {
    setCart((prev) => [...prev, {}])
    setValue((prev) => [...prev, {}])
  }

  const closeListModal = (event) => {
    if (event.keyCode) {
      if (event.keyCode === KEY.ESC) {
        setIsChosse((prev) => {
          if (prev) event.stopPropagation()
          return false
        })
        setIsList((prev) => {
          if (prev) event.stopPropagation()
          return false
        });
      }
    }
    else // if the method is called directly by some other function
      setIsList(false)
  }

  useEffect(() => {
    document.addEventListener('click', closeListModal);
    document.addEventListener('keydown', closeListModal);
    return () => {
      document.removeEventListener('click', closeListModal);
      document.removeEventListener('keydown', closeListModal);
    };
  }, [])

  useEffect(() => {
    if (storedValue)
      setCart(storedValue)
  }, [])

  return (
    <Layout>
      <div id="billing-container" className="layout-body borderbox">
        {isLists &&
          <div style={{ backgroundColor: "#ffffff", position: "absolute", width: "90.5%", zIndex: 2, top: "3vh", height: "91%", display: "flex", flexDirection: 'column' }}>
            <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
              onclick={onclickproduct} header={BillingListHeader} data={productsList} keyword={keyword} />
          </div>
        }
        <div style={{ height: "5vh", width: "100%", display: "flex" }}>
          <button onClick={toBillingHistory} style={{ width: "15%", marginRight: "2vw", alignSelf: "flex-end", height: "5vh", marginBottom: "2vh", borderRadius: "0.4vw", border: "none", backgroundColor: "#5e48e8", color: "#ffffff", fontSize: "1rem", cursor: "pointer" }}>Bill History</button>
          <button onClick={toCNHistory} style={{ width: "15%", alignSelf: "flex-end", height: "5vh", marginBottom: "2vh", borderRadius: "0.4vw", border: "none", backgroundColor: "#5e48e8", color: "#ffffff", fontSize: "1rem", cursor: "pointer" }}>CN History</button>
          <RadioButton title1={"Billing"} title2={"CN"} state={isCN} onSwitch={switchMode} />
        </div>
        {isChooseOpen ? <ChooseBatch isCN={isCN} pId={currentPID} show={isChooseOpen} onEnter={handleBatchChoose} /> : <></>}
        <Quotation isCN={isCN} oldBillId={oldBillId} addField={addField} openProductLists={openList} changeDisc={changeDisc} onremoveItem={onremoveItem} resetCart={onresetall} itemsIncart={inCart} onchangeqnty={onchangeqnty} />
      </div>
    </Layout>
  );
}
export default Billing;