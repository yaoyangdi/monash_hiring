package com.example.tagflickr.controller;

import com.example.tagflickr.common.ApiResponse;
import com.example.tagflickr.model.Image;
import com.example.tagflickr.model.Tag;
import com.example.tagflickr.service.tag.TagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteAll() {
        try{
            tagService.deleteAllTags();
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(true, "Delete successfully"), HttpStatus.ACCEPTED);
    }
}
