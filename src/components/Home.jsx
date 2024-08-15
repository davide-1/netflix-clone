import React from "react";
import Hero from "./Hero";
import MovieRow from "./MovieRow";
import endpoints from "../services/movieServices";

export default function Home() {
    return (
        <div>
            <Hero />
            <MovieRow title="upcoming" url={endpoints.upcoming} />
            <MovieRow title="trending" url={endpoints.trending} />
            <MovieRow title="top rated" url={endpoints.topRated} />
            <MovieRow title="comedy" url={endpoints.comedy} />
            <MovieRow title="popular" url={endpoints.popular} />
        </div>
    )
}