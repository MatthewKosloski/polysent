var mongoose = require('mongoose'),
	autoIncrement = require('mongoose-auto-increment'),
	mongoosePaginate = require('mongoose-paginate'),
	random = require('mongoose-simple-random'),
	ShortId = require('mongoose-minid');

var PollSchema = new mongoose.Schema({
	_id: { type: ShortId, len: 5 },
	index: { type: Number },
	submittedBy: { type: String },
	question: { type: String, required: true },
	category: { type: String, required: true },
	featured: { type: Boolean, default: false },
	private: { type: Boolean, default: false },
	upvotes: { type: Number, default: 0 },
	totalVotes: { type: Number, default: 0 },
	options: [
		{
			_id: false,
			title: { type: String, required: true },
			votes: { type: Number, default: 0 }
		}
	]
});

PollSchema.plugin(autoIncrement.plugin, {
	model: 'Poll',
	field: 'index',
	startAt: 1
});
PollSchema.plugin(mongoosePaginate);
PollSchema.plugin(random);

module.exports = mongoose.model('Poll', PollSchema);
