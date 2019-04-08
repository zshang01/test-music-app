import React, { Component } from "react";
import Card from './Card.js';
import { Songs } from '../api/Song.js';
import { withTracker } from 'meteor/react-meteor-data';
class Search extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
			genres:["acoustic","afrobeat","alt-rock","alternative","ambient","anime","black-metal","bluegrass","blues",
					"bossanova","brazil","breakbeat","british","cantopop","chicago-house","children","chill","classical","club",
					"comedy","country","dance","dancehall","death-metal","deep-house","detroit-techno","disco","disney","drum-and-bass",
					"dub","dubstep","edm","electro","electronic","emo","folk","forro","french","funk","garage","german","gospel",
					"goth","grindcore","groove","grunge","guitar","happy","hard-rock","hardcore","hardstyle","heavy-metal",
					"hip-hop","holidays","honky-tonk","house","idm","indian","indie","indie-pop","industrial","iranian","j-dance",
					"j-idol","j-pop","j-rock","jazz","k-pop","kids","latin","latino","malay","mandopop","metal","metal-misc",
					"metalcore","minimal-techno","movies","mpb",
					"new-age","new-release","opera","pagode","party","philippines-opm","piano","pop","pop-film","post-dubstep","power-pop",
					"progressive-house","psych-rock","punk","punk-rock","r-n-b","rainy-day","reggae","reggaeton","road-trip","rock","rock-n-roll","rockabilly","romance",
					"sad","salsa","samba","sertanejo",
					"show-tunes","singer-songwriter","ska","sleep","songwriter","soul","soundtracks","spanish",
					"study","summer","swedish","synth-pop","tango","techno","trance","trip-hop","turkish","work-out","world-music"
  			],
  			url: null,
  			tracks: [],
  			value: 'acoustic',
  			found: false,
  			trackId: null,
  			input: '',
  			childvotes: 0,
  			childcomment: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.textInput = null;

	    this.setText = element =>{
	    	this.textInput = element;
	    };

	}

	componentWillReceiveProps(){	
		console.log(this.state.tracks);
	    

	}
	


	handleChange(event) {
		event.preventDefault();
	    this.setState({value: event.target.value});
	  }


	handleSubmit(event) {
    	event.preventDefault();
		const genres = this.textInput.value;
    	Meteor.call("search", genres, (err, data) => {
	    	if(err){
	    		console.log(err)
	    	}
	    	console.log("got data", data);
	    	console.log("got data", data.tracks);
	    	
	    	this.setState({
		    		//for(var i = 1; i < 11; i+=1){
			    tracks: data.tracks,
			    found: true,
			    input: this.textInput.value
			    	//console.log(response.data.tracks[i].name);
			    //}
	    	})
	    	console.log(this.state.tracks.items);
	    	for(var i = 0; i < this.state.tracks.items.length; i += 1){
	    		console.log(this.textInput.value);
	    		console.log(this.state.tracks.items[i].name)
				if(this.state.tracks.items[i].name == this.textInput.value){
					console.log(this.state.tracks.items[i].external_urls.spotify);
					this.setState({
						url: this.state.tracks.items[i].external_urls.spotify
						
					})
					console.log(this.state.url)
					break;
				}
			}

	    })

	    Meteor.call("song.exist", this.textInput.value, (err, exist) =>{
					console.log(exist)
					if(err) {
						alert(err);
					}
					if(exist){
						const n = this.textInput.value
						console.log("song existed");
						const song = Songs.find({ name: n }).fetch();
						const name = song[0].name
						const votes = song[0].votes
						const comment = song[0].comment
						
						this.setState({
							childvotes: votes,
							childcomment: comment
						})	
						console.log(this.state);
					}else{
						this.setState({
							childvotes: 0,
							childcomment: []
						})
					}
				}
			);

  	
  	}

	

	render(){
		const find = this.state.found;
		const url = this.state.uri
		const word = this.state.input
		return(
			<div>
				<h1>Search Bar</h1>
				<form onSubmit={this.handleSubmit}>
					<label>
					<select value={this.state.value} onChange={this.handleChange}>
					  <option value="acoustic">Acoustic</option>
					  <option value="breakbeat">Breakbeat</option>
					  <option value="guitar">Guitar</option>
					  <option value="songwriter">Songwriter</option>
					  <option value="holidays">Holidays</option>
					</select>

					<input
		                name="comment"
		                type="text"
		                ref={this.setText}
		                className="form-control col mr-3"
		                id="comment"
		              />
		            <input type="submit" value="Submit" />
					</label>

				</form>

				{
					find 
					
					?
					
					<div>Click On this URl <a href={this.state.url}>Let's Go</a>
						<Card name={word} email={this.props.email} votes={this.state.childvotes} comment={this.state.childcomment}/>
					</div>

					:
					<div>testing</div>
				}

			</div>


		);
	}



}

export default withTracker(() => {
  
  Meteor.subscribe("Songs");
  console.log("307")
  return {
    song: Songs.find({}).fetch()
  };
})(Search);