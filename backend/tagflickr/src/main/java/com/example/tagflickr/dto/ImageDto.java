package com.example.tagflickr.dto;

import com.fasterxml.jackson.annotation.JsonPropertyDescription;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@Data
public class ImageDto {
    private String title;
    private String tags;
    private MultipartFile image;

    public ImageDto(String title, String tags, MultipartFile image) {
        this.title = title;
        this.tags = tags;
        this.image = image;
    }
}
