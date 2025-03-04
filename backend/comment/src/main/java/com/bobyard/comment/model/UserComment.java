package com.bobyard.comment.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import java.time.Instant;

@Entity
@Data
public class UserComment {

    @Id
    private Long id;
    private String author;
    private String text;
    private Instant timestamp;
    private int likes;
    private String image;
}
