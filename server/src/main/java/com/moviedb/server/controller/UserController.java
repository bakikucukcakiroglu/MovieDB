package com.moviedb.server.controller;

import com.moviedb.server.payload.*;
import com.moviedb.server.service.AuthService;
import com.moviedb.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
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
        try {
            int user = userService.addUser(addUserRequest);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @DeleteMapping ("/delete/{username}")
    public ResponseEntity<Object> deleteUser(@PathVariable String username) {

        try {
            int user = userService.deleteUser(username);

            if(user!=0){
                return ResponseEntity.ok(user);

            }else{

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user found with username: " + username);
            }

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PutMapping ("/update-platform")
    public ResponseEntity<Object> updateDirector(@RequestBody UpdateDirectorPlatformRequest updateDirectorPlatformRequest) {

        try {

            int user = userService.updateDirector(updateDirectorPlatformRequest);

            if(user!=0){
                return ResponseEntity.ok(user);

            }else{

                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No director found with username: " + updateDirectorPlatformRequest.getUsername());
            }

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @GetMapping("/directors")
    public ResponseEntity<Object> getAllDirectors() {

        try{

            List<Map<String, Object>> directors = userService.getAllDirectors();
            return ResponseEntity.ok(directors);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @GetMapping("/ratings/{username}")
    public ResponseEntity<Object> getAllRatingsOfAudience(@PathVariable String username) {


        try{

            List<Map<String, Object>> ratings = userService.getAllRatingsOfAudience(username);

            return ResponseEntity.ok(ratings);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @GetMapping("/directors-movies/{directorUsername}")
    public ResponseEntity<Object> getDirectorsMovies(@PathVariable String directorUsername) {

        try{

            List<Map<String, Object>> movies = userService.getDirectorsMovies(directorUsername);

            return ResponseEntity.ok(movies);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @GetMapping("/average-rating/{movieID}")
    public ResponseEntity<Object> getAverageRatingOfMovie(@PathVariable String movieID) {

        try{

            Map<String, Object> rating = userService.getAverageRatingOfMovie(movieID);

            return ResponseEntity.ok(rating);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PostMapping("/theater/add")
    public ResponseEntity<Object> addTheater(@RequestBody AddTheaterRequest addTheaterRequest) {
        try {
            int user = userService.addTheater(addTheaterRequest);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
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

    @PostMapping("/add-session")
    public ResponseEntity<Object> addSession(@RequestBody AddSessionRequest addSessionRequest) {



        int user = userService.addSession(addSessionRequest);

        if (user != 0) {
            // Successful login
            return ResponseEntity.ok(user);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/add-predecessor")
    public ResponseEntity<Object> addPredecessor(@RequestBody AddPredecessorRequest addPredecessorRequest) {



        int user = userService.addPredecessor(addPredecessorRequest);

        if (user != 0) {
            // Successful login
            return ResponseEntity.ok(user);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @GetMapping("/directors-sessions/{directorUsername}")
    public ResponseEntity<Object> getDirectorsSessions(@PathVariable String directorUsername) {

        List<Map<String, Object>> movies = userService.getDirectorsSessions(directorUsername);

        if (!movies.isEmpty()) {
            return ResponseEntity.ok(movies);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Director's Movies could not be fetched");
        }
    }

    @PutMapping ("/update-movie")
    public ResponseEntity<Object> updateMovie(@RequestBody UpdateMovieRequest updateMovieRequest) {


        int user = userService.updateMovie(updateMovieRequest);

        if (user != 0) {
            // Successful login
            return ResponseEntity.ok(user);
        } else {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    @PostMapping("/audience")
    public ResponseEntity<Object> getAllAudience(@RequestBody GetAudienceRequest getAudienceRequest) {

        List<Map<String, Object>> audience = userService.getAllAudience(getAudienceRequest);

        if (!audience.isEmpty()) {
            return ResponseEntity.ok(audience);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No audience found");
        }
    }

    @GetMapping("/sessions")
    public ResponseEntity<Object> getAllSessions() {

        List<Map<String, Object>> sessions = userService.getAllSessions();

        if (!sessions.isEmpty()) {
            return ResponseEntity.ok(sessions);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No sessions found");
        }
    }


}
