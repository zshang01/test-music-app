import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Button } from 'semantic-ui-react';


export default class Comment extends Component {


	constructor(props) {
    super(props);

    
    
	    this.state = {
	      name: this.props.name,
	      votes: 0,
	      comment: [],
	      seeCommentOn: false,
	      load: false
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
	        votes: this.state.votes,
	        comment: this.state.comment
	      }
	      console.log(this.state.votes)
	      console.log(params)

	    
	    //console.log(exist)
	    
  //   	Meteor.call("song.add", params, (err, song) => {
  //   		if (err) {
	 //          alert(err);
	 //        }
	        
	 //        console.log(song)
		// })
	    
    	
    
	    	
  //   	Meteor.call("song.update", params, (err, song) => {
		// 	if (err) {
  //         	alert(err);
  //       	}
  //       	console.log("updates!");
  //       	console.log(song)
		// })
    
    	
    	
    }
    
    downClick(){
		const pre = this.state.votes;
    	this.setState({
    		votes: pre - 1
    	})
    	const songname = this.state.name;
    	const params = {
	        name: this.state.name,
	        votes: this.state.votes,
	        comment: this.state.comment
	      };


	     
	 //    Meteor.call("song.add", params, (err, song) => {
	 //    		if (err) {
		//           alert(err);
		//         }
		        
		//         console.log(song)
		// 	})
	    
    	
  //   	Meteor.call("song.update", params, (err, song) => {
		// 	if (err) {
  //         		alert(err);
  //       	}
  //       	console.log("updates!");
  //       	console.log(song);
		// })
	    
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
	        votes: this.state.votes,
	        comment: this.state.comment
	     };
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
    	);
    }
}