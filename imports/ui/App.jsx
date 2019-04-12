import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Footer from "./Footer.js";
import Header from "./Header.js";
import LandingPage from './LandingPage.jsx';
import HomePage from './HomePage.js'
import { Container } from "semantic-ui-react";

import "../style/app.css";
export default class App extends Component {

	constructor(props) {
    	super(props);
    	this.state = {
	    	loading: false,
	    	time: Date.now()
	    };
	    this.redirect = this.redirect.bind(this);
	}

	signIn() {
	    var options = {
	      showDialog: true, // Whether or not to force the user to approve the app again if they’ve already done so.
	      requestPermissions: ['user-read-email', 'user-top-read', 'playlist-modify-private', 'playlist-modify-public', 'playlist-read-private', 'playlist-read-collaborative']
	    };
	    Meteor.loginWithSpotify(options, function (err) {
	      console.log(err || 'No error');
	    });
	    console.log(Meteor.user());
	    console.log(Meteor.user().services.spotify.accessToken);
  	}

  	onClick(){
  		const pre = this.state.loading
  		this.setState({
  			loading: !pre
  		})
  	}
  	handle(event){
  		event.preventDefault();
  		this.props.setTimeout(this.onClick, 3000);
  	}

  	handleClick(){
  		this.signIn();
  		this.onClick();
  	}
  	redirect(event){

		event.preventDefault();
		console.log("wait")
		if(!this.state.loading){
			setTimeout(function(){
				this.setState({
					loading: true
				})
			}.bind(this), 3000);
		}
  	}
	render(){
		const load = this.state.loading;
		return(

			<div id="app" >
				<Container>
					<Header />

					<br />
					{
						load 

						?
						
						<LandingPage />

						:
						<div role="main">
						<HomePage />
						<button aria-label='Get started' className='btn' onClick={() => this.handleClick()}>Agree</button>
						</div>
					}

					
					<br />
				
					<Footer />
					<br />
					
				</Container>
			</div>
		)
	}


}  

