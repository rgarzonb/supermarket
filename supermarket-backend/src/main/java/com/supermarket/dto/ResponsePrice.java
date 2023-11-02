package com.supermarket.dto;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.Map;

@Data
@Builder
public class ResponsePrice implements Serializable {

    private String code;
    private String message;

    private Map<String,Double> orderPrice;
}
