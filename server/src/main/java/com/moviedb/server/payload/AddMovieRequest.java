package com.moviedb.server.payload;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

@Data
@Accessors(chain = true)
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AddMovieRequest {

    String user_type;

    String username;

    String password_;

    String name_;

    String surname;

    String nationality;

    String platform_id;

}