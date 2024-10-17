import MoviePoster from "@/components/MoviePoster";
import db from "@/db";
import { Movie } from "@/types";

export const revalidate = 60 * 60 * 24;

export default async function Home() {
  const movies = db.collection("movies");

  const allMovies = (await movies.find({}, {}).toArray()) as Movie[];

  return (
    <div className="flex items-center justify-center pb-24 pt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {allMovies.map((movie) => (
          <MoviePoster key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
