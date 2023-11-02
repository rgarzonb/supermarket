package com.supermarket.controller;

import com.supermarket.dto.ResponseOrder;
import com.supermarket.dto.ResponsePrice;
import com.supermarket.dto.RequestOrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import com.supermarket.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@Validated
@CrossOrigin(origins="http://localhost:3000/")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // Test in postman -> http://localhost:8080/api/v1/orders?page=1&itemsPerPage=4
    @GetMapping("/orders")
    public ResponseEntity<ResponseOrder> getPaginatedOrders(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "0") int itemsPerPage) throws Exception {
        try{
            return orderService.getPaginatedOrders(page, itemsPerPage);
        }catch (HttpClientErrorException.BadRequest | HttpMessageNotReadableException e ){
            // Handle HTTP-related exceptions (e.g., bad request, invalid JSON)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseOrder.builder()
                    .code(String.valueOf(HttpStatus.BAD_REQUEST.value()))
                    .message(e.getMessage())
                    .orders(null)
                    .totalPages(0).build());
        }catch (Exception e){
            // Handle other unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseOrder.builder()
                    .code(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()))
                    .message("Internal server error")
                    .orders(null)
                    .totalPages(0).build());
        }
    }

    @PostMapping("/orders")
    public ResponseEntity<ResponsePrice> calculateOrderPrice(@RequestBody List<RequestOrderItem> orderItems) {
        // @RequestBody: Tells Spring to map the content of the HTTP request body (Json, Xml) to the orderItems parameter
        try{
            return orderService.calculateOrderPrice(orderItems);
        }catch (HttpClientErrorException.BadRequest | HttpMessageNotReadableException e){
            // Handle HTTP-related exceptions (e.g., bad request, invalid JSON)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponsePrice.builder()
                    .code(String.valueOf(HttpStatus.BAD_REQUEST.value()))
                    .message(e.getMessage())
                    .orderPrice(null)
                    .build());
        } catch (Exception e) {
            // Handle other unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponsePrice.builder()
                    .code(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()))
                    .message("Internal server error")
                    .orderPrice(null)
                    .build());
        }
    }
}
