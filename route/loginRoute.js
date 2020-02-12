var express = require("express");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var db = require("../db/loginDB");
var passport   = require("../services/passport")
var signAuth   = require("../services/signAuth")
var ensureAuth   = require("../services/ensureAuth")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();


router.get("/",[signAuth], function(req, res){
	res.render("login/login.html")
})

router.post("/signin", [urlencodedParser,passport.authenticate('local', {failureRedirect: '/login'})], function(req, res){
	res.redirect('/dashboard');
})

router.post("/logout",[urlencodedParser], function(req, res){
	req.session.destroy(function(err){
		res.redirect("/login")
	});
})

router.get("/signUp", function(req, res){
	res.render("login/signUp.html")
})

router.post("/insertUserInfo",[jsonParser], function(req, res){
	console.log(req.body)
	var user_name = req.body.user_name;
	var user_id = req.body.user_id;
	var user_password = req.body.user_password;
	
	db.insertUserInfo(user_name, user_id, user_password, function(result) {
		res.send(result);
	})
})

module.exports = router;