package com.example.tagflickr.service;

import com.example.tagflickr.model.Image;
import com.example.tagflickr.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class ImageServiceImpl implements ImageService{
    @Autowired
    ImageRepository imageRepository;


    @Override
    public void addImage(Image image) {
        // save the image
        imageRepository.save(image);
    }
}
