package com.example.tagflickr.controller;

import com.example.tagflickr.model.Image;
import com.example.tagflickr.model.Tag;
import com.example.tagflickr.service.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/tag")
@CrossOrigin
public class TagController {
    @Autowired
    TagService tagService;

    @GetMapping
    public List<Tag> allTags(){
        return tagService.getAll();
    }

    @GetMapping("/getImagesByTag")
    public Set<Image> getImageByTagName(@RequestParam("name") String name){
        return tagService.getImagesByTagName(name);
    }

}
