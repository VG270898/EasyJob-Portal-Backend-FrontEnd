package com.Registration.controller;

import com.Registration.dto.EmployerProfileDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

@RestController
@RequestMapping("/employer")
@CrossOrigin
public class EmployerController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String ADD_EMP_DETAILS = "http://localhost:7073/employer/addempdetails";
    private static final String GET_EMP_DETAILS = "http://localhost:7073/employer/getemp/";

    @PutMapping("/addempdetails")
    public ResponseEntity addEmpDetails(@RequestBody EmployerProfileDTO employerProfileDTO) throws JsonProcessingException {
        String response = null;
        String addEmpBody = getEmployerBody(employerProfileDTO);
        HttpHeaders addEmpHeader = getHeaders();
        HttpEntity<String> addEmpEntity = new HttpEntity<String>(addEmpBody, addEmpHeader);
        try{
            ResponseEntity<String> addEmpResponse = restTemplate.exchange(ADD_EMP_DETAILS, HttpMethod.PUT,addEmpEntity, String.class);

            if (addEmpResponse.getStatusCode().equals(HttpStatus.OK)) {
                response="Details added Successfully!";
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getemp")
    public ResponseEntity getEmpByUsername() throws JsonProcessingException {
        String response = null;
        HashMap empDetails = null;
        HttpHeaders getEmpHeader = getHeaders();
        HttpEntity<String> getEmpEntity = new HttpEntity<String>(getEmpHeader);
        Object auth = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = ((UserDetails)auth).getUsername();
        try{
            Object getEmpResponse = restTemplate.exchange(GET_EMP_DETAILS + username, HttpMethod.GET,getEmpEntity, Object.class);

            if (((ResponseEntity) getEmpResponse).getStatusCode().equals(HttpStatus.OK)) {
                empDetails = (HashMap) ((ResponseEntity) getEmpResponse).getBody();
            }
        }catch (Exception e){
            return ResponseEntity.ok(e.getMessage());
        }
        return ResponseEntity.ok(empDetails);
    }

    private HttpHeaders getHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", MediaType.APPLICATION_JSON_VALUE);
        headers.set("Accept", MediaType.APPLICATION_JSON_VALUE);
        return headers;
    }

    private String getEmployerBody(final EmployerProfileDTO employerProfileDTO) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(employerProfileDTO);
    }

}
