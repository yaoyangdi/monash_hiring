package com.example.tagflickr.exception;

public class CustomException extends IllegalArgumentException {
    public CustomException(String msg) {
        super(msg);
    }
}
