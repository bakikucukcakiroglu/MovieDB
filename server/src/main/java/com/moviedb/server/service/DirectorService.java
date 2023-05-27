package com.moviedb.server.service;

import com.moviedb.server.payload.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DirectorService {

    private final JdbcTemplate jdbcTemplate;

    public DirectorService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int addMovie(AddMovieRequest addMovieRequest) throws Exception {

        String sql =  "SELECT * FROM Genres G WHERE G.genre_id = ? ";

        if(jdbcTemplate.queryForList(sql, addMovieRequest.getGenre_id()).isEmpty()){

            throw new Exception("No genre with id " + addMovieRequest.getGenre_id() + " exists.");
        }

        sql = " INSERT INTO Movies(movie_id, movie_name, duration, director_username, average_rating) VALUES ( ? , ? , ? , ? ,?)";
        jdbcTemplate.update(sql, addMovieRequest.getMovie_id(), addMovieRequest.getMovie_name(), addMovieRequest.getDuration(), addMovieRequest.getDirector_username(), addMovieRequest.getAverage_rating());

        sql = " INSERT INTO MovieHasGenres(movie_id, genre_id) VALUES ( ? , ? )";

        return jdbcTemplate.update(sql, addMovieRequest.getMovie_id(), addMovieRequest.getGenre_id());

    }

    public int addSession(AddSessionRequest addSessionRequest) throws Exception {




        String sql = " SELECT M.duration FROM Movies M WHERE M.movie_id = ? ";
        List<Map<String, Object>>  result= jdbcTemplate.queryForList(sql, addSessionRequest.getMovie_id());

        if(result.isEmpty()){

            throw new Exception("No movie with movie_id: "+ addSessionRequest.getMovie_id() + " exists.");
        }
        int durationOfTheAddedFilm = Integer.parseInt(result.get(0).get("duration").toString());
        int beginTimeOfTheAddedFilm = addSessionRequest.getTime_slot();
        // No enough slot time on that date

        String movie_id_of_session = addSessionRequest.getMovie_id();




        String director_sql = "SELECT M.director_username FROM Movies M WHERE M.movie_id = ? ";
        String director_username = jdbcTemplate.queryForMap(director_sql, movie_id_of_session).get("director_username").toString();
        String platform_sql = "SELECT D.platform_id FROM Directors D WHERE D.username = ?";
        String platform_id1 = jdbcTemplate.queryForMap(platform_sql, director_username).get("platform_id").toString();
        String platform_id2 = jdbcTemplate.queryForMap(platform_sql, addSessionRequest.getDirector_username()).get("platform_id").toString();


        if(!platform_id1.equals(platform_id2)){
            throw new Exception("Director of the session's movie's platform should be the same as your platform");
        }

        if(addSessionRequest.getTime_slot() > 4 || addSessionRequest.getTime_slot() < 0){

            throw new Exception("Movie slot should be between 0 and 4");
        }

        if(durationOfTheAddedFilm + addSessionRequest.getTime_slot() > 5){
            throw new Exception("Movie session cannot end after slot 4.");

        }

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

    public int addPredecessor(AddPredecessorRequest addPredecessorRequest) throws Exception {

        if(addPredecessorRequest.getMovie_id_predecessor().equals(addPredecessorRequest.getMovie_id_successor())){

            throw new Exception("A movie cannot be predecessor of itself.");
        }

        String sql = " INSERT INTO movieprerequisites(movie_id_predecessor, movie_id_successor) VALUES ( ? , ?)";
        return jdbcTemplate.update(sql, addPredecessorRequest.getMovie_id_predecessor(), addPredecessorRequest.getMovie_id_successor());

    }

    public List getDirectorsSessions(String directorUsername) throws Exception {

        System.out.println("directorUsername: "+ directorUsername);

        String sql = "SELECT * FROM Directors D WHERE D.username  = ?";


        if(jdbcTemplate.queryForList(sql, directorUsername).isEmpty()){

            throw new Exception("No directors with username: " + directorUsername + " found.");
        }


        sql = "SELECT S.session_id, M.movie_id, M.movie_name, S.theater_id, T.theater_district , S.time_slot FROM MovieSessions S, Movies M, Theaters T WHERE S.movie_id = M.movie_id AND S.theater_id = T.theater_id AND M.director_username = ? ORDER BY  movie_id ASC ;";

        List<Map<String, Object>>  result= jdbcTemplate.queryForList(sql, directorUsername);

        for (int i = 0 ; i < result.size() ; i++ ){

            sql = "SELECT M.movie_id_predecessor FROM Movieprerequisites M  WHERE M.movie_id_successor = '" + result.get(i).get("movie_id")  +"';" ;

            System.out.println(sql);

            result.get(i).put("predecessors", jdbcTemplate.queryForList(sql) );

        }
        return result;
    }

    public int updateMovie(UpdateMovieRequest updateMovieRequest) throws Exception {

        String sql = "SELECT * FROM Movies  WHERE movie_id = ? ";


        if(jdbcTemplate.queryForList(sql,updateMovieRequest.getMovie_id()).isEmpty()){

            throw new Exception( "No movie with id " + updateMovieRequest.getMovie_id() + "is found.");
        }

        System.out.println("updateDirector: "+ updateMovieRequest.getMovie_id() + " "+ updateMovieRequest.getMovie_name());

        sql = "UPDATE Movies SET movie_name = ? WHERE movie_id = ? AND director_username = ?";
        return jdbcTemplate.update(sql, updateMovieRequest.getMovie_name(), updateMovieRequest.getMovie_id(), updateMovieRequest.getDirector_username());
    }

    public List getAllAudience(GetAudienceRequest getAudienceRequest) throws Exception {


        String sql = "SELECT *  FROM Movies WHERE movie_id = ? ";


        if(jdbcTemplate.queryForList(sql, getAudienceRequest.getMovie_id()).isEmpty()){

            throw new Exception( "No movie with id " + getAudienceRequest.getMovie_id() + "is found.");
        }

        sql = "SELECT M.director_username  FROM Movies M WHERE movie_id = ? ";

        if(!jdbcTemplate.queryForMap(sql, getAudienceRequest.getMovie_id()).get("director_username").equals(getAudienceRequest.getDirector_username())){

            throw new Exception("This movie does not belong to you.");
        }

        System.out.println("getAllAudience: " + getAudienceRequest.getDirector_username()+ "  " + getAudienceRequest.getMovie_id());

        sql = "SELECT A.username, A.name_, A.surname FROM Audiences A, Boughttickets B WHERE B.username = A.username AND B.session_id IN (SELECT DISTINCT S.session_id FROM  Movies M, Moviesessions S WHERE M.director_username = ? AND M.movie_id = ? AND S.movie_id = ?)";
        return jdbcTemplate.queryForList(sql, getAudienceRequest.getDirector_username(), getAudienceRequest.getMovie_id(), getAudienceRequest.getMovie_id());
    }

    public List getAvailableTheaters(String date, String slot) throws Exception {

        System.out.println("date: "+ date);

        System.out.println("slot: "+ slot);


        if(Integer.parseInt(slot)>4){

            throw new Exception("Slot should be between 0 and 4");
        }

        String theater_sql = "SELECT * FROM theaters T";

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

}
