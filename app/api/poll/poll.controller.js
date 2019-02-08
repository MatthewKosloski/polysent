var Poll = require('./poll.model');

/**
 * GET request --- search database
 */
exports.search = function(req, res) {
	var query = new RegExp(req.query.q, 'i'),
		pageNumber = Number(req.query.page),
		per_page = Number(req.query.per_page) || 10;

	var query = {
		$or: [
			{ question: query },
			{ category: query },
			{ 'options.title': query }
		],
		private: false
	};

	var options = { 
		page: pageNumber, 
		limit: per_page
	};

	Poll.paginate(query, options, function(err, docs) {
		if (err) {
			res.status(500).json({ 
				message: "Couldn't retrieve the search results." 
			});
		} else if (docs.total === 0) {
			res.status(404).json({
				message: 'No polls were found.' 
			});
		} else {
			res.status(200).json(docs);
		}
	});
};

/**
 * GET request --- get a single poll
 */
exports.single = function(req, res) {
	var pollId = req.params.id;
	Poll.find({ _id: pollId }, function(err, docs) {
		if (err) {
			res.status(500).json({
				message: 'There was an error getting that poll.' 
			});
		} else if (docs.length === 0) {
			res.status(404).json({
				message: "Sorry, that poll doesn't exist." 
			});
		} else {
			res.status(200).json(docs);
		}
	});
};

/**
 * PUT request --- upvote a poll
 */
exports.upvote = function(req, res) {

	var pollId = req.params.id;

	var update = { $inc: { upvotes: 1 } };

	Poll.findByIdAndUpdate(pollId, update, function(err, docs) {
		if (err) {
			res.status(500).json({ 
				message: "Couldn't upvote the poll."
			});
		} else {
			res.sendStatus(200);
		}
	});
};

/**
 * PUT request --- vote on a poll
 */
exports.vote = function(req, res) {
	var pollId = req.params.id;
	var decrement = Number(req.query.decrement),
		increment = Number(req.query.increment);

	var firstTimeVoting = decrement === -1;

	Poll.findById(pollId, function(err, poll) {
		if (err)
			res.status(500).json({
				message: 'An error occurred while submitting your vote.'
			});
		if (firstTimeVoting) {
			poll.options[increment].votes++;
			poll.totalVotes++;
		} else {
			poll.options[increment].votes++;
			poll.options[decrement].votes--;
		}
		poll.save(function(err) {
			if (err) res.status(500).json(err);
			res.sendStatus(200);
		});
	});
};

/**
 * GET request --- get 4 random polls from a category
 */
exports.randomCategory = function(req, res) {
	var pollCategory = req.params.category;

	var conditions = { category: pollCategory, private: false };
	var projection = {};
	var options = { limit: 4 };

	Poll.findRandom(conditions, projection, options, function(err, docs) {
		if (err) {
			res.status(500).json({
				message: "Couldn't retrieve polls from that category."
			});
		} else if (docs.length === 0) {
			res.status(404).json({
				message: "Sorry, there aren't any polls with that category."
			});
		} else {
			res.status(200).json(docs);
		}
	});
};

/**
 * GET request --- get the featured polls
 */
exports.featured = function(req, res) {
	var pageNumber = Number(req.query.page),
		per_page = Number(req.query.per_page) || 10;

	var query = { 
		featured: true, 
		private: false 
	};

	var options = { 
		page: pageNumber, 
		limit: per_page, 
		sort: { index: 'desc' } 
	};

	Poll.paginate(query, options, function(err, result) {
		if (err) {
			res.status(500).json({ 
				message: "Couldn't retrieve the featured polls." 
			});
		}
		res.status(200).json(result);
	});
};

exports.newest = function(req, res) {
	var pageNumber = Number(req.query.page),
		per_page = Number(req.query.per_page) || 10,
		order = req.query.order || 'desc';

	var query = { private: false };
	var options = {
		page: pageNumber, 
		limit: per_page, 
		sort: { index: order } 
	};

	Poll.paginate(query, options, function(err, result) {
		if (err) {
			res.status(500).json({
				message: "Couldn't retrieve the newest polls." 
			});
		}
		res.status(200).json(result);
	});
};

exports.mostVotes = function(req, res) {
	var pageNumber = Number(req.query.page),
		per_page = Number(req.query.per_page) || 10,
		order = req.query.order || 'desc';
	
	var query = { private: false };
	var options = { 
		page: pageNumber, 
		limit: per_page, 
		sort: { totalVotes: order }
	};

	Poll.paginate(query, options, function(err, result) {
		if (err)
			res.status(500).json({
				message: "Couldn't retrieve the polls with the most votes."
			});
		res.status(200).json(result);
	});
};

/**
 * GET request --- get the top rated posts (most upvotes)
 */
exports.topRated = function(req, res) {
	var pageNumber = Number(req.query.page),
		per_page = Number(req.query.per_page) || 10,
		order = req.query.order ? req.query.order : 'desc';

	var query = { private: false };
	var options = { 
		page: pageNumber, 
		limit: per_page, 
		sort: { upvotes: order }
	};

	Poll.paginate(query, options, function(err, result) {
		if (err)
			res.status(500).json({
				message: "Couldn't retrieve the top rated polls."
			});
		res.status(200).json(result);
	});
};

/**
 * GET request --- get a random poll
 */
exports.randomPoll = function(req, res) {

	var conditions = { private: false };
	var projection = {};
	var options = { limit: 1};

	Poll.findRandom(conditions, projection, options, function(err, docs) {
		if (err) {
			res.status(500).json({ 
				message: "Couldn't retrieve a poll."
			});
		} else {
			res.status(200).json(docs);
		}
	});
};

/**
 * POST request --- post a new poll
 */
exports.create = function(req, res) {

	var newPoll = new Poll(req.body);
	newPoll.category = req.body.category.label;

	newPoll.save(function(err, docs) {
		if (err) {
			res.status(500).json({ 
				message: 'An error occurred while saving the poll.'
			});
		}
		res.status(200).json(docs);
	});
};
