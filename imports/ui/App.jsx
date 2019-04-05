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
	    	loading: false
	    };
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

  	handleClick(){
  		this.signIn();
  		this.onClick();
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

						<HomePage />
					}
					
					
						

					<br />
				
					<Footer />
					<br />
					<button aria-label='Get started' className='btn' onClick={() => this.handleClick()}>Display</button>
				</Container>
			</div>
		)
	}


}  

