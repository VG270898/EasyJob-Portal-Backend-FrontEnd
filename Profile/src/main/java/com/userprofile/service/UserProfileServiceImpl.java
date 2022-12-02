package com.userprofile.service;

import com.userprofile.dto.ApplicantsDTO;
import com.userprofile.model.UserJobs;
import com.userprofile.model.UserProfile;
import com.userprofile.model.UserResume;
import com.userprofile.repository.UserJobsRepo;
import com.userprofile.repository.UserProfileRepository;
import com.userprofile.repository.UserResumeRepo;
import com.userprofile.util.ResumeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class UserProfileServiceImpl {

    @Autowired
    private UserProfileRepository profileRepository;

    @Autowired
    private UserJobsRepo userJobsRepo;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    UserResumeRepo userResumeRepo;

    // Adding profile
    public UserProfile addUser(UserProfile profile){
        return profileRepository.save(profile);
    }

    // View Profile
    public UserProfile viewProfileById(String username){
        return profileRepository.findById(username).orElse(null);
    }

    // Update Profile
    public UserProfile updateUser(UserProfile user){
        return profileRepository.save(user);
    }

    //get applied jobs
    public List<UserJobs> getAppliedJobs(String username){
        return userJobsRepo.findByUsername(username);
    }

    public String applyJob(UserJobs job){
        userJobsRepo.save(job);
        return "Job Applied";
    }


    public String shortlistApplicant(String username,int jobId){
        UserJobs userJobs = userJobsRepo.findUserJobByUsernameJobId(username,jobId);
        userJobs.setApplyStatus(true);
        userJobsRepo.save(userJobs);
        return "Short Listed";
    }


    public List<UserJobs> getUserJobsByUsernameCompanyName(String username,String companyName){
        return userJobsRepo.findUserJobByUsernameCompanyName(username,companyName);
    }




    public List<UserProfile> getApplicants(String companyName){
        Collection usernames = userJobsRepo.findUsernameByCompanyName(companyName);
        return userProfileRepository.findUserProfileByUsername(usernames);
    }

    public String uploadResume(MultipartFile file, String username) throws IOException {

        UserResume userResume = userResumeRepo.save(UserResume.builder()
                .name(file.getOriginalFilename())
                .type(file.getContentType())
                .resumeData(ResumeUtils.compressImage(file.getBytes()))
                .username(username).build());
        if (userResume != null) {
            return "file uploaded successfully : " + file.getOriginalFilename();
        }
        return null;
    }

    public byte[] downloadImage(String username){
        Optional<UserResume> dbImageData = userResumeRepo.findById(username);
        byte[] images=ResumeUtils.decompressImage(dbImageData.get().getResumeData());
        return images;
    }
}
