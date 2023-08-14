import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const CoinDetailModal = ({ show, onHide, coinData }) => {
  if (!coinData) {
    return null;
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Coin Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Currency: {coinData.code}</p>
        <p>Rate: {coinData.rate}</p>
        {/* Add other coin data fields as needed */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CoinDetailModal;
