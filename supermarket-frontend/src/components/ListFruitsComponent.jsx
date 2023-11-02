import React, { useEffect, useState } from "react";
import FruitService from "../services/FruitService";
import Button from 'react-bootstrap/Button';
import NewFruitModal  from "./NewFruitModal";
import EditFruitModal from "./EditFruitModal";
import DeleteFruitModal from "./DeleteFruitModal";

export const ListFruitsComponent = () => {
  const [fruits, setFruits] = useState([]); // initial state of fruits is an empty array
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [filter, setFilter] = useState(""); // Filter keyword

  const [newFruit, setNewFruit] = useState({ type: '', quantity: '', price: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setNewFruit({ type: '', quantity: '', price: '' }); // clear newFruit form when open modal
    setErrorMessage('');  // clear error message when open modal
    setShow(true); 
  };

  const [showEdit, setShowEdit] = useState(false);
  const [idToModif, setIdToModif] = useState();
    
  const handleShowEdit = (fruitToEdit) => {
    setIdToModif(fruitToEdit.id);
    setNewFruit({ type: fruitToEdit.type, quantity: fruitToEdit.quantity, price: fruitToEdit.price }); // show current properties of fruit to edit
    setErrorMessage('');  // clear error message when open modal
    setShowEdit(true); 
  };

  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = (fruitToEdit) => {
    setIdToModif(fruitToEdit.id);
    setNewFruit({ type: fruitToEdit.type, quantity: fruitToEdit.quantity, price: fruitToEdit.price }); // show current properties of fruit to delete
    setErrorMessage('');  // clear error message when open modal
    setShowDelete(true); 
  };

  useEffect(() => {
    loadPaginatedFruits(itemsPerPage,currentPage);
  }, [itemsPerPage, currentPage]);
  
  const loadPaginatedFruits = async (items, page) => {
    try {
      const response = await FruitService.getPaginatedFruits(page, items);
      // Process the response data after it's received
      // console.log(response);
      // setTotalPages(Math.ceil(response.data.totalElements / items));
      setTotalPages(response.data.totalPages)
      setFruits(response.data.fruits);
      // console.log(response.data.content);
    } catch (error) {
      // Handle any errors that may occur during the request
      console.error('Error loading paginated fruits: ', error);
      alert('Error loading paginated fruits: ' + error.message);
    }
  };  

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10); // Parse to integer base 10
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); // Set current page to 0 when new items per page
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the fruits based on the filter keyword (including the word)
  const filteredFruits = fruits.filter((fruit) =>
    fruit.type.toLowerCase().includes(filter.toLowerCase())    
  );

  // Filter the fruits based on the filter keyword (exactly the word)
  // const filteredFruits = fruits.filter((fruit) => {
  //   const lowerCaseFilter = filter.toLowerCase();    
  //   if (lowerCaseFilter === "") {
  //     // If filter is empty, show all fruits
  //     return true;
  //   }    
  //   return fruit.type.toLowerCase() === lowerCaseFilter;
  // });

  const handleNewFruitChange = (e) => {
    const { name, value } = e.target; // extracts name and value from the event object e
    
    let parsedValue;

    // Parsing data
    if(name === 'price'){
      parsedValue = parseFloat(value);
    }else if (name === 'quantity'){
      parsedValue = parseInt(value);
    }else{
      parsedValue = value;
    }

    // data range validation
    if (name === 'price' || name === 'quantity'){
      if(isNaN(parsedValue) || parsedValue <=0){
        setErrorMessage(name +' must be a positive number larger than 0');
        return;
      }else{      
        setErrorMessage(''); // clear error message for other fields
      }
    }
    else if(name === 'type'){
      const isAlpha = /^[a-zA-Z]+$/.test(value);
      if(!isAlpha){
        setErrorMessage(name +' must contain only letters');
        return;
      }
      else{
        setErrorMessage(''); // clear error message for other fields
      }
    }   

    setNewFruit((prevFruit) => ({
      ...prevFruit, //...prevFruit : spread operator, copies all properties of the previous state prevFruit into a new object. This step is necessary to keep the existing properties in the state intact
      [name]: parsedValue, // updates only current property 'name' with current value 'parsedValue' 
    }));
  };

  return (
    <div className="container">
      <h2 className="text-center">Fruit List</h2>
      {/* Items per Page Selector */}
      <div className="form-group">
        <label htmlFor="itemsPerPage" className="label-text">Items per Page: </label>
        <select
          id="itemsPerPage"
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="5">5</option>
        </select>
      </div>
      {/* Filter Input */}
      <div className="form-group">
        <label htmlFor="filter" className="label-text">Filter by Fruit Type:</label>
        <input
          type="text"
          id="filter"
          onChange={handleFilterChange}
          value={filter}
        />
      </div>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredFruits.map((fruit) => (
            <tr key={fruit.id}>
              <td>{fruit.type}</td>
              <td>{fruit.quantity}</td>
              <td>{fruit.price}</td>
              <td><Button variant="primary" onClick={() => handleShowEdit(fruit)}>Edit</Button></td>
              <td><Button variant="primary" onClick={() => handleShowDelete(fruit)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </nav>
      
      <div style={{ marginBottom: '10px' }}></div>

      {/* Modal:  Add New Fruit */}
      <Button variant="primary" onClick={handleShow}>
        Add New Fruit
      </Button>

      <NewFruitModal
        show = {show}
        setShow = {setShow} 
        errorMessage = {errorMessage}
        newFruit = {newFruit}
        handleNewFruitChange = {handleNewFruitChange}  
        itemsPerPage = {itemsPerPage}
        currentPage = {currentPage}
        loadPaginatedFruits = {loadPaginatedFruits}    
      />

      {/* Modal:  Edit Record */}
      <EditFruitModal
        showEdit = {showEdit}
        setShowEdit = {setShowEdit}
        errorMessage = {errorMessage}
        newFruit = {newFruit}
        handleNewFruitChange = {handleNewFruitChange}
        itemsPerPage = {itemsPerPage}
        currentPage = {currentPage}
        idToModif = {idToModif}
        loadPaginatedFruits = {loadPaginatedFruits}
      />

       {/* Modal:  Delete Record */}
      <DeleteFruitModal
        showDelete = {showDelete}
        setShowDelete = {setShowDelete}
        newFruit = {newFruit}
        itemsPerPage = {itemsPerPage}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        idToModif = {idToModif}
        loadPaginatedFruits = {loadPaginatedFruits}
      />

    </div>
  );
};

export default ListFruitsComponent;
