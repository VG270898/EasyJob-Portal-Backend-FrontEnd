package com.employer.repository;

import com.employer.entity.EmployerProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EmployerRepository extends JpaRepository<EmployerProfile, String> {
    List<EmployerProfile> findByUsername(String username);
}
