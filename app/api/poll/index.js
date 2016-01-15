var express = require('express'),
	router = express.Router();

// Controllers
// -----------------------------------------------------
var PollCtrl = require('./poll.controller');

// Routes
// -----------------------------------------------------
router.get('/search', PollCtrl.search); // ex., /api/search?q=music
router.get('/poll/:id', PollCtrl.single); // ex., /api/poll/1234
router.put('/poll/:id/upvote', PollCtrl.upvote); // ex., /api/poll/1234/upvote
router.put('/poll/:id/vote', PollCtrl.vote); // ex., /api/poll/10/vote?decrement=-1&increment=0
router.get('/random/:category', PollCtrl.random); // ex., /api/random/science
router.get('/featured', PollCtrl.featured); // ex., /api/featured?page=1&per_page=24
router.get('/newest', PollCtrl.newest); // ex., /api/newest?page=1&per_page=24
router.get('/most-votes', PollCtrl.mostVotes); // ex., /api/most-votes?page=1&per_page=24
router.get('/top-rated', PollCtrl.topRated); // ex., /api/top-rated?page=1&per_page=24
router.post('/new', PollCtrl.create);

module.exports = router;