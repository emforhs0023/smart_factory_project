var express = require("express");
var db = require("../db/dashboardDB");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
var ensureAuth   = require("../services/ensureAuth")
// var socketHandler = require("../services/socketHandler");
// var MQTTService = require("../services/MQTTService")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();
// var async = require("async");s

//웹페이지 경로
router.get("/", [ensureAuth], function(req, res, next) {
	try {
		var user_id = req.session.passport.user.user_id
		res.render("dashboard/index.html", {"user_id" : user_id})
	} catch(e) {
		next(e);
	}
})

router.get("/realtimedata", function(req, res, next){
	try{
		var user_id = req.query.user_id;
		db.realTimeData(user_id, function(result){
			res.send(result)
		})
	} catch(e){
		next(e);
	}
})

function setup_limit(limit, count){ // 두개의 인자값을 사용한다 
	count = 16;

	min_limit = parseInt(limit)
    max_limit = parseInt(limit) + count	

    return [min_limit, max_limit]// 인자 값은 배열로 받을 것이다
}

router.post("/countErr", [urlencodedParser], function(req, res, next){
	try{

		var draw = req.body.draw;
		var start = req.body.start;
		var length = req.body.length;
		var user_id = req.body.user_id;
		
		var a = new Array();
		var a = setup_limit(start)

		db.countErr(user_id, a[0], a[1], function(result){
			data = {"draw":draw, "data":result[0], "recordsTotal":result[1], "recordsFiltered": result[1]}
			res.json(data)
		})
	} catch(e){
		next(e);
	}
})

router.get("/trend", function(req, res, next){
	try{
		// var user_id = req.query.user_id;
		var user_id = req.query.user_id;
		// console.log(user_id)
		db.trend(user_id, function(result){
			res.send(result)
		})	
	}catch(e){
		next(e);
	}
})

router.get("/multiId", function(req, res, next){
	try{
		var user_id = req.query.user_id;

		db.multiId(user_id, function(result){
			res.send(result)
		})	
	}catch(e){
		next(e);
	}
})

router.post("/arrValue", function(req, res, next){
	try{
		console.log(req.body)

		// db.multiId(user_id, function(result){
		// 	res.send(result)
		// })	
	}catch(e){
		next(e);
	}
})


module.exports = router;