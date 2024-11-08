require('../../../index.js')
const Movie = require('../../../Schemas/movie.js')

exports.deleteSingleMovie = async (req, res) => {
    const paramID = req.params.id;

    try {
        const deletedMovie = await Movie.deleteOne({ _id: paramID });

        if (deletedMovie.deletedCount === 0) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        return res.status(200).json({
            message: "Movie deleted successfully",
            deletedMovie
        });

    } catch (error) {
        console.error(error); 

        return res.status(500).json({
            message: "An error occurred while deleting the movie.",
            error: error.message || error
        });
    }
};
