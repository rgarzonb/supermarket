import React from 'react';
import {Modal, Button} from 'react-bootstrap';

export const ModalBody = ({ 
    show, 
    handleClose, 
    newFruit, 
    errorMessage, 
    handleNewFruitChange, 
    handleSave,
    saveButtonText,
    closeButtonText,
    titleText,
    disabled,
    question }) => {
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title> {titleText} </Modal.Title>
    </Modal.Header>

    <Modal.Body>
    
    {/* <h2>Add New Fruit</h2> */}
        <div className="form-group-mod">
          <label htmlFor="newFruitType">Type:</label>
          <input
            type="text"
            id="newFruitType"
            name="type"
            value={newFruit.type}
            disabled= {disabled}
            onChange={handleNewFruitChange}
          />
        </div>
        <div className="form-group-mod">
          <label htmlFor="newFruitQuantity">Quantity:</label>
          <input
            type="number" // for numeric inputs
            id="newFruitQuantity"
            name="quantity"
            value={newFruit.quantity}
            disabled= {disabled}
            onChange={handleNewFruitChange}
          />
        </div>
        <div className="form-group-mod">
          <label htmlFor="newFruitPrice">Price:</label>
          <input
            type="number"
            id="newFruitPrice"
            name="price"
            value={newFruit.price} 
            disabled= {disabled}
            onChange={handleNewFruitChange}
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <p>{question}</p>
    </Modal.Body>

    <Modal.Footer>
      <Button variant="primary" onClick={handleSave}>
        {saveButtonText}
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        {closeButtonText}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalBody;
