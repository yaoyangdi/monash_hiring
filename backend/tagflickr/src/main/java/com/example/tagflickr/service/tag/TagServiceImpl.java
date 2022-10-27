package com.example.tagflickr.service.tag;

import com.example.tagflickr.model.Image;
import com.example.tagflickr.model.Tag;
import com.example.tagflickr.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TagServiceImpl implements TagService{
    @Autowired
    TagRepository tagRepository;

    @Override
    public void addTag(String name, Image image) {
        Tag tag = tagRepository.findByName(name);
        if(Objects.isNull((tag))){
            // save the tag only there not yet existing in db
            Tag new_tag = new Tag(name, image);
            tagRepository.save(new_tag);
        } else {
            tag.addImage(image); // already exist then adding the image with the tag
            tagRepository.save(tag);
        }
    }

    @Override
    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    @Override
    public Set<Image> getImagesByTagName(String name) {
        Set<Image> images = new HashSet<>(); // use set for adding distinct images
        if (name.contains(",")) {
            List<String> tags = Arrays.asList(name.split(","));
            for(int i = 0; i<tags.size(); i++) {
                Tag tag = tagRepository.findByName(tags.get(i));
                if(Objects.nonNull((tag))){
                    Object[] toArray = tag.getImages().toArray();
                    for(int j=0; j<toArray.length; j++){
                        images.add((Image) toArray[j]);
                    }
                }
            }
        } else {
            Tag tag = tagRepository.findByName(name);
            if(Objects.nonNull((tag))){
                Object[] toArray = tag.getImages().toArray();
                for(int j=0; j<toArray.length; j++){
                    images.add((Image) toArray[j]);
                }
            }
        }


        return images;
    }

    @Override
    public void deleteAllTags() {
        tagRepository.deleteAll();
    }

}
