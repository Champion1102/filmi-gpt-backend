const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This field is required'
    },
    description: {
        type: String,
        required: 'Description is required'
    },
    category: {
        type: [String], 
        required: 'Category is required'
    },
    thumbnail: {
        type: String,
        required: 'Thumbnail URL is required',
    }
});


movieSchema.index({"$**" : 'text'});
module.exports = mongoose.model('Movie', movieSchema);
