package com.userprofile.repository;

import com.userprofile.model.UserResume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserResumeRepo extends JpaRepository<UserResume, String> {
    Optional<UserResume> findByName(String fileName);
}
