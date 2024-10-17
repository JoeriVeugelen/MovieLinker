import MovieList from "@/components/MovieList";
import db from "@/db";
import { Movie } from "@/types";

export const revalidate = 60 * 60 * 24;

export default async function Home() {
  const movies = db.collection("movies");
  const allMovies = (await movies.find({}).toArray()) as Movie[];

  return <MovieList movies={allMovies} />;
}
