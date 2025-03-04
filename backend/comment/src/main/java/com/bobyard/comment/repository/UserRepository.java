package com.bobyard.comment.repository;

import com.bobyard.comment.model.UserComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserComment, Long> {
}
