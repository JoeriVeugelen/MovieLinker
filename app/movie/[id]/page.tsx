import ImageWithFallback from "@/components/ImageWithFallback";
import MoviePoster from "@/components/MoviePoster";
import db from "@/db";
import { Movie, SimilarMovie } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60 * 60 * 24;

export default async function MoviePage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const movies = db.collection("movies");

  const search = await movies.find({ _id: id }, { projection: { $vector: 1 } });

  if (!(await search.hasNext())) {
    return notFound();
  }

  const movie = (await search.next()) as Movie;

  const similarMovies = (await movies
    .find(
      {},
      {
        vector: movie.$vector,
        limit: 6,
        includeSimilarity: true,
      }
    )
    .toArray()) as SimilarMovie[];

  similarMovies.shift();

  return (
    <div className="container mx-auto px-4 pt-16 pb-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <ImageWithFallback
          src={movie.Poster}
          alt={movie.Title}
          className="rounded-lg md:max-h-[400px] h-auto object-contain"
        />
        <div className="flex flex-col gap-4 w-full px-8">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-yellow-300">
            {movie.Title}
          </h1>
          <p className="text-gray-400">{movie.Genre}</p>
          <p className="font-light text-sm">{movie.$vectorize}</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {[
              { label: "Directed by", value: movie.Director },
              { label: "Featuring", value: movie.Actors },
              { label: "Box Office", value: movie.BoxOffice },
              { label: "Released", value: movie.Released },
              { label: "Runtime", value: movie.Runtime },
              { label: "Rated", value: movie.Rated },
              { label: "IMDB Rating", value: movie.imdbRating },
              { label: "Language", value: movie.Language },
              { label: "Country", value: movie.Country },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="font-semibold text-zinc-300">{label}</span>
                <span className="text-zinc-50">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="text-3xl pt-10 pl-10 font-bold text-zinc-50 px-8 md:px-0">
          Similar movies you may like
        </h2>
        <div
          className="flex justify-between items-center lg:flex-row gap-x-20 gap-y-10 pl-20 pr-10 py-10 overflow-x-scroll 
                        scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800"
        >
          {similarMovies.map((movie, i) => (
            <MoviePoster
              key={movie._id}
              index={i + 1}
              similarityRating={Number(movie.$similarity.toFixed(2)) * 100}
              movie={movie}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
