var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	local: {
		term: String,
		when: String
	}
});

module.exports = mongoose.model('cats', userSchema);