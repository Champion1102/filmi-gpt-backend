require('../../../index.js')
const Movie = require('../../../Schemas/movie.js')

exports.listMovies = async (req, res) => {
    let { limit = 10, page = 1, category, q } = req.query;

    const limitRecords = parseInt(limit, 10);
    const pageNumber = parseInt(page, 10);

    if (isNaN(limitRecords) || limitRecords <= 0) {
        return res.status(400).json({ message: "Invalid 'limit' value." });
    }
    if (isNaN(pageNumber) || pageNumber <= 0) {
        return res.status(400).json({ message: "Invalid 'page' value." });
    }

    let query = {};
    if (q) {
        query = { $text: { $search: q } }; 
    }
    if (category) {
        query.category = category; 
    }

    try {
        const totalMovies = await Movie.countDocuments(query);

        const movies = await Movie.find(query)
            .limit(limitRecords)
            .skip((pageNumber - 1) * limitRecords);

        res.status(200).json({
            page: pageNumber,
            limit: limitRecords,
            totalMovies,
            totalPages: Math.ceil(totalMovies / limitRecords),
            movies,
        });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: "An error occurred while fetching movies.", error: error.message });
    }
};
