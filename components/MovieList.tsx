"use client";

import MoviePoster from "@/components/MoviePoster";
import { Movie } from "@/types";

export default function MovieList({ movies }: { movies: Movie[] }) {
  return (
    <div className="pb-24">
      <h1 className="py-10 px-6 text-xl text-gray-300 text-center">
        The search bar above will understand anything, however the assortment of
        movies is
        <span className="text-red-800"> limited</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MoviePoster key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
