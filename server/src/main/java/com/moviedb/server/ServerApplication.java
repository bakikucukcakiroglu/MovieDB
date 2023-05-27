package com.moviedb.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;


import java.util.List;
import java.util.Map;

@SpringBootApplication
public class ServerApplication {
    public static void main(String[] args) {
        // Start the Spring Boot application
        ApplicationContext context = SpringApplication.run(ServerApplication.class, args);

        // Retrieve the JdbcTemplate bean
        JdbcTemplate jdbcTemplate = context.getBean(JdbcTemplate.class);

        String[] dropTables = {
                "DROP TABLE IF EXISTS DatabaseManagers;",
                "DROP TABLE IF EXISTS MovieHasGenres;",
                "DROP TABLE IF EXISTS Subscribes;",
                "DROP TABLE IF EXISTS Rates;",
                "DROP TABLE IF EXISTS BoughtTickets;",
                "DROP TABLE IF EXISTS MoviePrerequisites;",
                "DROP TABLE IF EXISTS MovieSessions;",
                "DROP TABLE IF EXISTS Theaters;",
                "DROP TABLE IF EXISTS Genres;",
                "DROP TABLE IF EXISTS Audiences;",
                "DROP TABLE IF EXISTS Movies;",
                "DROP TABLE IF EXISTS Directors;",
                "DROP TABLE IF EXISTS RatingPlatforms;"
        };

        String[] createTables = {
                "CREATE TABLE IF NOT EXISTS DatabaseManagers (username VARCHAR(100), password_ VARCHAR(100) NOT NULL, PRIMARY KEY (username));",
                "CREATE TABLE IF NOT EXISTS RatingPlatforms (platform_id VARCHAR(100), platform_name VARCHAR(100) NOT NULL UNIQUE, PRIMARY KEY (platform_id));",
                "CREATE TABLE IF NOT EXISTS Genres (genre_id VARCHAR(100), genre_name VARCHAR(100) NOT NULL UNIQUE, PRIMARY KEY (genre_id));",
                "CREATE TABLE IF NOT EXISTS Audiences (username VARCHAR(100), password_ VARCHAR(100) NOT NULL, name_ VARCHAR(100), surname VARCHAR(100), PRIMARY KEY (username));",
                "CREATE TABLE IF NOT EXISTS Directors (username VARCHAR(100), password_ VARCHAR(100) NOT NULL, name_ VARCHAR(100), surname VARCHAR(100), nationality VARCHAR(100) NOT NULL, platform_id VARCHAR(100), PRIMARY KEY (username), FOREIGN KEY (platform_id) REFERENCES RatingPlatforms(platform_id) ON DELETE SET NULL ON UPDATE CASCADE);",
                "CREATE TABLE IF NOT EXISTS Movies (movie_id VARCHAR(100), movie_name VARCHAR(100) NOT NULL, duration INT NOT NULL, director_username VARCHAR(100) NOT NULL, average_rating REAL, PRIMARY KEY (movie_id), FOREIGN KEY (director_username) REFERENCES Directors(username) ON DELETE CASCADE ON UPDATE CASCADE);",
                "CREATE TABLE IF NOT EXISTS MovieHasGenres (movie_id VARCHAR(100), genre_id VARCHAR(100), PRIMARY KEY (movie_id, genre_id), FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (genre_id) REFERENCES Genres(genre_id) ON DELETE CASCADE ON UPDATE CASCADE);",
                "CREATE TABLE IF NOT EXISTS Subscribes (username VARCHAR(100), platform_id VARCHAR(100), PRIMARY KEY (username, platform_id), FOREIGN KEY (username) REFERENCES Audiences(username) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (platform_id) REFERENCES RatingPlatforms(platform_id) ON DELETE CASCADE ON UPDATE CASCADE);",
                "CREATE TABLE IF NOT EXISTS Rates (username VARCHAR(100), movie_id VARCHAR(100), rating REAL NOT NULL, FOREIGN KEY (username) REFERENCES Audiences(username) ON DELETE SET NULL ON UPDATE CASCADE, FOREIGN KEY (movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE);",
                "CREATE TABLE IF NOT EXISTS Theaters (theater_id VARCHAR(100), theater_name VARCHAR(100) NOT NULL, theater_capacity INT NOT NULL, theater_district VARCHAR(100), PRIMARY KEY (theater_id));",
                "CREATE TABLE IF NOT EXISTS MovieSessions (session_id VARCHAR(100), movie_id VARCHAR(100) NOT NULL, theater_id VARCHAR(100) NOT NULL, date_ DATE, time_slot INT, PRIMARY KEY(session_id), FOREIGN KEY(movie_id) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(theater_id) REFERENCES Theaters(theater_id) ON DELETE CASCADE ON UPDATE CASCADE);",
                "CREATE TABLE IF NOT EXISTS BoughtTickets (username VARCHAR(100), session_id VARCHAR(100), PRIMARY KEY (username, session_id), FOREIGN KEY (username) REFERENCES Audiences(username) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (session_id) REFERENCES MovieSessions(session_id) ON DELETE CASCADE ON UPDATE CASCADE);",
                "CREATE TABLE IF NOT EXISTS MoviePrerequisites (movie_id_predecessor VARCHAR(100), movie_id_successor VARCHAR(100), PRIMARY KEY (movie_id_predecessor, movie_id_successor), FOREIGN KEY (movie_id_predecessor) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (movie_id_successor) REFERENCES Movies(movie_id) ON DELETE CASCADE ON UPDATE CASCADE);",
                "CREATE TRIGGER insertRating BEFORE INSERT ON Rates FOR EACH ROW BEGIN DECLARE row_count_ INT; SELECT COUNT(*) INTO row_count_ FROM Rates WHERE username = NEW.username AND movie_id = NEW.movie_id; IF row_count_ > 0 THEN SIGNAL SQLSTATE '23555' SET MESSAGE_TEXT = 'A user cannot rate a movie more than once'; END IF; END;",
                "CREATE TRIGGER updateAverageRating AFTER INSERT ON Rates FOR EACH ROW BEGIN DECLARE total_ratings DECIMAL(4,2); DECLARE total_sum DECIMAL(4,2); SET total_ratings = (SELECT COUNT(*) FROM Rates WHERE movie_id = NEW.movie_id); SET total_sum = (SELECT SUM(rating) FROM Rates WHERE movie_id = NEW.movie_id); UPDATE Movies SET average_rating = total_sum / total_ratings WHERE movie_id = NEW.movie_id; END;",
                "CREATE TRIGGER InsertDatabaseManager BEFORE INSERT ON DatabaseManagers FOR EACH ROW BEGIN IF ((SELECT COUNT(*) FROM DatabaseManagers) >= 4) THEN SIGNAL SQLSTATE '23555' SET MESSAGE_TEXT = 'No more than 4 database managers are allowed'; END IF; END;",
                "CREATE TRIGGER checkSubscriptionBeforeRating BEFORE INSERT ON Rates FOR EACH ROW BEGIN DECLARE subscriptionCount INT; SELECT COUNT(*) INTO subscriptionCount FROM Subscribes WHERE username = NEW.username AND platform_id = (SELECT platform_id FROM Directors WHERE username = (SELECT director_username FROM Movies WHERE movie_id = NEW.movie_id)); IF subscriptionCount = 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Audience member must be subscribed to the platform to rate the movie'; END IF; END",
                "CREATE TRIGGER checkPredecessorMovies BEFORE INSERT ON BoughtTickets FOR EACH ROW BEGIN DECLARE prerequisiteCount INT; DECLARE sessionDate DATE; SELECT date_ INTO sessionDate FROM MovieSessions WHERE session_id = NEW.session_id; SELECT COUNT(*) INTO prerequisiteCount FROM MoviePrerequisites mp WHERE mp.movie_id_successor = (SELECT movie_id FROM MovieSessions WHERE session_id = NEW.session_id) AND NOT EXISTS (SELECT * FROM BoughtTickets bt JOIN MovieSessions ms ON bt.session_id = ms.session_id WHERE bt.username = NEW.username AND ms.movie_id = mp.movie_id_predecessor AND ms.date_ < sessionDate); IF prerequisiteCount > 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'All prerequisite movies must be watched before buying tickets for this session'; END IF; END",
                "CREATE TRIGGER checkTicketBeforeRating BEFORE INSERT ON Rates FOR EACH ROW BEGIN DECLARE ticketCount INT; SELECT COUNT(*) INTO ticketCount FROM BoughtTickets WHERE username = NEW.username AND session_id IN (SELECT session_id FROM MovieSessions WHERE movie_id = NEW.movie_id); IF ticketCount = 0 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Audience member must have a ticket for the movie to rate it'; END IF; END;",
                "CREATE TRIGGER checkCapacityBeforeBuyingTicket BEFORE INSERT ON BoughtTickets FOR EACH ROW BEGIN DECLARE theaterCapacity INT; DECLARE soldTicketsCount INT; SELECT theater_capacity INTO theaterCapacity FROM Theaters INNER JOIN MovieSessions ON Theaters.theater_id = MovieSessions.theater_id WHERE MovieSessions.session_id = NEW.session_id; SELECT COUNT(*) INTO soldTicketsCount FROM BoughtTickets WHERE session_id = NEW.session_id; IF soldTicketsCount >= theaterCapacity THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'The theater is already full. No more tickets can be bought for this session.'; END IF; END"

        };


        String[] addData = {
                "INSERT INTO DatabaseManagers(username, password_) VALUES ('manager1', 'managerpass1');",
                "INSERT INTO DatabaseManagers(username, password_) VALUES ('manager2', 'managerpass2');",
                "INSERT INTO DatabaseManagers(username, password_) VALUES ('manager35', 'managerpass35');",
                "INSERT INTO Genres(genre_id, genre_name) VALUES ('8001', 'Animation');",
                "INSERT INTO Genres(genre_id, genre_name) VALUES ('8002', 'Comedy');",
                "INSERT INTO Genres(genre_id, genre_name) VALUES ('8003', 'Adventure');",
                "INSERT INTO Genres(genre_id, genre_name) VALUES ('8004', 'Real Story');",
                "INSERT INTO Genres(genre_id, genre_name) VALUES ('8005', 'Thriller');",
                "INSERT INTO Genres(genre_id, genre_name) VALUES ('8006', 'Drama');",
                "INSERT INTO RatingPlatforms(platform_id, platform_name) VALUES ('10130', 'IMDB');",
                "INSERT INTO RatingPlatforms(platform_id, platform_name) VALUES ('10131', 'Letterboxd');",
                "INSERT INTO RatingPlatforms(platform_id, platform_name) VALUES ('10132', 'FilmIzle');",
                "INSERT INTO RatingPlatforms(platform_id, platform_name) VALUES ('10133', 'Filmora');",
                "INSERT INTO RatingPlatforms(platform_id, platform_name) VALUES ('10134', 'BollywoodMDB');"
        };


       // jdbcTemplate.batchUpdate(dropTables);

      //  jdbcTemplate.batchUpdate(createTables);

       // jdbcTemplate.batchUpdate(addData);

       // jdbcTemplate.batchUpdate(addTrigger);

    }
}

