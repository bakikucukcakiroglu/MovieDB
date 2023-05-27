package com.moviedb.server.controller;

import com.moviedb.server.payload.*;
import com.moviedb.server.service.DirectorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/director")
@CrossOrigin(origins = "http://localhost:3000")
public class DirectorController {

    private final DirectorService directorService;

    @Autowired
    public DirectorController(DirectorService directorService) {
        this.directorService = directorService;
    }

    @GetMapping("/available-theaters/{date}/{slot}")
    public ResponseEntity<Object> getAvailableTheaters(@PathVariable Map<String, String> pathVariables) {

        try {
            List<Map<String, Object>> theaters = directorService.getAvailableTheaters(pathVariables.get("date"), pathVariables.get("slot"));

            return ResponseEntity.ok(theaters);

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

        try {
            int user = directorService.addMovie(addMovieRequest);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PostMapping("/add-session")
    public ResponseEntity<Object> addSession(@RequestBody AddSessionRequest addSessionRequest) {


        try {
            int user = directorService.addSession(addSessionRequest);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PostMapping("/add-predecessor")
    public ResponseEntity<Object> addPredecessor(@RequestBody AddPredecessorRequest addPredecessorRequest) {

        try {
            int user = directorService.addPredecessor(addPredecessorRequest);

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @GetMapping("/directors-sessions/{directorUsername}")
    public ResponseEntity<Object> getDirectorsSessions(@PathVariable String directorUsername) {

        try{
            List<Map<String, Object>> movies = directorService.getDirectorsSessions(directorUsername);

            return ResponseEntity.ok(movies);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PostMapping("/audience")
    public ResponseEntity<Object> getAllAudience(@RequestBody GetAudienceRequest getAudienceRequest) {

        try{
            List<Map<String, Object>> audience = directorService.getAllAudience(getAudienceRequest);

            return ResponseEntity.ok(audience);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PutMapping ("/update-movie")
    public ResponseEntity<Object> updateMovie(@RequestBody UpdateMovieRequest updateMovieRequest) {

        try{

            int user = directorService.updateMovie(updateMovieRequest);

            return ResponseEntity.ok(user);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }
}
