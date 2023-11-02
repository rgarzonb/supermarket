package com.supermarket.service;

import ch.qos.logback.classic.Logger;
import com.supermarket.dto.RequestOrderItem;
import com.supermarket.dto.ResponseOrder;
import com.supermarket.dto.ResponsePrice;
import com.supermarket.exception.MyResourceNotFoundException;
import com.supermarket.exception.ResourceNotFoundException;
import com.supermarket.model.Fruit;
import com.supermarket.model.Order;
import com.supermarket.repository.FruitRepository;
import com.supermarket.repository.OrderRepository;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    @Autowired // Injection of dependency of the order service on the FruitRepository (using existing instantiation of it)
    private FruitRepository fruitsRepository;

    @Autowired
    private OrderRepository orderRepository;

    private static final Logger logger = (Logger) LoggerFactory.getLogger(OrderService.class);

    public void sendAlertMessage(String message) {
        logger.error("ALERT: {}", message);
    }

    public List<Order> listOrders(){
        return orderRepository.findAll();
    }

    public ResponseEntity<ResponseOrder> getPaginatedOrders(int page,
                                                            int itemsPerPage) throws Exception {

        try{
            ResponseOrder responseOrder;
            if(itemsPerPage > 0){
                // Create a PageRequest with the page number (page) and page size (itemsPerPage)
                PageRequest pageRequest = PageRequest.of(page, itemsPerPage);
                // Fetch the paginated data using the repository
                Page<Order> orderPage = orderRepository.findAll(pageRequest);
                if (orderPage.getContent().isEmpty()) {
                    throw new MyResourceNotFoundException("ER05", "Failed to retrieve paginated orders");
                }
                responseOrder = ResponseOrder.builder()
                        .code("0000")
                        .message(null)
                        .orders(orderPage.getContent())
                        .totalPages(orderPage.getTotalPages()).build();
            }
            else {
                List<Order> orderList = orderRepository.findAll();
                if (orderList.isEmpty()) {
                    throw new MyResourceNotFoundException("ER06", "Failed to retrieve the list of orders");
                }
                responseOrder = ResponseOrder.builder()
                        .code("0000")
                        .message(null)
                        .orders(orderList)
                        .totalPages(1).build();
            }
            return (ResponseEntity.ok(responseOrder));
        }catch(MyResourceNotFoundException e){
            ResponseOrder responseOrder = ResponseOrder.builder()
                    .code(e.getErrorCode())
                    .message(e.getMessage())
                    .orders(null)
                    .totalPages(0).build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseOrder);
        }
    }

    public Order saveOrder(Order order){
        return orderRepository.save(order);
    }

    public ResponseEntity<ResponsePrice> calculateOrderPrice(List<RequestOrderItem> orderItems) throws Exception{
        final double FACTOR_UNITS_FRUIT = 0.95;
        final double FACTOR_DIFFERENT_FRUITS = 0.9;
        final int UNITS_FOR_REDUCTION = 10;
        final int DIFFERENT_FRUITS_FOR_REDUCTION = 5;
        double totalPrice = 0.;
        int countValidFruits = 0;
        Map<String,Double> response = new LinkedHashMap<>();
        StringBuilder listOfFruits = new StringBuilder();

        for(RequestOrderItem orderItem : orderItems){
            Long id = fruitsRepository.findIdByType(orderItem.getType());

            try {
                if (id == null) { // The fruit Type doesn't exist
                    sendAlertMessage("The fruit with type " + orderItem.getType() + " doesn't exist.");
                    throw new MyResourceNotFoundException("ER03", "The fruit with current type doesn't exist: " + orderItem.getType());
                }
                Fruit fruit = fruitsRepository.findById(id).orElseThrow(() -> new MyResourceNotFoundException("ER01", "The fruit with current ID doesn't exist: " + id));

                if (orderItem.getQuantity() <= fruit.getQuantity()) { // Enough fruit units for this order
                    double currentFruitPrice = fruit.getPrice() * orderItem.getQuantity() * (orderItem.getQuantity() > UNITS_FOR_REDUCTION ? FACTOR_UNITS_FRUIT : 1.);
                    totalPrice += currentFruitPrice;

                    response.put(fruit.getType(), currentFruitPrice); // Save current fruit price

                    fruit.setQuantity(fruit.getQuantity() - orderItem.getQuantity()); // update quantity of current fruit
                    fruitsRepository.save(fruit);

                    listOfFruits.append(orderItem.getType()).append(':').append(orderItem.getQuantity()).append(", "); // generate list of fruits in string

                    countValidFruits++;

                } else { // Not enough fruit units for this order, send an alarm message
                    sendAlertMessage("Not enough units of " + orderItem.getType() + ", current quantity: " + fruit.getQuantity());
                    throw new MyResourceNotFoundException("ER04","Not enough units of " + orderItem.getType() + ", current quantity: " + fruit.getQuantity());
                }
            }catch (MyResourceNotFoundException e){
                ResponsePrice responseOrder = ResponsePrice.builder()
                        .code(e.getErrorCode())
                        .message(e.getMessage())
                        .orderPrice(null)
                        .build();
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseOrder);
            }
        }
        // Discount in function of nb of different fruits in order
        totalPrice *= (countValidFruits > DIFFERENT_FRUITS_FOR_REDUCTION ? FACTOR_DIFFERENT_FRUITS:1.);
        response.put("Total Price", totalPrice);

        // Create response DTO
         ResponsePrice responseOrder = ResponsePrice.builder()
                                .code("0000")
                                .message(null)
                                .orderPrice(response)
                                .build();

        // Create a record of current order in the table Order
        Order currentOrder = new Order();
        currentOrder.setListOfFruits(listOfFruits.substring(0, listOfFruits.length()-2 )); // erase the last ", "
        currentOrder.setTotalPrice(totalPrice);
        orderRepository.save(currentOrder); // Save the currentOrder entity to the database

        return ResponseEntity.ok(responseOrder);
    }
}
