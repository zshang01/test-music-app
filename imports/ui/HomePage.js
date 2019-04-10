

import React, { Component }from "react";
import { Image, Icon } from "semantic-ui-react";
import { Meteor } from 'meteor/meteor';


export default class HomePage extends React.Component {
	
	render() {
		return (
			<div id="homapage">
				<h1>Welcome to Music Chill!</h1>
				<p id="introduction">
					Do you have the feeling 
					that you really like a song but have no one 
					to communicate or disscuss with? <br />
					Trust Me! You are at the right place. 
					<br/><br/>
					
				</p> <br/>
				
				<Image src="/background.png" alt="background" /><br/>	
				<h2>Acknowleagement:</h2>
				<p> This Webpage may access to your spotify account</p>		
			</div>
		);
	}
}