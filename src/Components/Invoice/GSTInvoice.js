import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

const GSTInvoice = ({ data = {} }) => {
  const { billInfo = {}, productsDetail = [] } = data
  return (
    <div style={{ width: "100vw", height: "100vh", boxSizing: "border-box", borderTop: "2px solid black" }}>
      <Header {...billInfo} />
      <Body {...productsDetail} />
      <Footer {...billInfo} />
    </div>
  );
}
export default GSTInvoice;