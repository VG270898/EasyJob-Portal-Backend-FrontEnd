package com.userprofile.repository;

import com.userprofile.model.UserJobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;
import java.util.List;

public interface UserJobsRepo extends JpaRepository<UserJobs, Integer> {
    List<UserJobs> findByUsername(String username);
    UserJobs findByCompanyName(String companyName);

    @Query("SELECT u.username FROM UserJobs u WHERE u.companyName = ?1")
    Collection<String> findUsernameByCompanyName(String companyName);

    @Query("SELECT u FROM UserJobs u WHERE u.username = ?1 and u.jobId = ?2")
    UserJobs findUserJobByUsernameJobId (String username,int jobId);

    @Query("SELECT u FROM UserJobs u WHERE u.username = ?1 and u.companyName = ?2")
    List<UserJobs> findUserJobByUsernameCompanyName (String username,String companyName);
}
