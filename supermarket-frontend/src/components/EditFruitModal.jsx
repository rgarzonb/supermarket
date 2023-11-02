import React from "react";
import FruitService from "../services/FruitService";
import ModalBody from "./ModalBody";

export const EditFruitModal = ({
    showEdit,
    setShowEdit,
    errorMessage,
    newFruit,
    handleNewFruitChange,
    itemsPerPage,
    currentPage,
    idToModif,
    loadPaginatedFruits
}) => {
    const handleCloseEdit = () => setShowEdit(false);    
    const handleSaveEdit = async() => {
   
        if(newFruit.type !== '' && newFruit.quantity !== '' && newFruit.price !== ''){ // Check if all three parameers have values
          //console.log(newFruit);      
          try{
              // Await the updateFruit function and capture the result if necessary
              await FruitService.updateFruit(idToModif, newFruit);
              //const updatedFruit = await FruitService.updateFruit(idToModif, newFruit);              
              //console.log('Fruit updated:', updatedFruit);
          }catch(error){
            console.error('Error saving updated fruit: ', error);
            alert('Error saving updated fruit: ' + error.message);
          }
        }
        setShowEdit(false);
        // window.location.reload(); // Trigger a page reload
        loadPaginatedFruits(itemsPerPage,currentPage); // Reload current page of the paginated list
      };

  return (
  <ModalBody
        show={showEdit} 
        handleClose={handleCloseEdit} 
        newFruit={newFruit} 
        errorMessage={errorMessage} 
        handleNewFruitChange={handleNewFruitChange} 
        handleSave={handleSaveEdit}
        saveButtonText= "Save Changes"
        closeButtonText= "Cancel"
        titleText = "Edit Fruit"
        disabled= {false}
        question = ""
    />
  )
}

export default EditFruitModal;
