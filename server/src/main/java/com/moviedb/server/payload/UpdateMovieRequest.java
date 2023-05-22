package com.moviedb.server.payload;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

@Data
@Accessors(chain = true)
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UpdateMovieRequest {

    String movie_id;

    String movie_name;

    String director_username;

}