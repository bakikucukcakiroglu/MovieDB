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

        try {
            int user = userService.addMovie(addMovieRequest);

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
            int user = userService.addSession(addSessionRequest);

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
            int user = userService.addPredecessor(addPredecessorRequest);

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

            List<Map<String, Object>> movies = userService.getDirectorsSessions(directorUsername);

            return ResponseEntity.ok(movies);

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

            int user = userService.updateMovie(updateMovieRequest);

            return ResponseEntity.ok(user);

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

            List<Map<String, Object>> audience = userService.getAllAudience(getAudienceRequest);

            return ResponseEntity.ok(audience);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
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

    @GetMapping("/available-theaters/{date}/{slot}")
    public ResponseEntity<Object> getAvailableTheaters(@PathVariable Map<String, String> pathVariables) {


        try {
            List<Map<String, Object>> theaters = userService.getAvailableTheaters(pathVariables.get("date"), pathVariables.get("slot"));

            return ResponseEntity.ok(theaters);

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }

    }


    @GetMapping("/tickets/{username}")
    public ResponseEntity<Object> getAllDirectors(@PathVariable String username) {

        try{

            List<Map<String, Object>> tickets = userService.getAllTickets(username);
            return ResponseEntity.ok(tickets);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PostMapping("/buy-ticket")
    public ResponseEntity<Object> buyTicket(@RequestBody BuyTicketRequest buyTicketRequest) {


        try {
            int response = userService.buyTicket(buyTicketRequest);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }


}
