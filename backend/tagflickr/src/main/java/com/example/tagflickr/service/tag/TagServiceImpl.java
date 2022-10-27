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

    /**
     * Create a tag entity
     */
    @Override
    public void addTag(String name, Image image) {
        Tag tag = tagRepository.findByName(name);
        // Check if there already exist the tag  (tag name in db is unique)
        if(Objects.isNull((tag))){
            // save the tag only if the tag is not yet existing in db
            Tag new_tag = new Tag(name, image);
            tagRepository.save(new_tag);
        } else {
            tag.addImage(image); // already exist then update the image list in the tag entity
            tagRepository.save(tag);
        }
    }

    /**
     * Get all tags
     */
    @Override
    public List<Tag> getAll() {
        return tagRepository.findAll();
    }

    /**
     * Get all selected images by the input tag name(s)
     */
    @Override
    public Set<Image> getImagesByTagName(String name) {
        Set<Image> images = new HashSet<>(); // use set for adding distinct images
        if (name.contains(",")) {           // Split the input tag names in list format only if the input contains comma character
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
        } else {   // Otherwise we do not need to convert to list format
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

    /**
     * Delete all tags
     */
    @Override
    public void deleteAllTags() {
        tagRepository.deleteAll();
    }

}
