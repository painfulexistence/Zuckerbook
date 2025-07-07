import React from "react"
import ReactDOM from "react-dom/client"
import App from './App'

document.addEventListener("DOMContentLoaded", () => {
	const root = document.getElementById("root")
	if (root) {
		ReactDOM.createRoot(root).render(<App />)
	}
})