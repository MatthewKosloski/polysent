var express = require('express'),
	router = express.Router();

// Controllers
// -----------------------------------------------------
var ctrl = require('./poll.controller');

// Routes
// -----------------------------------------------------
router.get('/search', ctrl.search); // ex., /api/search?q=music
router.get('/poll/:id', ctrl.single); // ex., /api/poll/1234
router.put('/poll/:id/upvote', ctrl.upvote); // ex., /api/poll/1234/upvote
router.put('/poll/:id/vote', ctrl.vote); // ex., /api/poll/10/vote?decrement=-1&increment=0
router.get('/random/:category', ctrl.random); // ex., /api/random/science
router.get('/featured', ctrl.featured); // ex., /api/featured?page=1&per_page=24
router.get('/newest', ctrl.newest); // ex., /api/newest?page=1&per_page=24
router.get('/most-votes', ctrl.mostVotes); // ex., /api/most-votes?page=1&per_page=24
router.get('/top-rated', ctrl.topRated); // ex., /api/top-rated?page=1&per_page=24
router.post('/new', ctrl.create); // /api/new

module.exports = router;