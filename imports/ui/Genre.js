import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import Search from './Search.js';
import Comment from './Comment.js'
export default class Genre extends Component {

	constructor(props) {
    super(props);
	    this.state = {
	    	tracks: [],
	    	sortBylike: false,
	    	sortByComments: false,
	    	email: this.props.useremail
	    }
  	}




  	componentDidMount(){
  		
  		Meteor.call("displayGenres", this.props.name, (err, data) => {
	    	if(err){
	    		console.log(err)
	    	}
	    	console.log("got data", data);
	    	console.log("got data", data.tracks);
	    	
	    	this.setState({
		    		//for(var i = 1; i < 11; i+=1){
			    tracks: data.tracks
			    	//console.log(response.data.tracks[i].name);
			    //}
	    	})

	    })
	    console.log("37 in genre checking the email is not undefine")
	    console.log(this.state.email);
  	}

  	renderSong(){
		return this.state.tracks.map((t) => <Comment key = {t.id} name={t.name} email={this.state.email}/>);
	}


  	sortByComments(){
		
		const old = this.state.tracks;
		old.sort((a,b) => b.name.localeCompare(a.name));
		this.setState({
			tracks: old
		})
		console.log(this.state.tracks)
	}
	sortByLike(){
		const old = this.state.tracks;
		old.sort((a,b) => a.name.localeCompare(b.name));
		this.setState({
			tracks: old
		})
		console.log(this.state.tracks)
	}

	vote(){
		// Meteor.call(
	 //      "votes.update",
	 //      this.state.track,
	 //      (err, res) => {
	 //        if (err) {
	 //          alert("There was error inserting check the console");
	 //          console.log(err);
	 //          return;
	 //        }

	 //        console.log("Comment inserted", res);
	 //        this.body.value = "";
	 //      }
	 //    );
	}
	comment(){

	}

  	render() {
		const like = this.state.sortBylike;
		const comment = this.state.sortByComments;

		return(
			<div>
				<Search email={this.state.email}/>
				<br/>
				<h1>Recommended Genre base on you profile: {this.props.name}</h1>
					<button aria-label='Get started' className='btn' onClick={this.sortByLike.bind(this)}>sortByName</button>
					<button aria-label='Get started' className='btn' onClick={this.sortByComments.bind(this)}>sortByName2</button>
					<br/>
					<br/>
					
					{this.renderSong()}


				
				
				
			</div>

		)
	}



}
