import React from "react"

const Profile = props => {
	return (
		<div className="Rectangle container">
			<div className="container">
				<div className="header">
					<h1>My Profile</h1>
					<p>Manage your profile and contact information</p>
				</div>
			</div>
			<div className="body">
				<div className="container">
					<div className="avatar-username">
						<div className="avatar">
							<img src="assets/images/avatar.png" />
						</div>
						<h2></h2>
					</div>
					<form>
						<div className="form-row">
							<div className="col full-name">
								<label>Full name</label>
								<input type="text" class="form-control form-control-lg"></input>
							</div>
							<div className="col">

							</div>
						</div>

						<div className="form-row">
							<div className="col email">
								<label>Email</label>
								<input type="text" class="form-control form-control-lg"></input>
							</div>
							<div className="col phone">
								<label>Phone</label>
								<input type="text" class="form-control form-control-lg"></input>
							</div>
						</div>
						<hr />
						<h3>Change Password</h3>
						<div className="form-row">
							<div className="col current-password">
								<label>Current Password</label>
								<input type="password" class="form-control form-control-lg"></input>
							</div>
							<div className="col">

							</div>
						</div>

						<div className="form-row">
							<div className="col new-password">
								<label>New Password</label>
								<input type="password" class="form-control form-control-lg"></input>
							</div>
							<div className="col confirm-password">
								<label>Confirm Password</label>
								<input type="password" class="form-control form-control-lg"></input>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default Profile;