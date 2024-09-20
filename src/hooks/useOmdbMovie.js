import { useEffect, useState } from 'react';
import { OMDB_KEY } from '../utils/constants';

const useOmdbMovie = (title, year) => {
    const [movieInfo, setMovieInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchMovieInfo = async () => {
            if (!title || !year) return;

            try {
                const response = await fetch(`http://www.omdbapi.com/?t=${title}&y=${year}&apikey=${OMDB_KEY}`);
                const data = await response.json();
                console.log(data )
                if (data) {
                    setMovieInfo(data);
                } else {
                    setError(data.Error);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieInfo();
    }, [title, year]);

    return { movieInfo, loading, error };
};

export default useOmdbMovie;
