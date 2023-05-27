package com.moviedb.server.controller;

import com.moviedb.server.payload.*;
import com.moviedb.server.service.AudienceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/audience")
@CrossOrigin(origins = "http://localhost:3000")
public class AudienceController {

    private final AudienceService audienceService;

    @Autowired
    public AudienceController(AudienceService audienceService) {
        this.audienceService = audienceService;
    }

    @GetMapping("/sessions")
    public ResponseEntity<Object> getAllSessions() {

        List<Map<String, Object>> sessions = audienceService.getAllSessions();

        if (!sessions.isEmpty()) {
            return ResponseEntity.ok(sessions);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No sessions found");
        }
    }

    @PostMapping("/buy-ticket")
    public ResponseEntity<Object> buyTicket(@RequestBody BuyTicketRequest buyTicketRequest) {


        try {
            int response = audienceService.buyTicket(buyTicketRequest);

            return ResponseEntity.ok(response);

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

            List<Map<String, Object>> tickets = audienceService.getAllTickets(username);
            return ResponseEntity.ok(tickets);

        }catch (Exception e) {
            // Handle the DuplicateKeyException
            String errorMessage = e.getMessage();

            System.out.println(errorMessage);
            // Extract the relevant error information or customize the error message as needed
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }
}
