import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

const GSTInvoice = ({ data = {} }) => {
  const { productsDetail = [] } = data
  return (
    <div style={{ top: 0, left: 0, position: "absolute", zIndex: 20, backgroundColor: "#ffffff", width: "100vw", height: "100vh", boxSizing: "border-box", borderTop: "2px solid black" }}>
      <Header {...data} />
      <Body productsDetail={productsDetail} />
      <Footer {...data} />
    </div>
  );
}
export default GSTInvoice;