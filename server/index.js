require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const authRouter = require("./routes/auth");
const massive = require("massive");
const { SESSION_SECRET, CONNECTION_STRING } = process.env;
app.use(express.json());

app.use(
	session({
		secret: SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24 * 14
		}
	})
);

massive(CONNECTION_STRING).then((db) => {
	console.log("db connected");
	app.set("db", db);
});

app.use("/api/auth", authRouter);
// app.use("/api/store");

const port = 4000;
app.listen(port, () => console.log(`server listening on port ${port}`));
