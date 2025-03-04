package com.bobyard.comment.service;

import com.bobyard.comment.model.Comment;
import com.bobyard.comment.model.UserComment;
import com.bobyard.comment.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<UserComment> getAllComments() {
        return userRepository.findAll();
    }

    public UserComment updateComment(Long id, UserComment newText) {
        UserComment comment = userRepository.findById(id).orElseThrow();
        comment.setText(newText.getText());
        comment.setTimestamp(Instant.now());  // Update timestamp
        return userRepository.save(comment);
    }

    public void deleteComment(Long id) {
        userRepository.deleteById(id);
    }
}
