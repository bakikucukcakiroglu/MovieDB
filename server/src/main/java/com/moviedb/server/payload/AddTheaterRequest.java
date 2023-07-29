package com.moviedb.server.payload;

import lombok.Data;
import lombok.experimental.Accessors;
import lombok.experimental.FieldDefaults;

@Data
@Accessors(chain = true)
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AddTheaterRequest {
    String theater_id,  theater_name,theater_district;
    int theater_capacity;

}