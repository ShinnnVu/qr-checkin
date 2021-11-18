import React from "react";
import axios from "axios";

const getLocation = async (location: string) => {
    const response = await axios.get("https://goawayy.herokuapp.com/place/v2?lat=10.8782694&lng=106.8044371", {
        params: {
            input: location,
            limit: 5,
        },
    });
    return response.data;
};

export default getLocation;
