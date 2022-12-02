package com.employer.controller;

import com.employer.entity.EmployerProfile;
import com.employer.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employer")
@CrossOrigin
public class EmployerController {

    @Autowired
    private EmployerService empService;

    @PutMapping("/addempdetails")
    public ResponseEntity addEmp(@RequestBody EmployerProfile emp) {
        return ResponseEntity.ok(empService.addEmpDetails(emp));
    }

    @GetMapping("/getemp/{username}")
    public ResponseEntity getEmpByUsername(@PathVariable String username) {
        return ResponseEntity.ok(empService.getEmpByUsername(username));
    }

}

