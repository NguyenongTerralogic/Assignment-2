import React, { useEffect } from "react"
import { Link, withRouter } from "react-router-dom";
import "./style.css"
import { emailRegex } from "../../utils/constants.js"
import axios from "axios";
import * as Actions from "../../Redux/actions.js";
import { useDispatch, useSelector } from "react-redux";
let jwtDecoder = require('jwt-decode');

const SignIn = props => {
	const dispatch = useDispatch();
	const [email, setEmail] = React.useState("");
	const [emailError, setEmailError] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordError, setPasswordError] = React.useState("");
	const [responseError, setResponseError] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const isFetching = useSelector(state => state.isFetching);

	useEffect(() => {
		setLoading(isFetching);
	});

	const validate = () => {
		let flag = true;

		if (email == "") {
			flag = false;
			setEmailError("Please enter your email");
		} else if (emailRegex.test(email) == false) {
			flag = false;
			setEmailError("Email address is not correct");
		}

		if (password == "") {
			flag = false;
			setPasswordError("Please enter your password");
		}

		return flag;
	}
	const submit = () => {
		localStorage.clear();
		if (loading) return;
		if (validate() == true) {
			dispatch(Actions.login())
			setResponseError("");
			axios.post("http://api.terralogic.ngrok.io/api/login", {
				email: email,
				password: password
			}).then(res => {
				if (res.data.status === 1) {
					const user = jwtDecoder(res.data.token);
					const token = res.data.token
					const profile = { ...user, token };
					dispatch(Actions.setLoginResult(profile));
					props.history.push("/profile");
				}
				else setResponseError(res.data.msg);
			}).catch(e => {
				setResponseError("Something went wrong, please try again");
			}).finally(() => {
				setLoading(false);
			});
		}
	}

	return (
		<div className="app">
			<div className="main">
				<div className="logo">
					<img src="assets/images/brand-logo.svg" />
				</div>

				<div className="intro">
					<h3>Start Your Personal Photo Experience</h3>
				</div>

				<div className="title">
					<h2>Login Your Account</h2>
				</div>

				<div className="form">
					<div className="group">
						<label>Email</label>
						<div className="input">
							<img src="assets/images/Suche.svg" />
							<input className="email-login" type="email" placeholder="Enter your email" value={email} onChange={e => {
								setEmail(e.target.value);
								setEmailError("");
							}} onKeyUp={e => {
								if (e.which == 13) {
									submit();
								}
							}} />
						</div>
						{
							emailError.length > 0
							&&
							<div className="error-message">{emailError}</div>
						}
					</div>

					<div className="group">
						<label>Password</label>
						<div className="input">
							<img src="assets/images/Suche02.svg" />
							<input className="password-login" type={showPassword == true ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => {
								setPassword(e.target.value);
								setPasswordError("");
							}} onKeyUp={e => {
								if (e.which == 13) {
									submit();
								}
							}} />
							<button onClick={() => {
								setShowPassword(!showPassword);
							}}>
								<img src="assets/images/Suche03.svg" />
							</button>
						</div>
						{
							passwordError.length > 0
							&&
							<div className="error-message">{passwordError}</div>
						}
					</div>

					{
						responseError.length > 0
						&&
						<div className="form-error">
							{responseError}
						</div>
					}

					<div className="buttons">
						<Link to="/register">Register</Link>
						<button className="login-button" onClick={submit}>{loading == true ? "Loading..." : "Login"}</button>
					</div>

					<div className="extra">
						<button className="checkbox"></button>
						<label>Remember pasword</label>
					</div>
				</div>
			</div>

			<div className="images">
				<img src="assets/images/solution-experts.png" />
			</div>
		</div>
	)
}

export default withRouter(SignIn)



