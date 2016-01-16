var Poll = require('./poll.model');

/**
 * GET request --- search database
 */
exports.search = function (req, res) {
    var query = new RegExp(req.query.q, 'i'),
        pageNumber = req.query.page,
        per_page = req.query.per_page;
    Poll.paginate({$or:[ { 'question': query}, {'category': query}, {'options.title': query}], private: false}, { page: pageNumber, limit: per_page }, function(err, docs){
        if (err) {
            // res.render('error', {message: 'There was an error getting those poll.', error: {status: '500'}});
            res.status(500).json({message: 'There was an error getting those polls.'});
        } else if (docs.length === 0) {
            // res.render('error', {message: 'Sorry, no results!', error: {status: '404'}});
            res.status(404).json({message: 'No polls were found.'});
        } else {
            res.status(200).json(docs);
        }
    });
};


/**
 * GET request --- get a single poll
 */
exports.single = function (req, res) {
    var pollId = req.params.id;
    Poll.find({_id : pollId}, function(err, docs){
        if (err) {
            // res.render('error', {message: 'There was an error getting that poll.', error: {status: '500'}});
            res.status(500).json({message: 'There was an error getting that poll.'});
        } else if (docs.length === 0) {
            // res.render('error', {message: 'Sorry, that poll doesn\'t exist.', error: {status: '404'}});
            res.status(404).json({message: 'Sorry, that poll doesn\'t exist.'});
        } else {
            res.status(200).json(docs);
        }
    });
};

/**
 * PUT request --- upvote a poll
 */
exports.upvote = function (req, res) {
    var pollId = req.params.id;
        Poll.findByIdAndUpdate(pollId, { $inc: { upvotes: 1 }}, function (err, docs) {
        if (err) {
            res.status(500).json({message: 'Couldn\'t upvote the poll.'});
        } else {
            res.sendStatus(200);
        }
    });
};

/**
 * PUT request --- vote on a poll
 */
exports.vote = function (req, res) {
    var pollId = req.params.id;
    var decrement = Number(req.query.decrement),
        increment = Number(req.query.increment);

    var firstTimeVoting = (decrement === -1);

    Poll.findById(pollId, function (err, poll) {
        if (err) res.status(500).json(err);
        if(firstTimeVoting) {
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
exports.random = function (req, res) {
    var pollCategory = req.params.category;
        Poll.findRandom({category: pollCategory, private: false}, {}, {limit: 4}, function(err, docs) {
        if (err) {
            // res.render('error', {message: 'Couldn\'t retrieve polls from that category.', error: {status: '500'}});
            res.status(500).json({message: 'Couldn\'t retrieve polls from that category.'});
        } else if (docs.length === 0) {
            // res.render('error', {message: 'Sorry, there aren\'t any polls with that category.', error: {status: '404'}});
            res.status(404).json({message: 'Sorry, there aren\'t any polls with that category.'});
        } else {
            res.status(200).json(docs);
        }
    });
};

/**
 * GET request --- get the featured polls
 */
exports.featured = function (req, res) {
    var pageNumber = req.query.page,
        per_page = req.query.per_page;
    Poll.paginate({featured: true, private: false}, { page: pageNumber, limit: per_page, sort: {totalVotes: 'desc'} }, function(err, result) {
    if(err) return res.sendStatus(500, err);
        res.status(200).json(result);
    });
};

exports.newest = function (req, res) {
    var pageNumber = req.query.page,
        per_page = req.query.per_page;
    Poll.paginate({private: false}, { page: pageNumber, limit: per_page, sort: {index: 'desc'} }, function(err, result) {
    if(err) return res.sendStatus(500, err);
        res.status(200).json(result);
    });
};

exports.mostVotes = function (req, res) {
    var pageNumber = req.query.page,
        per_page = req.query.per_page;
    Poll.paginate({private: false}, { page: pageNumber, limit: per_page, sort: {totalVotes: 'desc'} }, function(err, result) {
    if(err) return res.sendStatus(500, err);
        res.status(200).json(result);
    });
};

/**
 * GET request --- get the top rated posts (most upvotes)
 */
exports.topRated = function (req, res) {
    var pageNumber = req.query.page,
        per_page = req.query.per_page;
    Poll.paginate({private: false}, { page: pageNumber, limit: per_page, sort: {upvotes: 'desc'} }, function(err, result) {
    if(err) return res.sendStatus(500, err);
        res.status(200).json(result);
    });
};

/**
 * POST request --- post a new poll
 */
exports.create = function (req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip);
    console.log(req.body);
    var newPoll = new Poll({
        _id: req.body._id,
        index: req.body.index,
        submittedBy: ip,
        question: req.body.question,
        category: req.body.category,
        featured: req.body.featured,
        private: req.body.private,
        upvotes: req.body.upvotes,
        totalVotes: req.body.totalVotes,
        options: req.body.options
    });
    newPoll.save(function(err, docs) {
    if (err) {
        // res.sendStatus({message: 'There was a problem creating the poll.'});
        console.error(err);
    }
        res.status(200).json(docs);
    });
};