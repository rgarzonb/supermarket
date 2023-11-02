package com.supermarket.dto;

import lombok.Data;

// Data Transfer Object (DTO) representing the JSON structure
@Data
public class RequestOrderItem {
    private String type;
    private int quantity;
}
