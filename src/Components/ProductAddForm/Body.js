import { useEffect, useState } from "react";
import Card from "../ManualAddProduct/Card";
import ProductsList from "../ProductsList/ProductsList";
import { getProductWithInitials } from "../../apis/products";
import { BillingListHeader } from "../../Constants/billing";
import { ACTION } from "../../Store/constants";
import { useStore } from "../../Store/store";
import InputDate from "../CustomDateInput/DateInput";
import KEY from "../../Constants/keyCode";

const Body = ({ addField, mode, headers, dataList = [], onChange = () => { }, onDelete = () => { } }) => {
  const { dispatch } = useStore()
  const [keyword, setkey] = useState("")
  const [list, setList] = useState([]);
  const [isLists, setIsProdList] = useState(false)
  const [heads, setHeads] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [currentIndex, setIndex] = useState(null)

  const handlechange = (index, name, value) => {
    setIndex(index)
    if (name === "itemName") {
      setkey(value)
      setIsProdList(true)
    }
    else
      onChange(index, name, value)
  }

  const onclickproduct = (itemId) => {
    setIsProdList(false)
    onChange(currentIndex, "pId", itemId)

    //below code to focus 'pkg' input
    const inputs = Array.from(document.getElementsByName('qnty'));
    const nextIndex = currentIndex;
    if (nextIndex < inputs.length + 1) {
      const nextInput = inputs[nextIndex];
      try { nextInput.focus(); } catch (error) { }
    }
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
    fetchProducts(val)
  }

  const closeListModal = (event) => {
    if (event.keyCode) {
      if (event.keyCode === KEY.ESC) {
        setIsProdList((prev) => {
          if (prev) event.stopPropagation()
          return false
        });
      }
    }
    else // if the method is called directly by some other function
      setIsProdList(false)
  }

  const handlekeypress = (event, name) => {
    if (name === "netAmt" && event.keyCode === KEY.ENTER && mode === "add") {
      event.preventDefault()
      addField();
    }
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
    setList(dataList)
    setHeads(headers)
  }, [headers, dataList])
  return (
    <div style={{ width: "100%", height: "90%" }}>
      {isLists &&
        <div style={{ backgroundColor: "#ffffff", position: "absolute", width: "90.5%", zIndex: 2, top: "3vh", height: "91%", display: "flex", flexDirection: 'column' }}>
          <ProductsList mh="400%" h="100%" w="100%" onchange={onchange}
            onclick={onclickproduct} header={BillingListHeader} data={productsList} keyword={keyword} />
        </div>
      }
      {
        list.map((item, index) => {
          const onchangeProductDetail = (name, value) => {
            if (name === "pkg" || name === "gst") return
            handlechange(index, name, value)
          }
          return (
            <div id="purchase-data-container" onClick={() => { }} key={`${item?._id}-purchase-list-${index}`} className="purchase-batch-row" style={{ height: "5vh", margin: "2vh 0px", width: "100%", display: "flex", justifyContent: "space-between" }}>
              {
                heads.map((head, index) => {
                  if (head.value === "expDate") return <InputDate key={head.value + "in-body-list"} require={true} value={item[head.value]} w={head.colSize} h="35%" pd="1.3vh 0.1vw" m="0px" ph={head.ph} name={head.value} label="" onchange={onchangeProductDetail} type={head.type} options={head.options} />
                  return <Card keypress={handlekeypress} key={head.value + "in-body-list"} require={true} value={item[head.value]} w={head.colSize} h="35%" pd="1.3vh 0.1vw" m="0px" ph={head.ph} name={head.value} label="" onchange={onchangeProductDetail} type={head.type} options={head.options} />
                })
              }
              {mode === "add" ? <button disabled={list.length === 1} onClick={() => onDelete(index)} tabIndex={-1} style={{ display: "block", padding: "0px", fontSize: "1rem", textAlign: "left", minWidth: "0.5vw", cursor: "pointer", backgroundColor: "transparent", border: "none" }}>x</button> : <></>}
            </div>
          )
        })
      }
    </div>
  );
}
export default Body;