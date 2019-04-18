import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data';
import { Songs } from '../api/Song.js'
import { Users } from '../api/Users.js';

class Card extends Component {


	constructor(props) {
		super(props);

		this.state = {
			track: [],
			name: this.props.name,
			votes: this.props.votes,
			comment:this.props.comment,
			email: this.props.email,
			display: false
		};

		this.onClick = this.onClick.bind(this);
	    this.downClick = this.downClick.bind(this);
	    this.post = this.post.bind(this);
	    this.seeComments = this.seeComments.bind(this);
	    this.textInput = null;

	    this.setText = element =>{
	    	this.textInput = element;
	    };
	    

	}

	componentDidMount(){
		Meteor.call("search", this.props.name, (err, data) => {
	    	if(err){
	    		console.log(err)
	    	}
	    	console.log("got data", data); //maybe remove the console.log
	    	console.log("got data", data.tracks);
	    	
	    	this.setState({
		    		//for(var i = 1; i < 11; i+=1){
			    track: data.tracks
			    	//console.log(response.data.tracks[i].name);
			    //}
	    	})
	    	console.log(this.state.track)

	    })
		

		Meteor.call("song.exist", this.state.name, (err, exist) =>{
					console.log(exist)
					if(err) {
						alert(err);
					}
					if(exist){
						const n = this.state.name
						console.log("song existed");
						const song = Songs.find({ name: n }).fetch();
						const name = song[0].name
						const votes = song[0].votes
						const comment = song[0].comment
						
						this.setState({
							votes: votes,
							comment: comment
						})	
						console.log(this.state);
					}
				}
			);
	  
	}

	onClick(){
    	const pre = this.state.votes;
    	this.setState({
    		votes: pre + 1 
    	})
    	const songname = this.state.name;
    	const params = {
	        name: this.state.name,
	        email: this.state.email
	      };
	      console.log(this.state.votes)
	      console.log(params)

	    Meteor.call("user.comment", params, (err, user) =>{
					console.log(user)
					if(err) {
						alert(err);
					}
					if(user){
						this.setState({
							error: ""
						});
						
						console.log(user)
					}
				}
			);

	    Meteor.call("song.exist", this.state.name, (err, exist) =>{
					console.log(exist)
					if(err) {
						alert(err);
					}
					if(exist){
						Meteor.call("song.update", this.state, (err, song) =>{
								console.log(song)
								if(err) {
									alert(err);
								}
								if(song){
									
									console.log(song)
								}
							}
						);
					}else{
						Meteor.call("song.add", this.state, (err, song) =>{
								console.log(song)
								if(err) {
									alert(err);
								}
								if(song){
									
									console.log(song)
								}
							}
						);
					}
				}
			);
	  
    	
    	
    }
    
    downClick(){
		const pre = this.state.votes;
    	this.setState({
    		votes: pre - 1
    	})
    	const songname = this.state.name;
    	const params = {
	        name: this.state.name,
	        email: this.state.email
	      };
	      console.log("client side inside commetns")
	      console.log(params)
	      Meteor.call("user.comment", params, (err, user) =>{
					console.log(user)
					if(err) {
						alert(err);
					}
					if(user){
						this.setState({
							error: ""
						});
						
						console.log(user)
					}
				}
			);

	      Meteor.call("song.exist", this.state.name, (err, exist) =>{
					console.log(exist)
					if(err) {
						alert(err);
					}
					if(exist){
						Meteor.call("song.update", this.state, (err, song) =>{
								console.log(song)
								if(err) {
									alert(err);
								}
								if(song){
									
									console.log(song)
								}
							}
						);
					}else{
						Meteor.call("song.add", this.state, (err, song) =>{
								console.log(song)
								if(err) {
									alert(err);
								}
								if(song){
									
									console.log(song)
								}
							}
						);
					}
				}
			);
	     
	    
    }

