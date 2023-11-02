package com.supermarket.exception;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class MyResourceNotFoundException extends Exception {
    private String errorCode;

    public MyResourceNotFoundException(String errorCode, String message){
        super(message);
        this.errorCode = errorCode;
    }
}
