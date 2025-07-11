import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
		<>
			<div className="hero-section">
				<h1 className="hero-title">
					Zuckerbook<span className="status-badge">Open Source</span>
				</h1>
				<p className="hero-subtitle">Your Social Media, Your Panopticon</p>

				<div>
					<a href="/api-docs" className="btn-custom" target="_blank" rel="noreferrer">
						<i className="fas fa-code" /> Try API
					</a>
					<Link to="/z" className="btn-custom">
						<i className="fas fa-arrow-right" /> Go to App
					</Link>
				</div>
			</div>

			<div className="overview-section">
				<h2 className="text-center mb-4">
					<i className="fas fa-rocket" /> Features
				</h2>

				<div className="row">
					<div className="col-md-6">
						<h4><i className="fas fa-user-shield" /> Authentication</h4>
						<div className="feature">
							<div className="feature-item">JWT-based authentication</div>
						</div>
					</div>

					<div className="col-md-6">
						<h4><i className="fas fa-comments" /> Authorization</h4>
						<div className="feature">
							<div className="feature-item">Role-based authorization</div>
						</div>
					</div>
				</div>

				<div className="row mt-2">
					<div className="col-md-6">
						<h4><i className="fas fa-users" /> Social Interactions</h4>
						<div className="feature">
							<div className="feature-item">Friendships</div>
							<div className="feature-item">Followers</div>
							<div className="feature-item">My activities</div>
							<div className="feature-item">Block users</div>
						</div>
					</div>

					<div className="col-md-6">
						<h4><i className="fas fa-pen" /> Posts & Comments</h4>
						<div className="feature">
							<div className="feature-item">Write posts</div>
							<div className="feature-item">Comment on posts</div>
							<div className="feature-item">Like posts</div>
							<div className="feature-item">Public/private posts</div>
						</div>
					</div>
				</div>

				<div className="row mt-2">
					<div className="col-md-6">
						<h4><i className="fas fa-comment-dots" /> Messages</h4>
						<div className="feature">
							<div className="feature-item">Instant messages</div>
						</div>
					</div>

					<div className="col-md-6">
						<h4><i className="fas fa-eye" /> Admin</h4>
						<div className="feature">
							<div className="feature-item">Activity dashboard</div>
							<div className="feature-item">Ban users</div>
						</div>
					</div>
				</div>

				<div className="alert alert-warning mt-4" style={{ background: "rgba(255,193,7,0.2)", border: "1px solid rgba(255,193,7,0.3)", color: "#fff" }}>
					<i className="fas fa-exclamation-triangle" /> Sorry, no public post for now! Maybe you should <Link to="/z/sign_up" style={{ color: "#fff", textDecoration: "underline" }}><strong>sign up</strong></Link>.
				</div>
			</div>

			<div className="text-center" style={{ padding: "40px 20px", color: "white" }}>
				<h3><i className="fas fa-smile" /> Enjoy your social life alone in the room</h3>
			</div>
		</>
  )
}

export default Home