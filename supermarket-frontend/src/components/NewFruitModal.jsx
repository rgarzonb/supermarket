import React from "react";
import FruitService from "../services/FruitService";
import ModalBody from "./ModalBody";

export const NewFruitModal = ({
    show,
    setShow,
    errorMessage,
    newFruit,
    handleNewFruitChange,
    itemsPerPage,
    currentPage,
    loadPaginatedFruits
}) => {
    const handleClose = () => setShow(false);
    const handleSave = async() => {
      // Check if all three parameers have values
      if(newFruit.type !== '' && newFruit.quantity !== '' && newFruit.price !== ''){
        //console.log(newFruit);
        try{
          await FruitService.saveFruit(newFruit);
        }catch(error){
          console.error('Error saving new fruit: ', error)
          alert('Error saving new fruit: ' + error.message);
        }        
      }
      else{
        alert('Empty form, please introduce values!')
      }
      setShow(false);
      loadPaginatedFruits(itemsPerPage,currentPage); // Reload current page of the paginated list
    };
    
  return (
  <ModalBody
        show={show} 
        handleClose={handleClose} 
        newFruit={newFruit} 
        errorMessage={errorMessage} 
        handleNewFruitChange={handleNewFruitChange} 
        handleSave={handleSave}
        saveButtonText= "Save"
        titleText = "Add New Fruit"
        closeButtonText = "Cancel"
        disabled= {false}
        question = ""
    />
  )
}

export default NewFruitModal;
