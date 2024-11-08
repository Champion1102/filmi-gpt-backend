require('../../../index.js')
const Movie = require('../../../Schemas/movie.js')



exports.insertSingleMovie = async (req, res) => {
    const { name, description, category, thumbnail } = req.body;
    if (!name || !description || !category || !thumbnail) {
        return res.status(400).json({ message: "All fields are required." });
    }

    const newMovie = new Movie({
        name,
        description,
        category,
        thumbnail
    });

    try {
        const savedMovie = await newMovie.save();
        return res.status(201).json({
            message: "Movie added successfully",
            movie: savedMovie
        });
    } catch (err) {
        console.error(err); 
        return res.status(500).json({ 
            message: "An error occurred while adding the movie.",
            error: err.message || err 
        });
    }
};
