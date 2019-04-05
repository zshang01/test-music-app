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
	    	login: false
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
  	}

  	renderSong(){
		return this.state.tracks.map((t) => <Comment key = {t.id} name={t.name} />);
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
	login(){
		const pre = this.state.login;
		this.setState({
			login: !pre
		})
	}
  	render() {
		const like = this.state.sortBylike;
		const comment = this.state.sortByComments;
		const log = this.state.login;
		return(
			<div>
				<h1>{this.props.name}</h1>
				
					{
						log 
						
						
						?
						
						this.renderSong()
						
						:

						<div>please log in</div>
					}

				<button aria-label='Get started' className='btn' onClick={this.sortByLike.bind(this)}>sortByName</button>
				<button aria-label='Get started' className='btn' onClick={this.sortByComments.bind(this)}>sortByName2</button>
				<button aria-label='Get started' className='btn' onClick={this.login.bind(this)}>login</button>
				<Search />
			</div>

		)
	}



}