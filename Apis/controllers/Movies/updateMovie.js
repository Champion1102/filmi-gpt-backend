require('../../../index.js')
const Movie = require('../../../Schemas/movie.js')

exports.updateSingleMovie = async (req, res) => {
    const paramID = req.params.id;
    const { name, description, category, thumbnail } = req.body;

    if (!name && !description && !category && !thumbnail) {
        return res.status(400).json({ message: "No fields provided to update." });
    }

    try {
        const updateMovie = await Movie.updateOne(
            { _id: paramID },
            { $set: { name, description, category, thumbnail } } 
        );

        if (updateMovie.matchedCount === 0) {
            return res.status(404).json({ message: "Movie not found." });
        }

        return res.status(200).json({
            message: "Movie updated successfully",
            updateMovie
        });

    } catch (error) {
        console.error(error); 
        return res.status(500).json({
            message: "An error occurred while updating the movie.",
            error: error.message || error
        });
    }
};
