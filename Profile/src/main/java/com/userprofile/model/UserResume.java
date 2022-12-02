package com.userprofile.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Lob;
import java.io.File;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class UserResume {
    @Id
    private String username;
    private String name;
    private String type;
    @Lob
    @Column(name = "resumeData",length = 1000)
    private byte[] resumeData;
}
