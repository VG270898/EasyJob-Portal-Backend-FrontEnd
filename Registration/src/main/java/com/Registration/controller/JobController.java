package com.Registration.controller;

import com.Registration.dto.JobDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/job")
@CrossOrigin
public class JobController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String ADD_JOB = "http://localhost:7073/job/addjob/";
    private static final String GET_ALL_JOBS = "http://localhost:7073/job/getjobs";
    private static final String GET_JOB_BY_USERNAME = "http://localhost:7073/job/getjob/";
    private static final String GET_ACTIVE_JOBS = "http://localhost:7073/job/getactivejobs";
    private static final String GET_PENDING_JOBS = "http://localhost:7073/job/getpendingjobs";

    @PutMapping("/addjob")
    public ResponseEntity addJob(@RequestBody JobDTO jobDTO) throws JsonProcessingException {
        String response = null;
        String addJobBody = getJobBody(jobDTO);
        HttpHeaders addJobHeader = getHeaders();
        HttpEntity<String> addJobEntity = new HttpEntity<String>(addJobBody, addJobHeader);
        Object auth = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails)auth).getUsername();
        try{
            ResponseEntity<String> addJobResponse = restTemplate.exchange(ADD_JOB+username, HttpMethod.PUT,addJobEntity, String.class);

            if (addJobResponse.getStatusCode().equals(HttpStatus.OK)) {
                response="Job added Successfully!";
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getjobs")
    public ResponseEntity getAllJobs() throws JsonProcessingException {
        String response = null;
        List jobs = null;
        HttpHeaders getJobHeader = getHeaders();
        HttpEntity<String> getJobEntity = new HttpEntity<String>(getJobHeader);
        try{
            Object getJobResponse = restTemplate.exchange(GET_ALL_JOBS, HttpMethod.GET,getJobEntity, Object.class);

            if (((ResponseEntity) getJobResponse).getStatusCode().equals(HttpStatus.OK)) {
                jobs = (List) ((ResponseEntity) getJobResponse).getBody();
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/getjobbyusername")
    public ResponseEntity getJobByUsername() throws JsonProcessingException {
        String response = null;
        List jobs = null;
        HttpHeaders getJobHeader = getHeaders();
        HttpEntity<String> getJobEntity = new HttpEntity<String>(getJobHeader);
        Object auth = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails)auth).getUsername();
        try{
            Object getJobResponse = restTemplate.exchange(GET_JOB_BY_USERNAME+username, HttpMethod.GET,getJobEntity, Object.class);

            if (((ResponseEntity) getJobResponse).getStatusCode().equals(HttpStatus.OK)) {
                jobs = (List) ((ResponseEntity) getJobResponse).getBody();
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/getactivejobs")
    public ResponseEntity getActiveJobs() throws JsonProcessingException {
        String response = null;
        List activeJobs = null;
        HttpHeaders getJobHeader = getHeaders();
        HttpEntity<String> getJobEntity = new HttpEntity<String>(getJobHeader);
        try{
            Object getJobResponse = restTemplate.exchange(GET_ACTIVE_JOBS, HttpMethod.GET,getJobEntity, Object.class);

            if (((ResponseEntity) getJobResponse).getStatusCode().equals(HttpStatus.OK)) {
                activeJobs = (List) ((ResponseEntity) getJobResponse).getBody();
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
        return ResponseEntity.ok(activeJobs);
    }

    @GetMapping("/getpendingjobs")
    public ResponseEntity getPendingJobs() throws JsonProcessingException {
        String response = null;
        List pendingJobs = null;
        HttpHeaders getJobHeader = getHeaders();
        HttpEntity<String> getJobEntity = new HttpEntity<String>(getJobHeader);
        try{
            Object getJobResponse = restTemplate.exchange(GET_PENDING_JOBS, HttpMethod.GET,getJobEntity, Object.class);

            if (((ResponseEntity) getJobResponse).getStatusCode().equals(HttpStatus.OK)) {
                pendingJobs = (List) ((ResponseEntity) getJobResponse).getBody();
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
        return ResponseEntity.ok(pendingJobs);
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        return headers;
    }

    private String getJobBody(final JobDTO jobDTO) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(jobDTO);
    }
}
