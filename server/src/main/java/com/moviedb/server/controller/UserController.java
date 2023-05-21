package com.moviedb.server.controller;

import com.moviedb.server.payload.AddMovieRequest;
import com.moviedb.server.payload.AddUserRequest;
import com.moviedb.server.payload.LoginRequest;
import com.moviedb.server.payload.UpdateDirectorPlatformRequest;
import com.moviedb.server.service.AuthService;
import com.moviedb.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.List;
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

    @DeleteMapping ("/delete/{username}")
    public ResponseEntity<Object> deleteUser(@PathVariable String username) {

        System.out.println("girdim " + username);

        int user = userService.deleteUser(username);

        if (user != 0) {
            // Successful login
            return ResponseEntity.ok(user);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PutMapping ("/update-platform")
    public ResponseEntity<Object> updateDirector(@RequestBody UpdateDirectorPlatformRequest updateDirectorPlatformRequest) {


        int user = userService.updateDirector(updateDirectorPlatformRequest);

        if (user != 0) {
            // Successful login
            return ResponseEntity.ok(user);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/directors")
    public ResponseEntity<Object> getAllDirectors() {

        List<Map<String, Object>> directors = userService.getAllDirectors();

        if (!directors.isEmpty()) {
            return ResponseEntity.ok(directors);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No directors found");
        }
    }

    @GetMapping("/ratings/{username}")
    public ResponseEntity<Object> getAllRatingsOfAudience(@PathVariable String username) {

        List<Map<String, Object>> ratings = userService.getAllRatingsOfAudience(username);

        if (!ratings.isEmpty()) {
            return ResponseEntity.ok(ratings);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No directors found");
        }
    }

    @GetMapping("/average-rating/{movieID}")
    public ResponseEntity<Object> getAverageRatingOfMovie(@PathVariable String movieID) {

        Map<String, Object> rating = userService.getAverageRatingOfMovie(movieID);

        if (rating != null) {
            return ResponseEntity.ok(rating);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Average Rating could not be fetched");
        }
    }

    @GetMapping("/directors-movies/{directorUsername}")
    public ResponseEntity<Object> getDirectorsMovies(@PathVariable String directorUsername) {

        List<Map<String, Object>> movies = userService.getDirectorsMovies(directorUsername);

        if (!movies.isEmpty()) {
            return ResponseEntity.ok(movies);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Director's Movies could not be fetched");
        }
    }


    @PostMapping("/add-movie")
    public ResponseEntity<Object> addMovie(@RequestBody AddMovieRequest addMovieRequest) {



        int user = userService.addMovie(addMovieRequest);

        if (user != 0) {
            // Successful login
            return ResponseEntity.ok(user);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }


}
