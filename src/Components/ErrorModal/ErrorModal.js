const ErrorModal = ({ error, closeModal }) => {
    return (
        <div style={{ boxSizing: "border-box", padding: "1vh 0.5vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", width: "50vw", backgroundColor: "#d4d4d4", border: "1px solid black", borderRadius: "0.5vw", position: "absolute", top: "20%", left: "20%", zIndex: 20 }}>
            <h2 style={{ width: "100%", textAlign: "center" }}>Error</h2>
            <div style={{marginBottom:"3vh", width: "95%", height: "60%", overflow: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
                {error}
            </div>
            <button autoFocus={true} onClick={closeModal} style={{ border: "none", backgroundColor: "#f93a3a", cursor: "pointer", width: "10vw", height: "5vh", borderRadius: "0.5vw", fontSize: "1rem", color: "#ffffff" }}>Close</button>
        </div>
    );
}

export default ErrorModal;