import React from "react";
import FruitService from "../services/FruitService";
import ModalBody from "./ModalBody";

export const DeleteFruitModal = ({
    showDelete,
    setShowDelete,
    newFruit,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    idToModif,
    loadPaginatedFruits
}) => {
    const handleCloseDelete = () => setShowDelete(false);    
    const handleSaveDelete = async() => {
        try{
            // Await the deleteFruit function and capture the result if necessary
            await FruitService.deleteFruit(idToModif);        
            //console.log('Fruit updated:', updatedFruit);
        }catch(error){
          console.error('Error deleting fruit: ', error);
          alert('Error deleting fruit: ' + error.message);
        }
        setShowDelete(false);
        //loadPaginatedFruits(itemsPerPage,currentPage); // Reload current page of the paginated list: problem to loadPaginatedFruits when deleted fruit is the last of the page
        const pageToLoad = currentPage > 0 ? currentPage-1:currentPage;
        await new Promise((resolve)=>{
          setCurrentPage(pageToLoad);
        });
        loadPaginatedFruits(itemsPerPage,currentPage);
      };

  return (
  <ModalBody
        show={showDelete} 
        handleClose={handleCloseDelete} 
        newFruit={newFruit} 
        errorMessage="" // Available only for modifiable type, quantity and price 
        handleNewFruitChange={()=>{}} 
        handleSave={handleSaveDelete}
        saveButtonText= "YES"
        closeButtonText= "NO"
        titleText = "Delete Fruit"
        disabled= {true}
        question = "Are you sure about deleting the current fruit?"
    />
  )
}

export default DeleteFruitModal;
