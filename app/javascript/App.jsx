import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { QueryProvider } from './contexts/QueryProvider'
import ProtectedRoute from './pages/ProtectedRoute'
import Home from './pages/Home'
import Zuckerbook from './pages/Zuckerbook'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Account from './pages/Account'
import Post from './pages/PostWatch'

function App() {
	// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  return (
		<QueryProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/z/sign_in" element={<SignIn />} />
						<Route path="/z/sign_up" element={<SignUp />} />
						<Route path="/z" element={<ProtectedRoute />}>
							<Route path="/z" element={<Zuckerbook />} />
							<Route path="/z/posts" element={<Zuckerbook />} />
							<Route path="/z/posts/:id" element={<Post />} />
							<Route path="/z/my_account" element={<Account />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</QueryProvider>
  )
}

export default App
