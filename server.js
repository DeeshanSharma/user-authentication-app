const express = require("express");
const router = express.Router();
const app = express();
const mongoose = require("mongoose");
const expressEjsLayout = require("express-ejs-layouts");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);

mongoose
	.connect("mongodb://localhost/usersdb", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Database Connected.."))
	.catch((err) => console.log(err));

app.set("view engine", "ejs");
app.use(expressEjsLayout);
app.use(express.urlencoded({ extended: false }));
//express session
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());
//use flash
app.use(flash());
app.use((req, res, next) => {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(3000);
