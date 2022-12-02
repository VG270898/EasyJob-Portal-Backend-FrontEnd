package com.Registration.service;

import com.Registration.model.User;
import com.Registration.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findById(username).orElse(null);
        if(user ==null){
            throw new UsernameNotFoundException("User Not Found");
        }
        return new MyUserDetails(user);
    }
}
