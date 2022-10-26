package com.example.tagflickr.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Data
@Table(name="TAG")
@NoArgsConstructor
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name="name")
    private String name;

    @ManyToMany
    @JoinColumn(name="image_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private List<Image> images = new ArrayList<>();

    public Tag(String name, Image image) {
        this.name = name;
        this.images.add(image);
    }
}
