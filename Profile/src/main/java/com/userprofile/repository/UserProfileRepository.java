package com.userprofile.repository;

import com.userprofile.model.UserProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface UserProfileRepository extends JpaRepository<UserProfile, String> {

    @Query("SELECT u FROM UserProfile u WHERE u.username IN :username")
    List<UserProfile> findUserProfileByUsername(@Param("username") Collection<String> username);
}
