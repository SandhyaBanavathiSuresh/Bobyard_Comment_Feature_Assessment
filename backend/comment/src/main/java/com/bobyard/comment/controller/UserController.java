package com.bobyard.comment.controller;

import com.bobyard.comment.model.Comment;
import com.bobyard.comment.model.UserComment;
import com.bobyard.comment.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserComment> getAllComments() {
        return userService.getAllComments();
    }

    @PutMapping("/{id}")
    public UserComment updateComment(@PathVariable Long id, @RequestBody UserComment newText) {
        return userService.updateComment(id, newText);
    }

    @DeleteMapping("/{id}")
    public void deleteComment(@PathVariable Long id) {
        userService.deleteComment(id);
    }
}
