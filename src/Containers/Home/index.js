import { useEffect, useState, lazy } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";

const Home = () => {
  const [token, setToken] = useState(localStorage.getItem(process.env.REACT_APP_SESSION))
  const navigate = useNavigate("")
  const [currentWindow, setWindow] = useState("dashboard");
  useEffect(() => {
    if (token) { }
    else navigate("/")
  }, [token])
  return (
    <Layout>
      <div style={{
        height: "90%", width: "90%", padding: "5vh 5vw", display: "flex",
        flexDirection: "column", justifyContent: "space-between", alignItems: "center", overflow: "hidden"
      }}>
        <div style={{ width: "100%", height: "20%", border: "1px solid gray", borderRadius: "0.8vw" }}></div>
        <div style={{ width: "100%", height: "20%", border: "1px solid gray", borderRadius: "0.8vw" }}></div>
        <div style={{ width: "100%", height: "20%", border: "1px solid gray", borderRadius: "0.8vw" }}></div>
      </div >
    </Layout>
  );
}
export default Home;