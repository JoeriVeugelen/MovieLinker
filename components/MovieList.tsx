"use client";

import { useState } from "react";
import MoviePoster from "@/components/MoviePoster";
import { Movie } from "@/types";
import { Button } from "@/components/ui/button";

const MOVIES_PER_PAGE = 12;

export default function MovieList({ movies }: { movies: Movie[] }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const endIndex = startIndex + MOVIES_PER_PAGE;
  const currentMovies = movies.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col items-center justify-center pb-24 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mb-8">
        {currentMovies.map((movie) => (
          <MoviePoster key={movie._id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </Button>
        <span className="text-sm text-zinc-50">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
