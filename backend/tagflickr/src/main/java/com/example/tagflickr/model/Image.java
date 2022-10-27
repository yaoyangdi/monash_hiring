package com.example.tagflickr.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            }, mappedBy = "images")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private List<Tag> tags = new ArrayList<>();


    public Image(String title, String url) {
        this.title = title;
        this.url = url;
    }

    public void addTag(Tag tag) {
        this.tags.add(tag);
        tag.getImages().add(this);
    }

    public void removeTag(long tagId) {
        Tag tag = this.tags.stream().filter(t -> t.getTag_id() == tagId).findFirst().orElse(null);
        if (tag != null) {
            this.tags.remove(tag);
            tag.getImages().remove(this);
        }
    }

}
