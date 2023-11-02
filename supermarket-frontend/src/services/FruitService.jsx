import axios from "axios";

const FRUIT_BASE_REST_API_URL = "http://localhost:8080/api/v1/fruits";

class FruitService {
  getAllFruits() {
    return axios.get(FRUIT_BASE_REST_API_URL).catch((error) => {
      if(error.response){
        // Acces the response data from the error
        throw error.response.data;
      }else{
        throw error;
      } 
    });
  }

  getPaginatedFruits(pageNb, itemsPerPage) {
    return axios
      .get(
        `${FRUIT_BASE_REST_API_URL}?page=${pageNb}&itemsPerPage=${itemsPerPage}`
      )
      .catch((error) => {
        if(error.response){
          throw error.response.data;
        }else{
          throw error;
        } 
      });
  }

  saveFruit(newFruitData) {
    return axios
      .post(`${FRUIT_BASE_REST_API_URL}`, newFruitData)
      .catch((error) => {
        if(error.response){
          throw error.response.data;
        }else{
          throw error;
        } 
      });
  }

  updateFruit(id, updatedFruit) {
    return axios
      .put(`${FRUIT_BASE_REST_API_URL}/${id}`, updatedFruit)
      .catch((error) => {
        if(error.response){
          throw error.response.data;
        }else{
          throw error;
        } 
      });
  }

  deleteFruit(id){
    return axios
    .delete(`${FRUIT_BASE_REST_API_URL}/${id}`)
    .catch((error) => {
      if(error.response){
        throw error.response.data;
      }else{
        throw error;
      } 
    });
  }
}

const FruitServiceInstance = new FruitService();
export default FruitServiceInstance;
