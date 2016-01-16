var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment'),
	mongoosePaginate = require('mongoose-paginate'),
	random = require('mongoose-simple-random');

var ShortId = require('mongoose-minid');

var PollSchema = new Schema({
	_id: {type: ShortId, len: 5},
	index: {type: Number},
	submittedBy: {type: String},
	question: {type: String, required: true},
	category: {type: String, required: true},
	featured: {type: Boolean, default: false},
	private: {type: Boolean, default: false},
	upvotes: {type: Number, default: 0},
	totalVotes: {type: Number, default: 0},
	options: [{
		_id: false,
		title: {type: String, required: true},
		votes: {type: Number, default: 0}
	}]
});

PollSchema.plugin(autoIncrement.plugin, {model: 'Poll', field: 'index', startAt: 1});
PollSchema.plugin(mongoosePaginate);
PollSchema.plugin(random);

PollSchema.post('save', function (doc) {
	console.log('Poll ' + doc._id + ' has been created or modified.');
});

PollModel = mongoose.model('Poll', PollSchema);
module.exports = PollModel;