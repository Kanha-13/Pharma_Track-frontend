import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";

const PublicRouter = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const checkSession = () => {
    const session = localStorage.getItem(process.env.REACT_APP_SESSION)
    if (session) return true
    else return false
  }
  useEffect(() => {
    console.log("user in public router!")
    if (checkSession())
      navigate(ROUTES.PROTECTED_ROUTER + ROUTES.DASHBOARD, { replace: true })
    else {
      setLoading(false)
      navigate(ROUTES.LOGIN, { replace: true })
    }
  }, [])
  return (
    loading ? <Loading /> :
      <Outlet />
  );
}
export default PublicRouter;