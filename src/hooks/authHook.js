import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER } from "../redux/reducer";
import axios from "axios";

function LoginHook() {
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	function login() {
		const redirectUri = encodeURIComponent(
			`${window.location.origin}/api/auth/callback`
		);
		window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
	}

	function logout() {
		axios.get("/api/auth/logout").then((user) => {
			console.log(user);
			dispatch({ type: SET_USER, payload: null });
		});
	}

	useEffect(() => {
		console.log("hit");
		axios.get("/api/auth/get_session").then((user) => {
			console.log(user);
			dispatch({ type: SET_USER, payload: user.data });
		});
	}, [dispatch]);

	return { user, login, logout };
}

export default LoginHook;
