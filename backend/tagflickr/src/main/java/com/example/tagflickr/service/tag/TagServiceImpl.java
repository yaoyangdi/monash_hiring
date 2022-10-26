package com.example.tagflickr.service.tag;

import com.example.tagflickr.exception.CustomException;
import com.example.tagflickr.model.Tag;
import com.example.tagflickr.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class TagServiceImpl implements TagService{
    @Autowired
    TagRepository tagRepository;

    @Override
    public void addTag(Tag tag) {
        if(Objects.isNull((tagRepository.findByName(tag.getName())))){
            // save the tag only there not yet existing in db
            tagRepository.save(tag);
        }
    }
}
