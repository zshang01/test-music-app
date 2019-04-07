import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import Login from './Login.js';
import { withTracker } from 'meteor/react-meteor-data';
import Genre from './Genre.js';
import { Songs } from '../api/Song.js'
class LandingPage extends Component {

  constructor(props) {
	    super(props);
	    this.state = {
			loading: false,
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
  			tracks:[],
  			userLogIn: false,
  			useremail: "",
  			discussion: [],
  			first: false
		};
		this.getData = this.getData.bind(this)
		this.start = this.start.bind(this)
		this.renderDiscussion = this.renderDiscussion.bind(this)
		

	}

	componentDidMount(){
		Meteor.call("song.display", (err, songs) =>{
				console.log(songs)
				if(err) {
					alert(err);
				}
				if(songs){
					this.setState({
						discussion: songs
					})
					
				}
			}
		);
		console.log(this.state.discussion)
	}

	  handler() {
	  	const pre = this.state.userLogIn;
	    this.setState({
	      userLogIn: !pre
	    })
	  }

  start(){
  	this.setState({
  		first: true
  	})
  }
  getData(val){
  	const pre = this.state.userLogIn;
  	this.setState({
  		useremail: val,
  		userLogIn: !pre
  	})
  	console.log(this.state.useremail);
  	console.log(this.state.userLogIn);
  }
  
  renderDiscussion(){

  	return this.state.discussion.map(d => 
  			<div key = {d._id}>
	  			<h4>Song Name: { d.name }</h4>
	  			<h4>🔥: { d.votes }</h4>
	  			<div>
	  				{d.comment.map( c => 
	  					<li key={c.toString()}>
	  						{c}
	  					</li>
	  				)}
	  			</div>

			</div>
	)
  }



  renderDiscussionByLike(){

  }

  renderDiscussionByComment(){

  }

  sortByLike(){
	Meteor.call("song.sortLike", (err, songs) =>{
			console.log(songs)
			if(err) {
				alert(err);
			}
			if(songs){
				this.setState({
					discussion: songs
				})
				
			}
		}
	);
  }
  sortByComment(){
	Meteor.call("song.sortComment", (err, songs) =>{
			console.log(songs)
			if(err) {
				alert(err);
			}
			if(songs){
				this.setState({
					discussion: songs
				})
				
			}
		}
	);
  }
  render() {
  	const name = "holidays";
  	const isLogIn = this.state.userLogIn;
  	const start = this.state.first;
    return (
      <div className='landing-container'>
        <div className='landing-title-container' role='main'>
          <Login sendData={this.getData} />
          <h1>hello landing</h1>
		  <button aria-label='Get started' className='btn' onClick={this.sortByLike.bind(this)}>Most Top Ten Likes🔥</button>
		  <button aria-label='Get started' className='btn' onClick={this.sortByComment.bind(this)}>Most Top Ten Comments🔥</button>
          {
				this.renderDiscussion()
          }
          
          <div position="right">
          	{
				isLogIn
          
				? 

			  		<Genre name={name} useremail={this.state.useremail}/>
          			
				:

				<div>Database</div>
          	}
			
          </div>
          
        </div>
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
})(LandingPage);

