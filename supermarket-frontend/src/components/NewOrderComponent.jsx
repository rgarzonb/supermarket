import React, { useState }  from 'react'
import OrderService from "../services/OrderService";
import { Button }  from "react-bootstrap";
import { Link } from "react-router-dom";
import { OrderModal } from "./OrderModal";

export const NewOrderComponent = () => {
    const [orderItems, setOrderItems] = useState([]);
    const [inputValues, setInputValues] = useState({ type: "", quantity: 1 });
    const [errorMessage, setErrorMessage] = useState("");  

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        let parsedValue;
    
        if (name === "quantity") {
          parsedValue = parseInt(value);
        } else {
          parsedValue = value;
        }
    
        // Parsing data
        if (name === "type") {
          const isAlpha = /^[a-zA-Z]+$/.test(value);
          if (!isAlpha) {
            setErrorMessage(name + " must contain only letters");
            return;
          } else {
            setErrorMessage(""); // clear error message for other fields
          }
        } else if (name === "quantity") {
          if (isNaN(parsedValue) || parsedValue <= 0) {
            setErrorMessage(name + " must be a positive number larger than 0");
            return;
          } else {
            setErrorMessage("");
          }
        }
    
        setInputValues({ ...inputValues, [name]: parsedValue }); // updating only current property 'name' with 'parsedValue' (...inputValues : other properties keep their values)
      };
    
      const handleAddItem = () => {
        if (inputValues.type === "") {
          setErrorMessage("Please enter a fruit type");
          return;
        } else {
          setOrderItems([...orderItems, inputValues]);
          setInputValues({ type: "", quantity: 1 });
        }
      };
    
      const handleRemoveItem = (index) => {
        const updatedOrderItems = [...orderItems];
        updatedOrderItems.splice(index, 1);
        setOrderItems(updatedOrderItems);        
      };
       
      const [orderPrice, setOrderPrice] = useState([]);
      const handleSubmit = async () => {
        
        try {
          const response = await OrderService.newOrder(orderItems);
          setOrderPrice(response.data.orderPrice);
          setShow(true);         
        } catch (error) {
          console.error("Error creating new order: ", error);
          alert("Error creating new order: " + error.message);
        }    
        setOrderItems([]); // Clear the order items
        setInputValues({ type: "", quantity: 1 }); // Clear the input fields        
      };

      const [show, setShow] = useState(false);
      const handleClose = () => setShow(false);

  return (
    <div className="container">
        <h2 className="text-center">New order</h2>
        <form className="column-form">
          {orderItems.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                name="type"
                value={item.type}
                onChange={(e) => handleChange(e, index)}
              />

              <label className="label"> Quantity:
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleChange(e, index)}
              />
              </label>
              <button type="button" style={{ marginLeft: '5px' }} onClick={() => handleRemoveItem(index)}>
                Remove
              </button>
              <div style={{ marginBottom: "3px" }}></div>
            </div>
          ))}
          <div>
            <input
              type="text"
              name="type"
              value={inputValues.type}
              onChange={handleChange}
              placeholder="Fruit type"
            />
            <label className="label">Quantity: 
            <input
              type="number"
              name="quantity"
              value={inputValues.quantity}
              onChange={handleChange}
              placeholder="Fruit type"
            />
            </label>
            <button
              type="button"
              className="light-blue-button"
              onClick={handleAddItem}
            >
              Add Item
            </button>
          </div>
        </form>

        {errorMessage && <div className="error-message">{errorMessage}</div>}

        <div style={{ marginBottom: '10px' }}></div>

        <Button variant="primary" onClick={handleSubmit}>
          Submit Order
        </Button>

        <Link to="/list-orders" style={{ marginLeft: '5px'}}>
        <Button variant="secondary">
          Cancel
        </Button>
        </Link>

        <OrderModal
          show = {show}
          handleClose = {handleClose}
          orderPrice = {orderPrice}
          /> 
    </div>   
  )
}

export default NewOrderComponent;
