var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var autoIncrement = require('mongoose-auto-increment'),
	mongoosePaginate = require('mongoose-paginate'),
	random = require('mongoose-simple-random');

var PollSchema = new Schema({
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

PollSchema.plugin(autoIncrement.plugin, {model: 'Poll', startAt: 1});
PollSchema.plugin(mongoosePaginate);
PollSchema.plugin(random);

PollSchema.post('save', function (doc) {
	console.log('Poll ' + doc._id + ' has been created or modified.');
});

PollModel = mongoose.model('Poll', PollSchema);
module.exports = PollModel;

/* removed the virtual attribute and replaced it with the following
	aggregation because you can't query virtuals */

// PollSchema.virtual('totalVotes').get(function() {
// 	return this.votes.reduce(function(currentValue, previousValue){
// 	     return (currentValue + previousValue);
// 	  });
// });


// PollModel.aggregate(
//   [
//     { $unwind : '$options' },
//     { $group : { _id: '$_id', totalVotes: {$sum: '$options.votes'} } },
//   ],
//   	function(err, results){
//   	// console.log(results);
// 	  	results.forEach(function(result){
// 			var conditions = { _id: result._id }, 
// 				update = { totalVotes: result.totalVotes }, 
// 				options = { multi: true };

// 			PollModel.update(conditions, update, options, callback);

// 			function callback (err, numAffected) {
// 			 	if(err) {
// 			 		console.error(err);
// 			 		return;
// 			 	} else {
// 			 		// console.log(numAffected);
// 			 	}
// 			}
//     	});
//   }
// );