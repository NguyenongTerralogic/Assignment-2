import React from "react"
import { Link, withRouter } from "react-router-dom";
// import "./style.css"
import { emailRegex, phoneRegex, passwordRegex } from "../../utils/constants";
import axios from "axios";

const SignIn = props => {
	const [email, setEmail] = React.useState("");
	const [emailError, setEmailError] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [confirmPassword, setconfirmPassword] = React.useState("");
	const [confirmPasswordError, setconfirmPasswordError] = React.useState("");
	const [fullName, setFullName] = React.useState("");
	const [passwordError, setPasswordError] = React.useState("");
	const [fullNameError, setfullNameError] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [phoneNumberError, setPhoneNumberError] = React.useState("");
	const [responseError, setResponseError] = React.useState("");
	const [showPassword, setShowPassword] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

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
		} else if (passwordRegex.test(password) == false) {
			flag = false;
			setPasswordError("Your password is weak");
		}
		if (confirmPassword !== password || confirmPassword == "") {
			flag = false;
			setconfirmPasswordError("Your password is not correct");
		}
		if (fullName == "") {
			flag = false;
			setfullNameError('Please put your name');
		}
		if (phoneNumber.length < 10) {
			flag = false;
			setPhoneNumberError('Your phone is not formatted');
		} else if (phoneRegex.test(phoneNumber) == false) {
			flag = false;
			setPhoneNumberError("Phone is not formatted");
		}
		return flag;
	}

	const submit = () => {
		if (loading) return;

		if (validate() == true) {
			setResponseError("");

			setLoading(true);
			axios.post("http://api.terralogic.ngrok.io/api/register", {
				email: email,
				password: password,
				name: fullName,
				phone: phoneNumber
			}).then(res => {
				console.log(res);
				if (res.data.status === 1) {
					props.history.push("/login");
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
					<h2>Register an account</h2>
				</div>

				<div className="form">
					<div className="group">
						<label>Email</label>
						<div className="input">
							<img src="assets/images/Suche.svg" />
							<input type="email" placeholder="Enter your email" value={email} onChange={e => {
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
							<input type={showPassword == true ? "text" : "password"} placeholder="Enter your password" value={password} onChange={e => {
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

					<div className="group">
						<label>Confirm Password</label>
						<div className="input">
							<img src="assets/images/Suche02.svg" />
							<input type={showPassword == true ? "text" : "password"} placeholder="Enter your password" value={confirmPassword} onChange={e => {
								setconfirmPassword(e.target.value);
								setconfirmPasswordError("");
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
							confirmPasswordError.length > 0
							&&
							<div className="error-message">{confirmPasswordError}</div>
						}
					</div>

					<div className="group">
						<label>Full Name</label>
						<div className="input">
							<img src="assets/images/Suche.svg" />
							<input type="text" placeholder="Enter your name" value={fullName} onChange={e => {
								setFullName(e.target.value);
								setfullNameError("");
							}} onKeyUp={e => {
								if (e.which == 13) {
									submit();
								}
							}} />
						</div>
						{
							fullNameError.length > 0
							&&
							<div className="error-message">{fullNameError}</div>
						}
					</div>
					<div className="group">
						<label>Phone Number</label>
						<div className="input">
							<img src="assets/images/Suche.svg" />
							<input type="text" placeholder="Enter your phone number" value={phoneNumber} onChange={e => {
								setPhoneNumber(e.target.value);
								setPhoneNumberError("");
							}} onKeyUp={e => {
								if (e.which == 13) {
									submit();
								}
							}} />
						</div>
						{
							phoneNumberError.length > 0
							&&
							<div className="error-message">{phoneNumberError}</div>
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
						<Link to="/">Back</Link>
						<button onClick={submit}>Submit</button>
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



