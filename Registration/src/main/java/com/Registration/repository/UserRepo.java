package com.Registration.repository;

import com.Registration.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, String> {
    User findByEmail(String email);
}
