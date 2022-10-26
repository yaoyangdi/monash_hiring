package com.example.tagflickr.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Table(name="IMAGE")
@NoArgsConstructor
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long image_id;

    @Column(name="title")
    private String title;

    @Column(name="url", nullable = false)
    private String url;

    public Image(String title, String url) {
        this.title = title;
        this.url = url;
    }
}
