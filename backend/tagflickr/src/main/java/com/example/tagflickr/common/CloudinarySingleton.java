package com.example.tagflickr.common;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

public class CloudinarySingleton {
    private static CloudinarySingleton instance;
    private Cloudinary cloudinary;

    // Constructor
    private CloudinarySingleton() {
        this.cloudinary =  new Cloudinary(
                ObjectUtils.asMap(
                        "cloud_name", System.getenv("CLOUD_NAME"),
                        "api_key", System.getenv("CLOUD_API_KEY"),
                        "api_secret", System.getenv("CLOUD_API_SECRET"),
                        "secure", true)
        );
    }

    public static CloudinarySingleton getInstance() {
        if (instance == null) {
            instance = new CloudinarySingleton();
        }
        return instance;
    }

    public Cloudinary getCloudinary() {
        return cloudinary;
    }
}
