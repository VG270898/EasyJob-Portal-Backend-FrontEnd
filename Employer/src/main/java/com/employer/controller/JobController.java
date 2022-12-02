package com.employer.controller;

import com.employer.entity.Job;
import com.employer.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/job")
public class JobController {

    @Autowired
    private EmployerService empService;

    @PutMapping("/addjob/{username}")
    public ResponseEntity addJob(@RequestBody Job job, @PathVariable String username){
        return ResponseEntity.ok(empService.addJob(job, username));
    }

    @GetMapping("/getjobs")
    public ResponseEntity getAllJobs(){
        return ResponseEntity.ok(empService.getAllJobs());
    }

    @GetMapping("/getjob/{username}")
    public ResponseEntity getJobByUsername(@PathVariable String username) throws Exception {
        return ResponseEntity.ok(empService.getJobByUsername(username));
    }

    @DeleteMapping("/deletejob/{id}")
    public ResponseEntity deleteJob(@PathVariable int id){
        return ResponseEntity.ok(empService.deleteJob(id));
    }

    @GetMapping("/getactivejobs")
    public ResponseEntity getTrueJobsByStatus() throws Exception {
        return ResponseEntity.ok(empService.getTrueJobsByStatus());
    }

    @GetMapping("/getpendingjobs")
    public ResponseEntity getFalseJobsByStatus() throws Exception {
        return ResponseEntity.ok(empService.getFalseJobsByStatus());
    }

    @PutMapping("/verifyjob/{jobId}")
    public String verifyJob (@PathVariable int jobId) {
        return empService.verifyJob(jobId);
    }


    
}
