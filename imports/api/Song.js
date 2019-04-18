
import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Songs = new Mongo.Collection("Songs");

if (Meteor.isServer) {
	Meteor.publish('Songs', () => Songs.find({}))
}

Meteor.methods({
	'song.add': function(param){
		// check(username, String)
		// check(email, String)
		// check(password, String)
		console.log(param.name) //maybe remove the console.log
		console.log(param.votes) //maybe remove the console.log
		console.log(param.comment) //maybe remove the console.log
		Songs.insert({
			createAt: Date.now(),
			name: param.name,
			votes: param.votes,
			comment: param.comment,
			num: param.comment.length
		});
		const song = Songs.find({ name: param.name }).fetch();
		console.log("28 in user.js in api ")
		console.log(song[0]);
		return song[0];
	},
	'song.exist': function(name){
		const song = Songs.find({ name: name }).fetch();
		if(song.length > 0){
			return true;
		}
		return false;
	},
	'song.update': function(param){
		console.log(param); //maybe remove the console.log
		const name = param.name
		const votes = param.votes
		const comment = param.comment
		const song = Songs.find({ name: name }).fetch();
		Songs.update(
			{ _id: song[0]._id },
			{
				$set: {
					 votes: votes,
					 comment: comment,
					 num: comment.length
				}
			}	
		)
		console.log(song[0]);
		return song[0];
	},
	'song.display': function(){
		const songs = Songs.find().fetch();
		return songs;
	},
	'song.sortLike': function(){
		const songs = Songs.find({}, { limit: 5, sort: { votes: -1 }} ).fetch();
		return songs;
	},
	'song.sortComment': function(){
		const songs = Songs.find({}, { limit: 5, sort: { num: -1 }}).fetch();
		return songs;
	}
})
