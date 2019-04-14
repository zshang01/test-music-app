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
			email: "",
			success: this.props.isLogIn
		};
		this.send = this.send.bind(this);
		
		

		
	}
	onLogin(){
		const email = document.querySelector("#email").value.trim();
		const password = document.querySelector("#password").value.trim();
		console.log("28 in login js") //maybe remove the console.log
		
		const param = {
			email: email,
			password: password
		}
		Meteor.call("user.login", param, (err, user) =>{
			
			if(err){
				alert(err)
			}
			console.log(user);
			if(user.success){
				const email = user.email
				this.Success();
				this.setState({
					email: email,
					success: true
				})
				
				this.send();
				console.log("add!")
				
			}else{
				alert("try again")
			}

		})
		console.log("40 in login js") //maybe remove the console.log

	}
	onRegister(){
		
		const username = document.querySelector("#name").value.trim();
		const email = document.querySelector("#email").value.trim();
		const password = document.querySelector("#password").value.trim();
		
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
							email: email,
							success: true
						})
						this.send();
						console.log("add!")
						console.log(user)
					}
				}
			);
		}
		
	send(){
		console.log(this.state.email)
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
		let login = this.props.isLogIn
		let useremail = this.state.email
		return (
			<div>
				<div>
					{ login 

						? 
						 <div></div>
						 : <button className="float-right" onClick={this.toggleShow.bind(this)}><div>Log In / Sign Up</div></button>}
				</div>
				
				<div>
				{

				login

				? 
				
				<div></div>

				:

				<div id="account">
					
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
									
									label: "email",
									type: "email",
									id: "email",
									name: "email",
									placeholder: "email"
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

					</div>
					}
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
