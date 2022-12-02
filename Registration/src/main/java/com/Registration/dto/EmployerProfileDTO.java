package com.Registration.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class EmployerProfileDTO {
    private String username;
    private String companyName;
    private String ph;
}
