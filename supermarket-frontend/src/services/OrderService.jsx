import axios from "axios";

const ORDER_BASE_REST_API_URL = "http://localhost:8080/api/v1/orders";

class OrderService{

    getPaginatedOrders(pageNb, itemsPerPage) {
        return axios
          .get(
            `${ORDER_BASE_REST_API_URL}?page=${pageNb}&itemsPerPage=${itemsPerPage}`
          )
          .catch((error) => {
            if(error.response){
              // Acces the response data from the error
              throw error.response.data;
            }else{
              throw error;
            } 
          });
      }

    newOrder(newOrderData) {
        return axios
          .post(`${ORDER_BASE_REST_API_URL}`, newOrderData)
          .catch((error) => {
            if(error.response){
              throw error.response.data;
            }else{
              throw error;
            }            
          });
      }
}

const OrderServiceInstance = new OrderService();
export default OrderServiceInstance;