package com.example.tagflickr.service.image;

import com.example.tagflickr.model.Image;

import java.util.List;

public interface ImageService {
    void addImage(Image image);

    List<Image> getAll();

    void deleteAllImages();
}
