package com.Registration.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobDTO {
    private String jobTitle;
    private String jobDescription;
    private ArrayList skillsRequired;
    private String expRequired;
}
