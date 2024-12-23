import React, { memo } from "react";
import { Carousel } from "../../components/carousel/Carousel";
import Movies from "../../components/movies/Movies";
import { request } from "../../api";
import { useQuery } from "@tanstack/react-query";
import Footer from "../../components/footer/Footer";
import Genre from "../../components/genre/Genre";

const Home = () => {
  const [page, setPage] = React.useState(1);
  const [selectedGenres, setSelectedGenres] = React.useState([]);

  const {
    data: genres,
    isLoading: genresLoading,
    error: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: () =>
      request.get("/genre/movie/list").then((res) => res.data.genres),
  });

  const {
    data: movies,
    isLoading: moviesLoading,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies", { page, selectedGenres }],
    queryFn: () =>
      request("/discover/movie", {
        params: {
          page,
          without_genres: "18,10749",
          with_genres: selectedGenres.join(","),
        },
      }).then((res) => res.data),
    keepPreviousData: true,
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  if (genresLoading || moviesLoading) return <p>Loading...</p>;
  if (genresError || moviesError)
    return <p>Error: {genresError?.message || moviesError?.message}</p>;

  return (
    <div className="bg-black">
      <Genre
        setPage={setPage}
        data={genres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />
      <Carousel data={movies} />
      <Movies data={movies} />
      <Footer />
    </div>
  );
};

export default memo(Home);