    seeComments(){
    	console.log("112")
    	const pre = this.state.seeCommentOn
    	this.setState({
    		seeCommentOn: !pre
    	})
    	console.log(pre)
    	
    }
    showComments(){
    	
		return this.state.comment.map(c => 
			<li key={c.toString()}>
			    {c}
			</li>
			)
							
    }
    post(event){
    	event.preventDefault();
    	console.log("80")
    	console.log(this.state.comment)
    	const pre = this.state.comment;
    	pre.push(this.textInput.value);
    	console.log(this.textInput.value)
    	this.setState({
    		comment: pre
    	})
    	const songname = this.state.name;
    	
    	console.log(this.state.comment)
    	console.log(this.textInput)
		const params = {
	        name: this.state.name,
	        email: this.state.email
	      };
	     Meteor.call("user.comment", params, (err, user) =>{
					console.log(user)
					if(err) {
						alert(err);
					}
					if(user){
						this.setState({
							error: ""
						});
						
						console.log(user)
					}
				}
			);

		Meteor.call("song.exist", this.state.name, (err, exist) =>{
					console.log(exist)
					if(err) {
						alert(err);
					}
					if(exist){
						Meteor.call("song.update", this.state, (err, song) =>{
								console.log(song)
								if(err) {
									alert(err);
								}
								if(song){
									
									console.log(song)
								}
							}
						);
					}else{
						Meteor.call("song.add", this.state, (err, song) =>{
								console.log(song)
								if(err) {
									alert(err);
								}
								if(song){
									
									console.log(song)
								}
							}
						);
					}
				}
			);
     }

	
				
	display(){
		
		Meteor.call("song.exist", this.props.name, (err, exist) =>{
					console.log(exist)
					if(err) {
						alert(err);
					}
					if(exist){
						const n = this.props.name
						console.log("song existed");
						const song = Songs.find({ name: n }).fetch();
						const name = song[0].name
						const votes = song[0].votes
						const comment = song[0].comment
						
						this.setState({
							votes: votes,
							comment: comment
						})	
						console.log(this.state);
					}else{
						this.setState({
							votes: 0,
							comment: []
						})	
					}
				}
			);




		Meteor.call("search", this.props.name, (err, data) => {
	    	if(err){
	    		console.log(err)
	    	}
	    	console.log("got data", data);
	    	console.log("got data", data.tracks);
	    	const pre = this.state.display
	    	this.setState({
		    	
			    track: data.tracks,
				display: !pre
		
			    	
	    	})
	    	console.log(this.state.track)

	    })
	}
				

	

	render(){
		const display = this.state.display
		const commentOn = this.state.seeCommentOn;
		return(
			<div>
				<h3>{this.props.name}</h3>
				<button aria-label='Get started' className='btn' onClick={this.display.bind(this)}>Display Information about this Song</button>
				{
					display 
					
					? 

					<div>
					<img src={this.state.track.items[0].album.images[0].url} />
					<h4>Release Date: {this.state.track.items[0].album.release_date}</h4>
					<h4>Popularity: {this.state.track.items[0].popularity}</h4>
					</div>
					:	

					""
				}
				
				
    			
    			<h1>{this.state.name}</h1>
    			<h2>{this.state.votes} </h2>
	    		<button className="btn btn-info ml-3" onClick={this.onClick}>
		          <span role="img" aria-label="like for this song">
		            ✔Like
		          </span>
		        </button>
		        
		        <button className="btn btn-info" onClick={this.downClick}>
		          <span role="img" aria-label="dislike for this song">
		            ✖Dislike
		          </span>
		        </button>

		        
		        <div className="input-group">
		          <span className="input-group-addon">Comment</span>

		          <input
	                name="comment"
	                type="text"
	                ref={this.setText}
	                className="form-control col mr-3"
	                id="comment"
	              />
		          <button className="btn btn-info" onClick={this.post}>
			          <span role="img" aria-label="dislike for this song">
			          	Post
			          </span>
			        </button>
		          
		          	<button className="btn btn-info" onClick={this.seeComments}>
			          <span role="img" aria-label="dislike for this song">
			          	See comments
			          </span>
			        </button>
			        {
			        	commentOn 
			        		
			        	? 	
			        		this.showComments()
			        	:
			        		<div></div>
			        }
		        </div>
		        

			</div>

		)
	}
}
export default withTracker(() => {
  Meteor.subscribe("Users");
  Meteor.subscribe("Songs");
  
  return {
    user: Users.find({}).fetch(),
    song: Songs.find({}).fetch()
  };
})(Card);
