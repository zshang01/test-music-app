import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";

import axios from 'axios';

if(Meteor.isServer){
	Meteor.methods({
		"displayGenres"(genres1){
			//const genres1 = genres1;
		    const getGenre = "BQDgmYLDK9S_Db5cHri77qaCQYZaEpB7wgsPvi_gnsBNBvkGumyXpG4knD6-jkzQ6BUl9jEuHCgVE-_0SgW4436F5I1MIB1oz_vdAnYtljwjNg67HlT_0x0rGLMgA1nnY92Od75Zxe7-zPpAipjxuEzqgvORyVOLoQgVyTau-N3XMOoal4j270enzKqlj2sJ"
		    console.log(genres1)

		    return new Promise((resolve, reject) => {
		    	axios.get(`https://api.spotify.com/v1/recommendations?limit=10&seed_genres=${genres1}`, {
		      
			      headers: {
			        Accept: 'application/json',
			        'Content-Type': 'application/json',
			        Authorization: `Bearer ${Meteor.user().services.spotify.accessToken}}`
			      }
		    	})
		    	.then(response => resolve(response.data) /*Return the requested data*/)
		      .catch(err => {
		        //If access token expired, refresh it and try again        
		        if (err.response.data.error.message === 'The access token expired') {
		          console.log('Access token expired, refreshing access token...');
		          
		        	
		        }
		        else {
		          reject(err);
		        }
				})
		  })
	}}),
	Meteor.methods({
		"search"(genres1){
			//const genres1 = genres1;
		    const getGenre = "BQDgmYLDK9S_Db5cHri77qaCQYZaEpB7wgsPvi_gnsBNBvkGumyXpG4knD6-jkzQ6BUl9jEuHCgVE-_0SgW4436F5I1MIB1oz_vdAnYtljwjNg67HlT_0x0rGLMgA1nnY92Od75Zxe7-zPpAipjxuEzqgvORyVOLoQgVyTau-N3XMOoal4j270enzKqlj2sJ"
		    console.log(genres1)
		    const tmp = genres1.toString().split(" ");
		    const input = tmp.toString().replace(" ", "\%20");
		    console.log(input)
		    return new Promise((resolve, reject) => {
		    	axios.get(`https://api.spotify.com/v1/search?q=${input}&type=track`, {
		      
			      headers: {
			        Accept: 'application/json',
			        'Content-Type': 'application/json',
			        Authorization: `Bearer ${Meteor.user().services.spotify.accessToken}}`
			      }
		    	})
		    	.then(response => resolve(response.data) /*Return the requested data*/)
		      .catch(err => {
		        //If access token expired, refresh it and try again        
		        if (err.response.data.error.message === 'The access token expired') {
		          console.log('Access token expired, refreshing access token...');
		          
		        	
		        }
		        else {
		          reject(err);
		        }
				})
		  })
	}})
}