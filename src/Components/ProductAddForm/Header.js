const Header = ({ headers }) => {
  return (
    <div style={{
      backgroundColor: "#ebe8fc", borderBottom: "1px solid gray", width: "100%", display: "flex", justifyContent: "space-between"
    }}>
      {headers.map((head, index) => <p key={head.name + "in-choose-batch" + index} style={{ width: head.colSize, textAlign: "left" }}>{head.name}</p>)}
      <p></p>
    </div>
  );
}
export default Header;