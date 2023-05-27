package com.moviedb.server.controller;

import com.moviedb.server.payload.*;
import com.moviedb.server.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/manager")
@CrossOrigin(origins = "http://localhost:3000")
public class ManagerController {

    private final ManagerService managerService;

    @Autowired
    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @PostMapping("/add")
    public ResponseEntity<Object> addUser(@RequestBody AddUserRequest addUserRequest) {
        try {
            int user = managerService.addUser(addUserRequest);

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
            int user = managerService.deleteUser(username);

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

            int user = managerService.updateDirector(updateDirectorPlatformRequest);

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

            List<Map<String, Object>> directors = managerService.getAllDirectors();
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

            List<Map<String, Object>> ratings = managerService.getAllRatingsOfAudience(username);

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

            List<Map<String, Object>> movies = managerService.getDirectorsMovies(directorUsername);

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

            Map<String, Object> rating = managerService.getAverageRatingOfMovie(movieID);

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
            int user = managerService.addTheater(addTheaterRequest);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

}
