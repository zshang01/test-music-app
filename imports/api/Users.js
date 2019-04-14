
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
	'user.login': function(param){

		const email = param.email
		const password = param.password
		const res = Users.find({ email: email }).fetch();
		if(res.length > 0){
			let found = false;
			
			
			console.log(res); //maybe remove the console.log
			console.log(res[0].email);
			console.log(res[0].email === email);
			if(res[0].email == email && password == res[0].password){
				found = true;
			}
			if(found){
				const user = {
					success: found,
					email: res[0].email
				}
				return user;
			}
		}
		
		return {
			success: false,
			email: ""
		}
		
	},
	'user.comment': function(param){
		console.log("server side") //maybe remove the console.log
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
		const unique = Array.from(new Set(pre))
		
		Users.update(
			{ _id: user[0]._id },
			{
				$set: {
					 history: unique
				}
			}	
		)
		
		return user[0];
	},
	'user.lastFive': function(email){
		const user = Users.find({ email: email }).fetch();
		const res = []
		for(var i = 0; i < user[0].history.length; i += 1){
			res.push(user[0].history[i])
			if(res.length == 5) break;
		}
		return res
	}
})

