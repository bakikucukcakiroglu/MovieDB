package com.moviedb.server.service;

import com.moviedb.server.payload.*;
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

    public List getDirectorsMovies(String directorUsername) {

        System.out.println("directorUsername: "+ directorUsername);

        String sql = "SELECT S.session_id, M.movie_id, M.movie_name, S.theater_id, T.theater_district , S.time_slot FROM MovieSessions S, Movies M, Theaters T WHERE S.movie_id = M.movie_id AND S.theater_id = T.theater_id AND M.director_username = ?;";
        return jdbcTemplate.queryForList(sql, directorUsername);
    }
    public Map<String, Object> getAverageRatingOfMovie(String movieID) {

        System.out.println("movieRating: "+ movieID);

        String sql = "SELECT M.average_rating  FROM  Movies M WHERE M.movie_id = ?";
        return jdbcTemplate.queryForMap(sql, movieID);
    }


    public int addMovie(AddMovieRequest addMovieRequest) {

        String sql = " INSERT INTO Movies(movie_id, movie_name, duration, director_username, average_rating) VALUES ( ? , ? , ? , ? ,?)";
        return jdbcTemplate.update(sql, addMovieRequest.getMovie_id(), addMovieRequest.getMovie_name(), addMovieRequest.getDuration(), addMovieRequest.getDirector_username(), addMovieRequest.getAverage_rating());


    }

    public int addSession(AddSessionRequest addSessionRequest) {

        String sql = " INSERT INTO MovieSessions(session_id, movie_id, theater_id, date_, time_slot) VALUES ( ? , ? , ? , ? ,?)";
        return jdbcTemplate.update(sql, addSessionRequest.getSession_id(), addSessionRequest.getMovie_id(), addSessionRequest.getTheater_id(), addSessionRequest.getDate_(), addSessionRequest.getTime_slot());


    }

    public int addPredecessor(AddPredecessorRequest addPredecessorRequest) {

        String sql = " INSERT INTO movieprerequisites(movie_id_predecessor, movie_id_successor) VALUES ( ? , ?)";
        return jdbcTemplate.update(sql, addPredecessorRequest.getMovie_id_predecessor(), addPredecessorRequest.getMovie_id_successor());


    }

    public List getDirectorsSessions(String directorUsername) {

        System.out.println("directorUsername: "+ directorUsername);

        String sql = "SELECT S.session_id, M.movie_id, M.movie_name, S.theater_id, T.theater_district , S.time_slot FROM MovieSessions S, Movies M, Theaters T WHERE S.movie_id = M.movie_id AND S.theater_id = T.theater_id AND M.director_username = ?;";

        List<Map<String, Object>>  result= jdbcTemplate.queryForList(sql, directorUsername);

        for (int i = 0 ; i < result.size() ; i++ ){



            sql = "SELECT M.movie_id_predecessor FROM Movieprerequisites M  WHERE M.movie_id_successor = '" + result.get(i).get("movie_id")  +"';" ;

            System.out.println(sql);

            result.get(i).put("predecessors", jdbcTemplate.queryForList(sql) );

        }

        return result;
    }

    public int updateMovie(UpdateMovieRequest updateMovieRequest) {

        System.out.println("updateDirector: "+ updateMovieRequest.getMovie_id() + " "+ updateMovieRequest.getMovie_name());

        String sql = "UPDATE Movies SET movie_name = ? WHERE movie_id = ? AND director_username = ?";
        return jdbcTemplate.update(sql, updateMovieRequest.getMovie_name(), updateMovieRequest.getMovie_id(), updateMovieRequest.getDirector_username());
    }

    public List getAllAudience(GetAudienceRequest getAudienceRequest) {

        System.out.println("getAllAudience: " + getAudienceRequest.getDirector_username()+ "  " + getAudienceRequest.getMovie_id());

        String sql = "SELECT A.username, A.name_, A.surname FROM Audiences A, Boughttickets B WHERE B.username = A.username AND B.session_id IN (SELECT DISTINCT S.session_id FROM  Movies M, Moviesessions S WHERE M.director_username = ? AND M.movie_id = ? AND S.movie_id = ?)";
        return jdbcTemplate.queryForList(sql, getAudienceRequest.getDirector_username(), getAudienceRequest.getMovie_id(), getAudienceRequest.getMovie_id());
    }

    public List getAllSessions() {

        System.out.println("getAllSessions");

        String sql = "SELECT S.session_id, M.movie_id, M.movie_name, D.surname, D.platform_id, S.theater_id, S.time_slot FROM MovieSessions S, Movies M, Directors D WHERE S.movie_id = M.movie_id AND M.director_username = D.username";

        List<Map<String, Object>>  result = jdbcTemplate.queryForList(sql);

        for (int i = 0 ; i < result.size() ; i++ ){

            sql = "SELECT M.movie_id_predecessor FROM Movieprerequisites M  WHERE M.movie_id_successor = '" + result.get(i).get("movie_id")  +"';" ;

            System.out.println(sql);

            result.get(i).put("predecessors", jdbcTemplate.queryForList(sql) );

        }

        return result;
    }


}
