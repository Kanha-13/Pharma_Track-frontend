import {
  Outlet
} from "react-router-dom"
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Constants/routes_frontend";

const ProtectedRouter = () => {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const checkSession = () => {
    const session = sessionStorage.getItem(process.env.REACT_APP_SESSION)
    if (session) return true
    else return false
  }

  const routeResolver = () => {

    if (checkSession()) 
      setLoading(false)
    else
      navigate(ROUTES.PUBLIC_ROUTER + ROUTES.LOGIN, { replace: true })
  }

  useEffect(() => {
    routeResolver()
  }, [])
  return (
    loading ? <Loading /> :
      <Outlet />
  );
}

export default ProtectedRouter;