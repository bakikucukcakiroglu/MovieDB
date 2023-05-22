package com.moviedb.server.payload;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

@Data
@Accessors(chain = true)
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AddSessionRequest {

    String session_id, movie_id, theater_id, date_;
    int  time_slot;




}