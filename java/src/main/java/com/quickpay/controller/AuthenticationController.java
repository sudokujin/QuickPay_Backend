package com.quickpay.controller;

import com.quickpay.dao.UserDao;
import com.quickpay.model.LoginDto;
import com.quickpay.model.LoginResponseDto;
import com.quickpay.model.RegisterUserDto;
import com.quickpay.model.User;
import com.quickpay.security.jwt.JWTFilter;
import com.quickpay.security.jwt.TokenProvider;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.security.PermitAll;
import javax.validation.Valid;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin
@RestController
public class AuthenticationController {
    private final TokenProvider tokenProvider;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private UserDao userDao;

    public AuthenticationController(TokenProvider tokenProvider, AuthenticationManagerBuilder authenticationManagerBuilder, UserDao userDao) {
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.userDao = userDao;
    }

    @GetMapping("/user/{username}")
    public User getUserByUsername(@PathVariable String username) throws SQLException {
        return userDao.findByUsername(username);
    }

    @GetMapping("/user/id")
    public ResponseEntity<Map<String, Integer>> getUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println(principal);

        if (principal instanceof org.springframework.security.core.userdetails.User) {
            String username = ((org.springframework.security.core.userdetails.User) principal).getUsername();
            int id = userDao.findIdByUsername(username);
            Map<String, Integer> map = new HashMap<>();
            map.put("id", id);
            return ResponseEntity.ok(map);
        }

        Map<String, Integer> errorMap = new HashMap<>();
        errorMap.put("id", -1);
        return ResponseEntity.ok(errorMap);
    }


    @GetMapping("/user")
    public User getUser() throws SQLException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof User) {
            String username = ((UserDetails) principal).getUsername();
            return userDao.findByUsername(username);
        }

        return null;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginDto loginDto) throws SQLException {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.createToken(authentication, true);

        User user = userDao.findByUsername(loginDto.getUsername());

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JWTFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
        return new ResponseEntity<>(new LoginResponseDto(jwt, user), httpHeaders, HttpStatus.OK);
    }

    @PermitAll
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/register")
    public void register(@Valid @RequestBody RegisterUserDto newUser) throws SQLException {
        try {
            User user = userDao.findByUsername(newUser.getUsername());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User Already Exists.");
        } catch (UsernameNotFoundException e) {
            User user = new User(newUser.getUsername(), newUser.getPassword(),
                    "USER", newUser.getEmail(), newUser.getBirthDate(), newUser.getFirstName(), newUser.getLastName(),
                    newUser.getPhoneNumber(), newUser.getAddress(), newUser.getCity(), newUser.getState(), newUser.getZipCode());

            user.setAuthorities("USER");
            userDao.create(user);
        }
    }
}