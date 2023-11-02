package com.supermarket.service;

import com.supermarket.dto.ResponseFruit;
import com.supermarket.exception.MyResourceNotFoundException;
import com.supermarket.exception.ResourceNotFoundException;
import com.supermarket.model.Fruit;
import com.supermarket.repository.FruitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FruitService {
    @Autowired
    private FruitRepository fruitRepository;

    public ResponseEntity<ResponseFruit> getPaginatedFruits( int page,
                                                      int itemsPerPage) throws Exception {

        try{
            ResponseFruit responseFruit;
            if(itemsPerPage > 0){
                // Create a PageRequest with the page number (page) and page size (itemsPerPage)
                PageRequest pageRequest = PageRequest.of(page, itemsPerPage);
                // Fetch the paginated data using the repository
                Page<Fruit> fruitPage = fruitRepository.findAll(pageRequest);
                if (fruitPage.getContent().isEmpty()) {
                    throw new MyResourceNotFoundException("ER01", "Failed to retrieve paginated fruits");
                }
                responseFruit = ResponseFruit.builder()
                        .code("0000")
                        .message(null)
                        .fruits(fruitPage.getContent())
                        .totalPages(fruitPage.getTotalPages()).build();
            }
            else {
                List<Fruit> fruitList = fruitRepository.findAll();
                if (fruitList.isEmpty()) {
                    throw new MyResourceNotFoundException("ER02", "Failed to retrieve the list of fruits");
                }
                responseFruit = ResponseFruit.builder()
                        .code("0000")
                        .message(null)
                        .fruits(fruitList)
                        .totalPages(1).build();
            }
            return (ResponseEntity.ok(responseFruit));
        }catch(MyResourceNotFoundException e){
            ResponseFruit responseFruit = ResponseFruit.builder()
                    .code(e.getErrorCode())
                    .message(e.getMessage())
                    .fruits(null)
                    .totalPages(0).build();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(responseFruit);
        }
    }

    public Fruit saveFruit(Fruit fruit){
        return fruitRepository.save(fruit);
    }

    public ResponseEntity<Fruit> listFruitById(Long id){
        Fruit fruit = fruitRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("The fruit with current ID doesn't exist: " + id));
        return ResponseEntity.ok(fruit); // return ok if the fruit is found
    }

    public ResponseEntity<Fruit> updateFruit(Long id, Fruit fruitRequest){
        // get the fruit to update, otherwise sent and exception not found
        Fruit fruit = fruitRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("The fruit with current ID doesn't exist: " + id));

        fruit.setType(fruitRequest.getType());
        fruit.setQuantity(fruitRequest.getQuantity());
        fruit.setPrice(fruitRequest.getPrice());

        Fruit updatedFruit = fruitRepository.save(fruit);
        return ResponseEntity.ok(updatedFruit);
    }

    public ResponseEntity<Map<String,Boolean>> eraseFruit(@PathVariable Long id){
        // get the fruit to delete, otherwise sent and exception not found
        Fruit fruit = fruitRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("The fruit with current ID doesn't exist: " + id));

        fruitRepository.delete(fruit);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
