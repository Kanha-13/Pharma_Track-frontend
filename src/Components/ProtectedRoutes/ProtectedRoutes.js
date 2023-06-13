import { Navigate } from "react-router-dom";
const ProtectedRoutes = ({ auth: { isAuthenticated }, children }) => {
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoutes;