import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Songs } from '../api/Song.js'
import { Users } from '../api/Users.js';
class Comment extends Component {


	constructor(props) {
    super(props);

    
    
	    this.state = {
	      name: this.props.name,
	      votes: 0,
	      comment: [],
	      seeCommentOn: false,
	      load: false,
	      email: this.props.email
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
			<ul>
			<li key={c.toString()}>
			    {c}
			</li>
			</ul>
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
					document.getElementById('comment').value=''
				}
				

			);


		
     }


    render(){
    	const commentOn = this.state.seeCommentOn;
    	return(
    		
    		<div>
    			
    			<h1>{this.props.name}</h1>
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
					aria-label="comment"
	                name="comment"
	                type="text"
	                ref={this.setText}
	                className="form-control col mr-3"
	                
	                
	              />

		          <button className="btn btn-info" onClick={this.post}>
			          <span role="img" aria-label="post comment">
			          	Post
			          </span>
			        </button>
		          
		          	<button className="btn btn-info" onClick={this.seeComments}>
			          <span role="img" aria-label="see comments">
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
    	);
    }
}
export default withTracker(() => {
  Meteor.subscribe("Users");
  Meteor.subscribe("Songs");
  
  return {
    user: Users.find({}).fetch(),
    song: Songs.find({}).fetch()
  };
})(Comment);