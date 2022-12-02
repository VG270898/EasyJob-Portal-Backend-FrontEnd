package com.userprofile.controller;

import com.userprofile.dto.ApplicantsDTO;
import com.userprofile.model.UserJobs;
import com.userprofile.model.UserProfile;
import com.userprofile.model.UserResume;
import com.userprofile.repository.UserProfileRepository;
import com.userprofile.repository.UserResumeRepo;
import com.userprofile.service.UserProfileServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/profile")
@CrossOrigin(value = {"*"}, exposedHeaders = {"Content-Disposition"})
public class UserProfileController {

    @Autowired
    private UserProfileServiceImpl profileService;

    @Autowired
    private UserResumeRepo userResumeRepo;

    @GetMapping("/view/{username}")
    public ResponseEntity<UserProfile> viewProfile(@PathVariable("username") String username) {
        return ResponseEntity.ok(profileService.viewProfileById(username));
    }

    @PutMapping("/update")
    public ResponseEntity<UserProfile> updateProfile(@RequestBody UserProfile profile) {
        return ResponseEntity.ok(profileService.updateUser(profile));
    }

    @GetMapping("/appliedJobs/{username}")
    public ResponseEntity<List<UserJobs>> getAppliedJobs(@PathVariable("username") String username) {
        return ResponseEntity.ok(profileService.getAppliedJobs(username));
    }

    @PutMapping("/applyjob")
    public ResponseEntity addJob(@RequestBody UserJobs job) {
        return ResponseEntity.ok(profileService.applyJob(job));
    }

    @GetMapping("/applicants/{companyName}")
    public ResponseEntity getApplicants(@PathVariable String companyName) {
        return ResponseEntity.ok(profileService.getApplicants(companyName));
    }

    @PutMapping("/shortlist/{username}/{jobId}")
    public String shortListApplicants(@PathVariable String username,@PathVariable int jobId){
        return profileService.shortlistApplicant(username,jobId);
    }


    @GetMapping("/getappliedjob/{username}/{companyName}")
    public ResponseEntity shortListApplicants(@PathVariable String username,@PathVariable String companyName){
        return ResponseEntity.ok(profileService.getUserJobsByUsernameCompanyName(username,companyName));
    }


    @PutMapping("/upload/{username}")
    public ResponseEntity<?> uploadResume(@RequestParam("application") MultipartFile file, @PathVariable String username) throws IOException {
        String uploadImage = profileService.uploadResume(file, username);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping("/{username}")
    public ResponseEntity<?> downloadResume(@PathVariable String username){
        byte[] imageData=profileService.downloadImage(username);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("application/pdf"))
                .body(imageData);

    }

}
