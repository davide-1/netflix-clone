import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieItem from "./MovieItem";
import {MdChevronLeft, MdChevronRight} from "react-icons/md"

export default function MovieRow({title, url}) {
    const [movies, setMovies] = useState([]);
    const rowId = Math.floor(Math.random() * 1000);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await axios.get(url);
                setMovies(response.data.results);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        fetchMovies();
    }, [url]);

    const slide = (offset) => {
        const slider = document.getElementById("slider" + rowId)
        slider.scrollLeft = slider.scrollLeft + offset

    }

   
    

    return(
        <>
           <h2 className="font-bold md:text-xl p-4 capitalize">{title}</h2>
           <div className="relative flex items-center group">
            <MdChevronLeft 
            onClick={() => slide(-500)}
            className="bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
            size={40}
            />
             <div id={`slider` + rowId} className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide">
               {movies.map((movie) => (
                <MovieItem key={movie.id} movie={movie} />
               ))}
             </div>
             <MdChevronRight 
              onClick={() => slide(500)}
             className="bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer"
             size={40}
             />
           </div>
        </>
    )
}