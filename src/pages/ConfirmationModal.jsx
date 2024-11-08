import React from "react";

// ConfirmationModal component with styles
const ConfirmationModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modalContent}>
        <h2>Confirm Removal</h2>
        <p>Are you sure you want to remove {itemName} from your cart?</p>
        <div style={styles.modalButtons}>
          <button onClick={onConfirm} style={styles.btnConfirm}>
            Yes, Remove
          </button>
          <button onClick={onClose} style={styles.btnCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  },
  modalButtons: {
    marginTop: "20px",
  },
  btnConfirm: {
    backgroundColor: "#e63946", // Red for remove
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  btnCancel: {
    backgroundColor: "#f1faee", // Light color for cancel
    color: "black",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

// Add hover effects using JavaScript (optional)
styles.btnConfirmHover = {
  backgroundColor: "#d62839", // Darker red on hover
};

styles.btnCancelHover = {
  backgroundColor: "#a8dadc", // Slightly darker on hover
};

// Handle hover effects
const handleMouseOver = (event, style) => {
  Object.assign(event.currentTarget.style, style);
};

const handleMouseOut = (event, style) => {
  Object.assign(event.currentTarget.style, style);
};

export default ConfirmationModal;
