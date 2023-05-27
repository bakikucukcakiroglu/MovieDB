package com.moviedb.server.service;

import com.moviedb.server.payload.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.sql.Date;
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

    public List getAllRatingsOfAudience(String username) throws Exception {

        System.out.println("getAllRatings:: "+ username);


        String sql = "SELECT A.username FROM  Audiences A WHERE A.username = ?";


        if(jdbcTemplate.queryForList(sql, username).isEmpty()){

            throw new Exception("No user found with username: " + username);
        }

        sql = "SELECT M.movie_name, R.movie_id, R.rating FROM  Movies M INNER JOIN Rates R  ON M.movie_id = R.movie_id AND R.username = ?";
        return jdbcTemplate.queryForList(sql, username);

    }

    public List getDirectorsMovies(String directorUsername) throws Exception {

        System.out.println("directorUsername: "+ directorUsername);

        String sql = "SELECT D.username FROM  Directors D WHERE D.username = ?";


        if(jdbcTemplate.queryForList(sql, directorUsername).isEmpty()){

            throw new Exception("No director found with username: " + directorUsername);
        }

        sql = "SELECT S.session_id, M.movie_id, M.movie_name, S.theater_id, T.theater_district , S.time_slot FROM MovieSessions S, Movies M, Theaters T WHERE S.movie_id = M.movie_id AND S.theater_id = T.theater_id AND M.director_username = ?;";
        return jdbcTemplate.queryForList(sql, directorUsername);
    }
    public Map<String, Object> getAverageRatingOfMovie(String movieID) throws Exception {

        System.out.println("movieRating: "+ movieID);

        String sql = "SELECT M.movie_id FROM  Movies M WHERE M.movie_id = ?";


        if(jdbcTemplate.queryForList(sql, movieID).isEmpty()){

            throw new Exception("No movie found with movieID: " + movieID);
        }

        sql = "SELECT M.average_rating  FROM  Movies M WHERE M.movie_id = ?";
        return jdbcTemplate.queryForMap(sql, movieID);
    }

    public int addTheater(AddTheaterRequest addTheaterRequest) {

        String sql = " INSERT INTO Theaters(theater_id, theater_name, theater_capacity, theater_district) VALUES ( ? , ? , ? , ? )";
        return jdbcTemplate.update(sql,addTheaterRequest.getTheater_id(), addTheaterRequest.getTheater_name(), addTheaterRequest.getTheater_capacity(), addTheaterRequest.getTheater_district());

    }


    public int addMovie(AddMovieRequest addMovieRequest) {

        String sql = " INSERT INTO Movies(movie_id, movie_name, duration, director_username, average_rating) VALUES ( ? , ? , ? , ? ,?)";
        return jdbcTemplate.update(sql, addMovieRequest.getMovie_id(), addMovieRequest.getMovie_name(), addMovieRequest.getDuration(), addMovieRequest.getDirector_username(), addMovieRequest.getAverage_rating());


    }

    public int addSession(AddSessionRequest addSessionRequest) {

        String sql = " SELECT M.duration FROM Movies M WHERE M.movie_id = ? ";
        List<Map<String, Object>>  result= jdbcTemplate.queryForList(sql, addSessionRequest.getMovie_id());
        int durationOfTheAddedFilm = Integer.parseInt(result.get(0).get("duration").toString());
        int beginTimeOfTheAddedFilm = addSessionRequest.getTime_slot();
        // No enough slot time on that date
        if(durationOfTheAddedFilm + addSessionRequest.getTime_slot() > 5)
            return 0;

        // There is an overlap
        sql = " SELECT DISTINCT S.movie_id, S.time_slot FROM moviesessions S WHERE S.theater_id = ? and S.date_ = ? ";
        result = jdbcTemplate.queryForList(sql, addSessionRequest.getTheater_id(), addSessionRequest.getDate_());

        for(int i=0;i < result.size();i++){
            String movie_id = result.get(i).get("movie_id").toString();
            int beginTimeOfTheCandidateFilm = Integer.parseInt(result.get(i).get("time_slot").toString());

            sql = " SELECT M.duration FROM Movies M WHERE M.movie_id =  ?  ";

            List<Map<String, Object>> response = jdbcTemplate.queryForList(sql, movie_id);

            int durationOfTheCandidateFilm = Integer.parseInt(response.get(0).get("duration").toString());

            if(beginTimeOfTheAddedFilm >= beginTimeOfTheCandidateFilm + durationOfTheCandidateFilm)
                continue;

            if(beginTimeOfTheAddedFilm + durationOfTheAddedFilm <= beginTimeOfTheCandidateFilm)
                continue;

                return 0;
        }
        //System.out.println(result);

        //if(addSessionRequest. addSessionRequest.getTime_slot() > 4)
        sql = " INSERT INTO MovieSessions(session_id, movie_id, theater_id, date_, time_slot) VALUES ( ? , ? , ? , ? ,?)";

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

    public List getAvailableTheaters(String date, String slot) {

        System.out.println("date: "+ date);

        System.out.println("slot: "+ slot);

        String theater_sql = "SELECT T.theater_id FROM theaters T";

        List<Map<String, Object>>  availableTheaters = jdbcTemplate.queryForList(theater_sql);

        String session_sql = " SELECT DISTINCT S.movie_id, S.theater_id, S.time_slot FROM moviesessions S WHERE S.date_ = '" + date + "' ";
        List<Map<String, Object>>  sessions = jdbcTemplate.queryForList(session_sql);


        for(int i=0;i<sessions.size();i++){
            String movie_id = sessions.get(i).get("movie_id").toString(); // Get the movie_id
            // System.out.println(movie_id);
            String duration_sql = " SELECT M.duration FROM movies M WHERE M.movie_id = '" + movie_id + "';";
            List<Map<String, Object>>  duration = jdbcTemplate.queryForList(duration_sql);
            int film_duration = Integer.parseInt(duration.get(0).get("duration").toString());
            //System.out.println("duration: " + duration);
            int beginTime = Integer.parseInt(sessions.get(i).get("time_slot").toString());
            int slotTime = Integer.parseInt(slot);
            if(beginTime > slotTime || beginTime + film_duration <= slotTime)
                continue;
            else{ //delete the key
                String unavailableTheater_id = sessions.get(i).get("theater_id").toString();
                //availableTheaters.get(0).remove(unavailableTheater_id);
                for(int p=0;p<availableTheaters.size();p++) {
                    availableTheaters.get(p).values().remove(unavailableTheater_id);
                }
                System.out.println("Unavailable Theater_id" + unavailableTheater_id);
            }

        }


        System.out.println(sessions);
        System.out.println(availableTheaters);

        return availableTheaters;
    }


    //// AUDIENCE

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

    public List getAllTickets(String username) {

        System.out.println("getAllTickets " +  username);

        String sql = "SELECT M.movie_id, M.movie_name, S.session_id, (SELECT  R.Rating FROM Rates R WHERE R.username = ? AND R.movie_id = M.movie_id) AS rating , M.average_rating  FROM MovieSessions S, BoughtTickets B, Movies M WHERE S.session_id = B.session_id AND M.movie_id = S.movie_id  AND B.username = ? ";

        List<Map<String, Object>>  result = jdbcTemplate.queryForList(sql, username, username);

        return result;
    }


    public int buyTicket(BuyTicketRequest buyTicketRequest) {
        String username = buyTicketRequest.getUsername();
        String session_id = buyTicketRequest.getSession_id();

        String sessionInfoSql = "SELECT * FROM moviesessions S WHERE S.session_id = ? ";
        String boughtTicketsSql = "SELECT B.session_id FROM boughttickets B WHERE B.username = ? ";
        //String boughtTicketForSessionSql = "SELECT COUNT(*) AS count FROM boughttickets B WHERE B.username = ? AND B.session_id = ? ";

        String prerequisiteFilmsSql = "SELECT P.movie_id_predecessor FROM movieprerequisites P WHERE P.movie_id_successor = ? ";
        String theaterCapacitySql = "SELECT T.theater_capacity FROM theaters T WHERE T.theater_id = ? ";
        String numOfPeopleBoughtTicketForSameSessionSql = "SELECT COUNT(*) AS count  FROM boughttickets B WHERE B.session_id = ? ";


        Map<String, Object>  sessionInfo = jdbcTemplate.queryForMap(sessionInfoSql, session_id);
        List<Map<String, Object>>  boughtTickets = jdbcTemplate.queryForList(boughtTicketsSql, username);
        List<Map<String, Object>>  prerequisiteFilms = jdbcTemplate.queryForList(prerequisiteFilmsSql, sessionInfo.get("movie_id"));
        int  theaterCapacity = Integer.parseInt(jdbcTemplate.queryForMap(theaterCapacitySql, sessionInfo.get("theater_id")).get("theater_capacity").toString());
        int  numOfPeopleBoughtTicketForSameSession = Integer.parseInt(jdbcTemplate.queryForMap(numOfPeopleBoughtTicketForSameSessionSql, sessionInfo.get("session_id")).get("count").toString());
        //boolean isAlreadyHasTicketForSession = Integer.parseInt(jdbcTemplate.queryForMap(boughtTicketForSessionSql, username, session_id).get("count").toString() )>0;

        System.out.println("sessionInfo" + sessionInfo);
        System.out.println("boughtTickets" + boughtTickets);
        System.out.println("prerequisiteFilms" + prerequisiteFilms);
        System.out.println("theaterCapacity" + theaterCapacity);
        System.out.println("numOfPeopleBoughtTicketForSameSession" + numOfPeopleBoughtTicketForSameSession);

        //String session_date = sessionInfo.get("date_").toString();

        if(numOfPeopleBoughtTicketForSameSession >= theaterCapacity)
            return 0;

        String sql = " INSERT INTO BoughtTickets(username, session_id) VALUES ( ? , ?)";
        return jdbcTemplate.update(sql, buyTicketRequest.getUsername(), buyTicketRequest.getSession_id());

        /*
        boolean hasWatchedAllPrerequisites = true;

        for(int i=0;i<prerequisiteFilms.size();i++){
            String predecessorMovieId = prerequisiteFilms.get(i).get("movie_id_predecessor").toString();
            boolean hasWatchedThisMovie = false;
            // Now check if we watched the predecessor Movie
            for(int j=0;j<boughtTickets.size();j++){
                String candidateSessionId = boughtTickets.get(j).get("session_id").toString();
                Map<String, Object>  candidateSessionInfo = jdbcTemplate.queryForMap(sessionInfoSql, candidateSessionId);
                // Has ticket for the same movie.
                if(candidateSessionInfo.get("movie_id") == predecessorMovieId){
                    // Predecessor's date is previous
                    String candidateSessionDate = candidateSessionInfo.get("date_").toString();
                    String[] candidateSessionDates = candidateSessionDate.split("-");
                    String[] sessionDates = session_date.split("-");

                    for(int k=0;k<3;k++){
                        int candidateTime = Integer.parseInt(candidateSessionDates[k]);
                        int originalTime = Integer.parseInt(sessionDates[k]);
                        if(candidateTime > originalTime){
                            break;
                        }
                        if(k == 2){
                            hasWatchedThisMovie = true;
                        }
                    }
                }
            }

            if(!hasWatchedThisMovie){
                hasWatchedAllPrerequisites = false;
                break;
            }
        }

             */
        /*
        if(isAlreadyHasTicketForSession) {
            System.out.println("Already has the key");
            return 0;
        }


        if(!hasWatchedAllPrerequisites) {
            System.out.println("You haven't watched all the prerequisites");
            return 0;
        }
         */
    }


}
