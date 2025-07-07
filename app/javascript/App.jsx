import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Zuckerbook from './pages/Zuckerbook'

function App() {
	// const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
  return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/z" element={<Zuckerbook />} />
				<Route path="/z/posts" element={<Zuckerbook />} />
				<Route path="/z/posts/:id" element={<Zuckerbook />} />
			</Routes>
		</BrowserRouter>
  )
}

export default App