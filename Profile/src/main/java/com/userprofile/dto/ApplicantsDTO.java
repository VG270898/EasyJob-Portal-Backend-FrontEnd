package com.userprofile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ApplicantsDTO {
    private String username;
    private String fullName;
    private String aadharNo;
    private String college;
    private String contactNo;
    private String highestQualification;
    private ArrayList skills;
    private String yearOfExperience;
    private String pastEmployer;
    private String address;
    private String jobTitle;
    private String jobDescription;
}
