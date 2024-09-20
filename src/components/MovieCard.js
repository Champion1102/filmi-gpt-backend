import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IMG_CDN_URL } from '../utils/constants';
import useMovieDetails from '../hooks/useMovieDetails';
import { setTrailerId } from '../utils/trailerSlice';

const MovieCard = ({ details }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { title, poster_path, id, release_date } = details;
    const trailerId = useMovieDetails(id);

    const handleClick = () => {
        dispatch(setTrailerId({ trailerId, title, releaseDate: release_date })); // Dispatch trailerId, title, and release date
        navigate('/movieinfo'); // Navigate to movieInfo page
    };

    if (!poster_path) return null;

    return (
        <div className='w-36 md:w-52 pr-4' onClick={handleClick}>
            <img src={IMG_CDN_URL + poster_path} alt={title} />
        </div>
    );
}

export default MovieCard;
