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
        <div className="cont"><span dangerouslySetInnerHTML={{__html: coinData.symbol}}></span><span >{coinData.rate}</span></div>
        
        
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
