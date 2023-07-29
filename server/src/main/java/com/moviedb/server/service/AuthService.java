package com.moviedb.server.service;

import com.moviedb.server.payload.LoginRequest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {

    private final JdbcTemplate jdbcTemplate;

    public AuthService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Map<String, Object> login(LoginRequest loginRequest) {
        String sql = "SELECT * FROM DatabaseManagers WHERE username = ? AND password_ = ?";
        try {
            Map<String, Object> result = jdbcTemplate.queryForMap(sql, loginRequest.getUsername(), loginRequest.getPassword());
            if (result != null) {
                result.put("type", "database_manager");
                return result;
            }
        } catch (EmptyResultDataAccessException e) {
            // User not found in DatabaseManagers table
        }

        sql = "SELECT * FROM Directors WHERE username = ? AND password_ = ?";
        try {
            Map<String, Object> result = jdbcTemplate.queryForMap(sql, loginRequest.getUsername(), loginRequest.getPassword());
            if (result != null) {
                result.put("type", "director");
                return result;
            }
        } catch (EmptyResultDataAccessException e) {
            // User not found in Directors table
        }

        sql = "SELECT * FROM Audiences WHERE username = ? AND password_ = ?";
        try {
            Map<String, Object> result = jdbcTemplate.queryForMap(sql, loginRequest.getUsername(), loginRequest.getPassword());
            if (result != null) {
                result.put("type", "audience");
                return result;
            }
        } catch (EmptyResultDataAccessException e) {
            // User not found in Audiences table
        }

        // If no matching user is found, return null or handle the case as needed
        return null;
    }


}
