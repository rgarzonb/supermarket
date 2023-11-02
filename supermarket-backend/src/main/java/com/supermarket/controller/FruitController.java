package com.supermarket.controller;

import com.supermarket.dto.ResponseFruit;
import com.supermarket.model.Fruit;
import com.supermarket.service.FruitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.Map;

@RestController
@RequestMapping("api/v1")
@Validated // If validations are included in attributes (e.g., required parameter)
@CrossOrigin(origins="http://localhost:3000/")
// @CrossOrigin(origins="*")
public class FruitController {

    @Autowired
    private FruitService fruitService;

    // Test in postman -> http://localhost:8080/api/v1/fruits?page=1&itemsPerPage=4
    @GetMapping("/fruits")
    public ResponseEntity<ResponseFruit> getPaginatedFruits(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "0") int itemsPerPage) throws Exception {
        try{
            return fruitService.getPaginatedFruits(page, itemsPerPage);
        }catch (HttpClientErrorException.BadRequest | HttpMessageNotReadableException e ){
            // Handle HTTP-related exceptions (e.g., bad request, invalid JSON)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ResponseFruit.builder()
                    .code(String.valueOf(HttpStatus.BAD_REQUEST.value()))
                    .message(e.getMessage())
                    .fruits(null)
                    .totalPages(0).build());
        }catch (Exception e){
            // Handle other unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ResponseFruit.builder()
                    .code(String.valueOf(HttpStatus.INTERNAL_SERVER_ERROR.value()))
                    .message("Internal server error")
                    .fruits(null)
                    .totalPages(0).build());
        }
    }

    @PostMapping("/fruits")
    public Fruit saveFruit(@RequestBody Fruit fruit){
        return fruitService.saveFruit(fruit);
    }

    // If I want to list a fruit
    @GetMapping("/fruits/{id}") // used to map HTTP GET requests to a specific method
    public ResponseEntity<Fruit> listFruitById(@PathVariable Long id){
       return fruitService.listFruitById(id);
    }

    // If I want to update a fruit row
    @PutMapping("/fruits/{id}")
    public ResponseEntity<Fruit> updateFruit(@PathVariable Long id, @RequestBody Fruit fruitRequest){
        return fruitService.updateFruit(id, fruitRequest);
    }

    @DeleteMapping("/fruits/{id}")
    public ResponseEntity<Map<String,Boolean>> eraseFruit(@PathVariable Long id){
        return fruitService.eraseFruit(id);
    }
}
