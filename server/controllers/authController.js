const axios = require("axios");
const {
	REACT_APP_AUTH0_CLIENT_ID,
	AUTH0_CLIENT_SECRET,
	REACT_APP_AUTH0_DOMAIN
} = process.env;

module.exports = {
	login: async (req, res) => {
		console.log("hit");
		const db = req.app.get("db");
		var payLoad = {
			client_id: REACT_APP_AUTH0_CLIENT_ID,
			client_secret: AUTH0_CLIENT_SECRET,
			code: req.query.code,
			grant_type: "authorization_code",
			redirect_uri: `http://localhost:3000/api/auth/callback`
		};

		const accessTokenResponse = await axios.post(
			`https://${REACT_APP_AUTH0_DOMAIN}/oauth/token`,
			payLoad
		);

		const accessToken = accessTokenResponse.data.access_token;
		const { data: userInfo } = await axios.get(
			`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo/?access_token=${accessToken}`
		);
		console.log("==========>>>>>>", userInfo);
		const [registeredUser] = await db.find_user(userInfo.email);

		if (!registeredUser) {
			const [newUser] = await db.create_user(userInfo.email);
			req.session.user = newUser;
			console.log("new-user");
			res.redirect("/");
		} else {
			console.log("returnUser");

			req.session.user = registeredUser;
			res.redirect("/");
		}
	},
	logout: (req, res, next) => {
		req.session.destroy();
		res.sendStatus(200).end();
	},
	sessionCheck: async (req, res, next) => {
		const db = req.app.get("db");
		if (req.session.user) {
			const [registeredUser] = await db.find_user(req.session.user.email);
			req.session.user = registeredUser;
			res.status(200).send(req.session.user);
		} else {
			res.end();
		}
	}
};
