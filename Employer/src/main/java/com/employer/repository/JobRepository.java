package com.employer.repository;

import com.employer.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findByJobStatus (Boolean jobStatus);
    List<Job> findByUsername (String username);
}
