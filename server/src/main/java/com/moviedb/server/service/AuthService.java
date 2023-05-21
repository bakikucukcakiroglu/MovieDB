package com.moviedb.server.service;

import com.moviedb.server.payload.LoginRequest;
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
        return jdbcTemplate.queryForMap(sql, loginRequest.getUsername(), loginRequest.getPassword());
    }
}
