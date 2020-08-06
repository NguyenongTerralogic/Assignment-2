import React, { useRef, useEffect } from "react"
import './style.scss';
import { withRouter } from "react-router-dom";
import axios from "axios";
import { emailRegex, phoneRegex, passwordRegex } from '../../utils/constants';
import {useSelector, useDispatch} from "react-redux";
import * as Actions from "../../Redux/actions.js";

const fileExt = ['png', 'jpg', 'jpeg', 'svg'];

const Profile = props => {
	const isFetching = useSelector(state => state.isFetching);

	let token = localStorage.getItem('token');
	const dispatch = useDispatch();
	const [userInfo, setUserInfo] = React.useState(JSON.parse(localStorage.getItem('key')));
	const [avatar, setAvatar] = React.useState(userInfo.avatar ? userInfo.avatar : "/assets/images/avatar.png");
	const [showPassword, setShowPassword] = React.useState(false);
	const [isLoading, setLoading] = React.useState(false);
	const [newShowPassword, setNewShowPassword] = React.useState(false);
	const [confirmShowPassword, setconfirmShowPassword] = React.useState(false);
	const [emailError, setEmailError] = React.useState("");
	const [confirmPasswordError, setconfirmPasswordError] = React.useState("");
	const [passwordError, setPasswordError] = React.useState("");
	const [fullNameError, setfullNameError] = React.useState("");
	const [phoneNumberError, setPhoneNumberError] = React.useState("");
	let fileRef = useRef();
	let nameRef = useRef();
	let emailRef = useRef();
	let phoneRef = useRef();
	let currPasswordRef = useRef();
	let newPasswordRef = useRef();
	let confirmPasswordRef = useRef();
	const showPasswordHandler = e => {
		e.preventDefault();
		setShowPassword(!showPassword);
	}

	const showNewPasswordHandler = e => {
		e.preventDefault();
		setNewShowPassword(!newShowPassword);
	}

	const showConfirmPasswordHandler = e => {
		e.preventDefault();
		setconfirmShowPassword(!confirmShowPassword);
	}
	useEffect(() => {
		console.log(isFetching)
		setLoading(isFetching);
	});
	const validate = () => {
		let flag = true;
		if (!emailRef.value) {
			flag = false;
			setEmailError("Please enter your email");
		} else if (emailRegex.test(emailRef.value) == false) {
			flag = false;
			setEmailError("Email address is not correct");
		}

		if (!userInfo.name) {
			flag = false;
			setfullNameError('Please put your name');
		}
		if (userInfo.phone.length < 10) {
			flag = false;
			setPhoneNumberError('Your phone is not formatted');
		} else if (phoneRegex.test(userInfo.phone) == false) {
			flag = false;
			setPhoneNumberError("Phone is not formatted");
		}
		return flag;
	}

	const validatePassword = () => {
		let flag = "UPDATE_PASSWORD";

		if(!newPasswordRef.value && !currPasswordRef.value && !confirmPasswordRef.value)
			return "NO_UPDATE_PASSWORD";

		if (!newPasswordRef.value || !currPasswordRef.value) {
			flag="ERROR";
			setPasswordError("Please enter your password");
		}

		if (!passwordRegex.test(newPasswordRef.value)) {
			flag="ERROR";
			setconfirmPasswordError("Your password is not correct");
		}

		if (confirmPasswordRef.value !== newPasswordRef.value) {
			flag="ERROR";
			setconfirmPasswordError("Your password is not correct");
		}
		return flag;
	}

	const handleClick = e => {
		e.preventDefault();
		fileRef.click();
	}

	const fileChange = (e) => {
		e.preventDefault();
		const file = e.target.value.split("\\");
		const fileName = file.slice(-1)[0];
		const fileNameExt = fileName.split(".").slice(-1)[0];

		if (!fileExt.includes(fileNameExt)) {
			alert('Wrong type');
		}
		else {
			let formData = new FormData();
			formData.append("image", e.target.files[0]);
			axios.post('http://api.terralogic.ngrok.io/api/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': 'Bearer ' + token
				}
			}).then(res => {
				alert(res.data.msg);
				localStorage.setItem('linkAvatar', "http://api.terralogic.ngrok.io/" + res.data.data);
				setAvatar("http://api.terralogic.ngrok.io/" + res.data.data);
			}).catch(error => console.log(error.response));
		}

	}

	const updateProfile = () => {
		const info = {
			avatar,
			email: emailRef.value,
			phone: phoneRef.value,
			name: nameRef.value,
			displayName: nameRef.value
		}
		dispatch(Actions.setProfile());
		axios.patch('http://api.terralogic.ngrok.io/api/update', info, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + token
			}
		}).then(res => {
			const result = {...res.data.data};
			localStorage.setItem('key', JSON.stringify(result));
			setUserInfo(result);
			dispatch(Actions.setProfileResult(result, ""));
			setAvatar(res.data.data.avatar ? res.data.data.avatar : avatar);
		});
	}

	const updatePassword = () => {
		const passwordInfo = {
			currentPassword: currPasswordRef.value,
			password: newPasswordRef.value
		}

		axios.post('http://api.terralogic.ngrok.io/api/changePassword', passwordInfo, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
		}).then(res => {
			alert(res.data.msg);
		});
	}


	const saveInfo = (e) => {
		e.preventDefault();
		if (validatePassword() === "UPDATE_PASSWORD") {
			updatePassword();
			updateProfile();
		} else if (validatePassword() === "NO_UPDATE_PASSWORD") updateProfile();
		else alert("ERROR");
	}


	const logout = (e) => {
		e.preventDefault();
		localStorage.clear();
		props.history.push('/');
	}


	return (
		<div className="container">
			<div className="container">
				<div className="header">
					<h1 className="font-weight-bold">My Profile</h1>
					<p>Manage your profile and contact information.</p>
				</div>
				<div className="body">
					<div className="row">
						<div className="user-avatar ml-3">
							<img className="avatar" src={avatar} />
							<form>
								<button className="editBtn" onClick={handleClick}><img src="assets/images/edit_photo.svg" /></button>
								<input type="file" onChange={fileChange} className="form-control-file" id="exampleFormControlFile1" ref={input => fileRef = input}></input>
							</form>
						</div>
						<div className="user-name p-1 ml-3 font-weight-bold">{userInfo.displayName}</div>
					</div>
					<form>
						<div className="form-row">
							<div className="form-group col">
								<label for="nameInput">Full name</label>
								<input type="text" className="form-control" ref={input => nameRef = input} defaultValue={userInfo.name} />
							</div>
							<div className="form-group col">

							</div>
						</div>
						<div className="form-row">
							<div className="form-group col">
								<label for="emailInput">Email</label>
								<input type="text" className="form-control" ref={input => emailRef = input} defaultValue={userInfo.email} />
							</div>
							<div className="form-group col">
								<label for="phoneInput">Phone</label>
								<input type="text" className="form-control" ref={input => phoneRef = input} defaultValue={userInfo.phone} />
							</div>
						</div>
						<hr />
						<h3 className="change-password-title mb-4">Change Password</h3>
						<div className="form-row">
							<div className="form-group col">
								<label for="currentPwdInput">Current Password</label>
								<input type={showPassword === true ? "text" : "password"} className="form-control" ref={input => currPasswordRef = input} defaultValue={null} />
								<button className="showBtn" onClick={showPasswordHandler}>
									<img src="assets/images/Suche04.svg" />
								</button>
							</div>
							<div className="form-group col">

							</div>
						</div>
						<div className="form-row">
							<div className="form-group col">
								<label for="newPwdInput">New Password</label>
								<input type={newShowPassword === true ? "text" : "password"} className="form-control" ref={input => newPasswordRef = input} defaultValue={null} />
								<button className="showBtn" onClick={showNewPasswordHandler}>
									<img src="assets/images/Suche04.svg" /></button>
							</div>
							<div className="form-group col">
								<label for="confirmPwdInput">Confirm Password</label>
								<input type={confirmShowPassword === true ? "text" : "password"} className="form-control" ref={input => confirmPasswordRef = input} defaultValue={null} />
								<button className="showBtn" onClick={showConfirmPasswordHandler}>
									<img src="assets/images/Suche04.svg" />
								</button>
							</div>
						</div>
						<div className="form-row mt-5">
							<button className="saveBtn" onClick={saveInfo}>Save</button>
							<button className="logoutBtn" onClick={logout}>Log out</button>						
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default withRouter(Profile);