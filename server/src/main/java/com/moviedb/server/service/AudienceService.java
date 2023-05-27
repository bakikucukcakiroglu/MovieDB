package com.moviedb.server.service;

import com.moviedb.server.payload.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class AudienceService {

    private final JdbcTemplate jdbcTemplate;

    public AudienceService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
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

    public int buyTicket(BuyTicketRequest buyTicketRequest) {

        String sql = " INSERT INTO BoughtTickets(username, session_id) VALUES ( ? , ?)";
        return jdbcTemplate.update(sql, buyTicketRequest.getUsername(), buyTicketRequest.getSession_id());

    }

    public List getAllTickets(String username) {

        System.out.println("getAllTickets " +  username);

        String sql = "SELECT M.movie_id, M.movie_name, S.session_id, (SELECT  R.Rating FROM Rates R WHERE R.username = ? AND R.movie_id = M.movie_id) AS rating , M.average_rating  FROM MovieSessions S, BoughtTickets B, Movies M WHERE S.session_id = B.session_id AND M.movie_id = S.movie_id  AND B.username = ? ";

        List<Map<String, Object>>  result = jdbcTemplate.queryForList(sql, username, username);

        return result;
    }
}
