package com.userprofile.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserProfile {

    @Id
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
}
