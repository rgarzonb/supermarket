package com.supermarket.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.io.Serial;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
//  ResponseStatus is used to specify the HTTP status code that should be returned when an instance of the
//  ResourceNotFoundException class is thrown and not caught within a Spring MVC or Spring Web application.
//  In this case, sets the HTTP status code to 404 (NOT FOUND) when an instance of ResourceNotFoundException is thrown
public class ResourceNotFoundException extends RuntimeException{

    @Serial
    private static final long serialVersionUID = 1L;
    //special field in a serializable class that serves as a version identifier for that class

    public ResourceNotFoundException(String message) {
        super(message);
    }
}

