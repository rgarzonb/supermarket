package com.supermarket.dto;

import com.supermarket.model.Order;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class ResponseOrder implements Serializable {

    private String code;
    private String message;

    private List<Order> orders;
    private long totalPages;
}
