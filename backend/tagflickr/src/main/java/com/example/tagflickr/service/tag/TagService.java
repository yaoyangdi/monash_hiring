package com.example.tagflickr.service.tag;

import com.example.tagflickr.model.Image;
import com.example.tagflickr.model.Tag;

import java.util.List;
import java.util.Set;

public interface TagService {
    void addTag(String name, Image image);

    List<Tag> getAll();

    Set<Image> getImagesByTagName(String name);

    void deleteAllTags();
}
