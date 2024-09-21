import React from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import useOmdbMovie from '../hooks/useOmdbMovie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export default function MovieInfo() {
  
  const { trailerId, title, releaseDate, language } = useSelector((state) => state.trailer); 
  const year = new Date(releaseDate).getFullYear();
  const { movieInfo, loading, error } = useOmdbMovie(title, year, language);
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  useEffect(() => {
      if (!user) {
          navigate('/'); 
      }
  }, [user, navigate]);


  return (
    <>
    {loading && (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-4xl text-gray-100">Loading...</p>
      </div>
    )}
        {error && <p>Error: {error}</p>}
   {movieInfo && <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-gray-100">
      <Header className="w-full" />
      
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 pt-20 text-white">
        <div className="flex flex-col sm:flex-row justify-between mx-4 sm:mx-10 border border-purple-500 bg-gradient-to-r from-purple-900 to-indigo-900 rounded-lg mb-6 p-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">{movieInfo.Title}</h1>
            <div className="flex mt-4 items-center text-gray-300">
              <span className="pr-2">{year}</span>
              <span className="px-2">•</span>
              <span className="pr-2">{movieInfo.Language}</span>
              <span className="px-2">•</span>
              <span>{movieInfo.Runtime}</span>
            </div>
          </div>

          <div className="flex mt-4 sm:mt-0 space-x-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-300">IMDB Rating</h4>
              <h2 className="text-2xl font-bold">⭐ {movieInfo.imdbRating}</h2>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-300">Rotten Tomatoes</h4>
              <h2 className="text-2xl font-bold">🍅{movieInfo.Ratings.find(rating => rating.Source === "Rotten Tomatoes")?.Value || 'N/A'}</h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-center gap-5 mb-8">
          <img
            className="rounded-lg shadow-2xl w-full lg:w-auto lg:h-[75vh] object-cover"
            src={movieInfo.Poster}
            alt="Movie poster"
          />
          <iframe
            className="w-full lg:w-[60vw] h-[50vh] lg:h-[75vh] rounded-lg shadow-2xl"
            src={`https://www.youtube.com/embed/${trailerId?.key}?autoplay=1&mute=1&loop=1&playlist=${trailerId?.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
        {movieInfo.Genre.split(', ').map((genre, index) => (
                                <button
                                    key={index}
                                    className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                                >
                                    {genre}
                                </button>
                            ))}
        </div>

        <div className="px-4 sm:px-20 text-xl">
          <p className="w-full lg:w-2/3 mb-8">
          {movieInfo.Plot}
          </p>

          <hr className="my-8 border-gray-600" />

          <div className="grid grid-cols-1 sm:grid-rows-3 gap-8">
            <div>
              <h2 className="font-bold text-2xl mb-2 text-purple-400">Director</h2>
              <span>{movieInfo.Director}</span>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-2 text-purple-400">Writer</h2>
              <span>{movieInfo.Writer}</span>
            </div>

            <div>
              <h2 className="font-bold text-2xl mb-2 text-purple-400">Actor</h2>
              <span>{movieInfo.Actors}</span>
            </div>
          </div>
        </div>
      </div>
    </div>}
    </>
  );
}