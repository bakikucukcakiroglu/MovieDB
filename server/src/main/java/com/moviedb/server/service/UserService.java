package com.moviedb.server.service;

import com.moviedb.server.payload.AddUserRequest;
import com.moviedb.server.payload.UpdateDirectorPlatformRequest;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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

    public int deleteUser(String username) {

        String sql = "DELETE FROM Audiences WHERE username = ?;";
        return jdbcTemplate.update(sql, username);

    }

    public int updateDirector(UpdateDirectorPlatformRequest updateDirectorPlatformRequest) {

        System.out.println("updateDirector: "+ updateDirectorPlatformRequest.getUsername() + " "+ updateDirectorPlatformRequest.getPlatform_id());

        String sql = "UPDATE Directors SET platform_id = ? WHERE username = ?";
        return jdbcTemplate.update(sql, updateDirectorPlatformRequest.getPlatform_id(), updateDirectorPlatformRequest.getUsername());
    }

    public List getAllDirectors() {

        System.out.println("getAllDirectories");

        String sql = "SELECT * FROM Directors";
        return jdbcTemplate.queryForList(sql);
    }

    public List getAllRatingsOfAudience(String username) {

        System.out.println("getAllRatings:: "+ username);

        String sql = "SELECT M.movie_name, R.movie_id, R.rating FROM  Movies M INNER JOIN Rates R  ON M.movie_id = R.movie_id AND R.username = ?";
        return jdbcTemplate.queryForList(sql, username);
    }
}
