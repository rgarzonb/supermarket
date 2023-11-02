package com.supermarket.dto;

import com.supermarket.model.Fruit;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class ResponseFruit implements Serializable {

    private String code;
    private String message;

    private List<Fruit> fruits;
    private long totalPages;
}
