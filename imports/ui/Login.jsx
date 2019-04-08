import ReactModalLogin from "react-modal-login";
import { Accounts } from "meteor/accounts-base";
import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Users } from '../api/Users.js';
import { Grid } from "semantic-ui-react";
import { withTracker } from 'meteor/react-meteor-data';
import "../style/account.css";
class Login extends Component {

	constructor(props) {
		super(props);

		this.state = {
			err: "",
			toggle: false,
			email: ""
		};
		this.send = this.send.bind(this);
		
		

		
	}
	onLogin(){
		const username = document.querySelector("#name").value.trim();
		const password = document.querySelector("#password").value.trim();

		Meteor.loginWithPassword({ username: username }, password, err => {
			if (err) {
				this.setState({
					error: "Cannot Log in"
				});
			} else {
				this.setState({ error: "" });
				this.Success();
			}
		});

	}
	onRegister(){
		
		const username = document.querySelector("#name").value.trim();
		const email = document.querySelector("#email").value.trim();
		const password = document.querySelector("#password").value.trim();
		// if (password.length < 8) {
		// 	return this.setState({
		// 		error: "Password must be more than 8 characters."
		// 	});
		// }
			console.log(username)
			console.log(email)
			console.log(password)
			const param = {
				username: username,
				email: email,
				password: password
			}
			console.log(param);
			Meteor.call("user.signup", param, (err, user) =>{
					console.log(user)
					if(err) {
						alert(err);
					}
					if(user){
						this.setState({
							error: ""
						});
						this.Success();
						this.setState({
							email: email
						})
						this.send();
						console.log("add!")
						console.log(user)
					}
				}
			);
		// Accounts.createUser(
		// 	{
		// 		username: username,
		// 		email: email,
		// 		password: password
		// 	},
		// 	err => {
		// 		if (err) {
				// 	this.setState({
				// 		error: "cannot create User"
				// 	});
				// } else {
				// 	this.setState({
				// 		error: ""
				// 	});
				// 	this.Success();

					
		// 		}
		// 	}
		// );
		// create user in the database


	}
	send(){
		this.props.sendData(this.state.email);
	}
	Success() {
		this.close();
	}
	
	close() {
		this.setState({
			toggle: false
		});
	}
	toggleShow(){
		const pre = this.state.toggle;
		this.setState({
			toggle: !pre
		})
	}
	

	render() {
		
		return (
			<div>
				<div>
					<button className="float-right" onClick={this.toggleShow.bind(this)}>Log In / Sign Up</button>
				</div>
			<div id="account">
				
					
				
				<Grid.Row columns={2}>
					<ReactModalLogin
					
					visible={this.state.toggle}
					onCloseModal={this.close.bind(this)}

					form={{
						
						onRegister: this.onRegister.bind(this),
						onLogin: this.onLogin.bind(this),
						loginBtn: {
							label: "Log In"
						},
						registerBtn: {
							label: "Sign Up"
						},

						loginInputs: [
							{
								
								label: "Username",
								type: "text",
								id: "name",
								name: "username",
								placeholder: "Username"
							},
							{
								
								label: "Password",
								type: "password",
								id: "password",
								name: "password",
								placeholder: "Password"
							}
						],
						registerInputs: [
							{
								label: "Username",
								type: "text",
								id: "name",
								name: "username",
								placeholder: "Username"
							},
							{
								label: "Email",
								type: "email",
								id: "email",
								name: "email",
								placeholder: "Email"
							},
							{
								label: "Password",
								type: "password",
								id: "password",
								name: "password",
								placeholder: "Password"
							}
						]
						}}
					/>
				</Grid.Row>

			</div>
			</div>
		);
	}
}


export default withTracker(() => {
  Meteor.subscribe("Users");
  
  return {
    user: Users.find({}).fetch(),
  };
})(Login);