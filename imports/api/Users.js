


import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";

export const Users = new Mongo.Collection("Users");

if (Meteor.isServer) {
	Meteor.publish('Users', () => Users.find({}))
}

Meteor.methods({
	'user.signup': function(param){
		// check(username, String)
		// check(email, String)
		// check(password, String)
		Users.insert({
			createAt: Date.now(),
			name: param.username,
			email: param.email,
			password: param.password,
			history:[]
		});
		const user = Users.find({}).fetch();
		
		
		return user[0];
	},
	'user.comment': function(param){
		console.log("server side")
		const email = param.email
		
		const name = param.name
		
		const user = Users.find({ email: email }).fetch();
		// console.log(user);
		// const u = user.filter( us => {return us.email === email})
		// console.log(typeof user[1].email)
		// console.log(typeof email)
		// console.log(u)
		
		const pre = user[0].history;
		
		pre.push(name);

		
		Users.update(
			{ _id: user[0]._id },
			{
				$push: {
					 history: name
				}
			}	
		)
		
		return user[0];
	}
})

