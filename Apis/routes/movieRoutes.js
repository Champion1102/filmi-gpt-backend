const express = require("express")
const router = express.Router();
const {listMovies} = require('../controllers/Movies/getMovie')
const {insertSingleMovie} = require('../controllers/Movies/addMovie')
const {updateSingleMovie} = require('../controllers/Movies/updateMovie')
const {deleteSingleMovie} = require('../controllers/Movies/deleteMovie')
const Verification = require('../../middleware/verification')


router.get('/api/movies/',Verification.authMiddleware,listMovies);
router.post('/api/movies/',Verification.authMiddleware,insertSingleMovie)
router.patch('/api/movies/:id',Verification.authMiddleware,updateSingleMovie)
router.delete('/api/movies/:id',Verification.authMiddleware,deleteSingleMovie)



module.exports = router;