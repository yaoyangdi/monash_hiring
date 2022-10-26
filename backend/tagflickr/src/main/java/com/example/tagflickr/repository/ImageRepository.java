package com.example.tagflickr.repository;

import com.example.tagflickr.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ImageRepository extends JpaRepository<Image, Long> {
}
