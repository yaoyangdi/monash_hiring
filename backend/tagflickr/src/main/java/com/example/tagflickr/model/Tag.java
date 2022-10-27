package com.example.tagflickr.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
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
    private Long tag_id;

    @Column(name="name")
    private String name;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "tag_images",
            joinColumns = { @JoinColumn(name = "image_id") },
            inverseJoinColumns = { @JoinColumn(name = "tag_id") })
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private List<Image> images = new ArrayList<>();

    /*  Constructor  */
    public Tag(String name, Image image) {
        this.name = name;
        addImage(image);
    }


    public void addImage(Image image) {
        this.images.add(image);
    }

    public void removeTag(long imageId) {
        Image image = this.images.stream().filter(i -> i.getImage_id() == imageId).findFirst().orElse(null);
        if (image != null) {
            this.images.remove(image);
        }
    }
}
