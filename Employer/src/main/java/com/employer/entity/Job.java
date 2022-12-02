package com.employer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.ArrayList;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int jobId;
    private String username;
    private String jobTitle;
    private String jobDescription;
    private ArrayList skillsRequired;
    private String expRequired;
    private Boolean jobStatus;
    private String companyName;

}
