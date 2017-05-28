var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const postSchema = new Schema(
	{
		category:{type:String},
		title:{type:String,require:true},
		content:{type:String}
	},{
		timestamps:true
	}
);

module.exports = mongoose.model('post',postSchema);

