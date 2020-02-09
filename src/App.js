import React from "react";
import authHook from "./hooks/authHook";
import "./App.css";

function App() {
	const { login } = authHook();
	return (
		<div className="App">
			<button onClick={login}>Login</button>
		</div>
	);
}

export default App;
