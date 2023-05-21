package com.moviedb.server.service;

import com.moviedb.server.payload.AddUserRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final JdbcTemplate jdbcTemplate;

    public UserService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int addUser(AddUserRequest addUserRequest) {

        if(addUserRequest.getUser_type().equals( "audience")){

            String sql = " INSERT INTO Audiences(username, password_, name_, surname) VALUES ( ? , ? , ? , ? )";
            return jdbcTemplate.update(sql, addUserRequest.getUsername(), addUserRequest.getPassword_(), addUserRequest.getName_(), addUserRequest.getSurname());

        }else{

            String sql = " INSERT INTO Directors(username, password_, name_, surname, nationality, platform_id) VALUES ( ? , ? , ? , ? , ? , ?)";
            return jdbcTemplate.update(sql, addUserRequest.getUsername(), addUserRequest.getPassword_(), addUserRequest.getName_(), addUserRequest.getSurname(), addUserRequest.getNationality(), addUserRequest.getPlatform_id());

        }


    }
}
