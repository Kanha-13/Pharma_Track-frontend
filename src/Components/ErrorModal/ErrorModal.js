const ErrorModal = ({ error, closeModal }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "50vh", width: "50vw", backgroundColor: "gray", position: "absolute", top: "20%", left: "20%", zIndex: 20 }}>
            <div style={{ marginBottom: "3vh" }}>
                {error}
            </div>
            <button autoFocus={true} onClick={closeModal}>Close</button>
        </div>
    );
}

export default ErrorModal;