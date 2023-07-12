import SalesCountIcon from "../../images/icons/salesCount.png"
const ProductDetails = () => {
  return (
    <div className="dashboard-card" style={{ width: "18%", height: "22vh" }}>
      <p className="dashboard-title">Products Details</p>
      <p className="dashboard-label">Low stocks items</p>
      <p className="dashboard-value">05</p>
      <p className="dashboard-label">Items Expired</p>
      <p className="dashboard-value">05</p>
      <p className="dashboard-label">Items Expiry soon</p>
      <p className="dashboard-value">05</p>
    </div>
  );
}
export default ProductDetails;