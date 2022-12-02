package com.employer.service;

import com.employer.entity.EmployerProfile;
import com.employer.entity.Job;
import com.employer.repository.EmployerRepository;
import com.employer.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerService {

    @Autowired
    private JobRepository jobRepo;

    @Autowired
    private EmployerRepository empRepo;

    private EmployerProfile curEmp=new EmployerProfile();
    
    public Job addJob(Job job, String username){
        job.setUsername(username);
        job.setJobStatus(false);
        String companyName = empRepo.findById(username).get().getCompanyName();
        job.setCompanyName(companyName);
        return jobRepo.save(job);
    }

    public List<Job> getAllJobs(){
        return jobRepo.findAll();
    }

    public List<Job> getTrueJobsByStatus() throws Exception {
        if(jobRepo.findByJobStatus(true).isEmpty()){
            throw new Exception("No jobs available at the time.");
        } else {
            return jobRepo.findByJobStatus(true);
        }
    }

    public List<Job> getFalseJobsByStatus() throws Exception {
        if(jobRepo.findByJobStatus(false).isEmpty()){
            throw new Exception("No pending jobs available.");
        } else {
            return jobRepo.findByJobStatus(false);
        }
    }

    public List<Job> getJobByUsername(String username) throws Exception {
        if(jobRepo.findByUsername(username).isEmpty()){
            throw new Exception("No posted jobs.");
        }
        return jobRepo.findByUsername(username);
    }

    public String deleteJob(int id){
         jobRepo.deleteById(id);
         return "deleted";
    }

    public Job findJobById (int id){
        return jobRepo.findById(id).orElse(null);
    }

    //Employer
    public EmployerProfile addEmpDetails(EmployerProfile emp){
        return empRepo.save(emp);
    }

    public EmployerProfile getEmpByUsername(String username){
        return empRepo.findById(username).orElse(null);
    }

    public String verifyJob (int jobId){
        Job job = jobRepo.findById(jobId).orElse(null);
        job.setJobStatus(true);
        jobRepo.save(job);
        return "Job Verified!";
    }

}
