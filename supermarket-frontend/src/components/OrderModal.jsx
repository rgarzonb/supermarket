import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const OrderModal = ({
  show,
  handleClose,
  orderPrice
}) => {

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
    <Modal.Header>
        <Modal.Title> New Order </Modal.Title>
    </Modal.Header>
    
    <Modal.Body>

    <div className="two-column-content">
      <div className="column">
        <h4>Fruit</h4>
        {Object.keys(orderPrice).map((fruit, index) => (
          <p key={index} style={{ fontWeight: fruit === 'Total Price' ? 'bold' : 'normal' }}>{fruit}</p>
        ))}
      </div>
      <div className="column">
        <h4>Price</h4>
        {Object.values(orderPrice).map((price, index) => (
          <p key={index}>{price.toFixed(2)} $</p>
        ))}
      </div>
    </div>

  </Modal.Body>

    <Modal.Footer>
        <Link to="/list-orders">
        <Button variant="primary" onClick={handleClose}>
        Ok
        </Button>
        </Link>
    </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
