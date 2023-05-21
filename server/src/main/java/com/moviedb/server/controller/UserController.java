package com.moviedb.server.controller;

import com.moviedb.server.payload.AddUserRequest;
import com.moviedb.server.payload.LoginRequest;
import com.moviedb.server.service.AuthService;
import com.moviedb.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addUser(@RequestBody AddUserRequest addUserRequest) {

        int user = userService.addUser(addUserRequest);

        if (user != 0) {
            // Successful login
            return ResponseEntity.ok(user);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
