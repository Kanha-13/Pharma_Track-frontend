import { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useStore } from "../../Store/store";
import { ACTION } from "../../Store/constants";
import { getSettlements } from "../../apis/settlement";

import './index.css'
import { SettlementsListHeader } from "../../Schema/settlement";
import { getmmyy, toddmmyy } from "../../utils/DateConverter";

const Settlements = () => {
  const { settlements, dispatch } = useStore();
  const fetchSettlements = async () => {
    try {
      let res = await getSettlements() || [];
      res = res.data.map((row) => {
        let product = row.productDetail[0]
        let stock = row.stockDetail[0]
        let vendor = row.vendorDetail[0]
        return {
          _id: row._id,
          itemName: product.itemName,
          batch: stock.batch,
          mrp: stock.mrp,
          vendorName: vendor.vendorName,
          returnQnty: row.returnQnty,
          type: row.type,
          status: row.status,
          date: row.date
        }
      })
      dispatch(ACTION.SET_SETTLEMENTS, res)
    } catch (error) {
      console.log(error)
    }
  }
  const getValue = (item, value) => {
    if (value === "date")
      return toddmmyy(item[value])
    else
      return item[value]
  }
  useEffect(() => {
    if (settlements.length > 0) { }
    else fetchSettlements()
  }, [])

  return (
    <Layout>
      <div id="settlements-container" className="layout-body borderbox">
        <p style={{ width: "100%", fontSize: "1.5rem", margin: "0px", fontWeight: "500", textAlign: "left", borderBottom: "2px solid #D6D8E7", paddingBottom: "5px", display: "flex", marginBottom: "5vh" }}>Settlements</p>
        <table style={{ height: "5vh", width: "100%", borderCollapse: "collapse" }}>
          <thead style={{
            backgroundColor: "#ebe8fc", height: "5vh",
            marginBottom: "10px", borderBottom: "1px solid gray"
          }}>
            <tr >
              {SettlementsListHeader.map((head) => <th style={{ width: head.colSize, textAlign: "left" }}>{head.name}</th>)}
            </tr>
          </thead>
        </table>
        {
          settlements.length > 0 ?
            <div id="stock-data-container" style={{ width: "100%", maxHeight: "65vh", overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody style={{ borderCollapse: "collapse" }}>
                  {
                    settlements.map((item, index) => {
                      return (
                        <tr key={`${item._id}-stock-list`} className="stock-batch-row" style={{ backgroundColor: index % 2 ? "#ededed" : "", height: "5vh" }}>
                          {
                            SettlementsListHeader.map((head) => <td style={{ width: head.colSize }}>{getValue(item, head.value)}</td>)
                          }
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div> : <></>
        }
      </div>
    </Layout>
  );
}
export default Settlements;