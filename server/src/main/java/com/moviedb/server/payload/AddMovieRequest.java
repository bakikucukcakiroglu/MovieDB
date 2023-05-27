package com.moviedb.server.payload;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

@Data
@Accessors(chain = true)
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AddMovieRequest {

    String movie_id, movie_name, director_username, genre_id;
    double average_rating;
    int  duration;




}