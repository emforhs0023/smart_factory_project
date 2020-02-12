var express = require("express");
var db = require("../db/dataSetDB");
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
		var user_id = req.session.passport.user.user_id;
		res.render("dataSet/index.html", {"user_id" : user_id})
	} catch(e) {
		next(e);
	}
})

router.get("/selectName", [jsonParser],  function(req, res, next) {
	try {
		var user_id = req.query.user_id
		db.selectName(user_id, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.get("/selectInfo", [jsonParser],  function(req, res, next) {
	try {
		var factory_code = req.query.factory_code;

		db.selectInfo(factory_code, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})


router.get("/selectMachineInfo", [jsonParser],  function(req, res, next) {
	try {
		var lineSelect = req.query.lineSelect;
		
		db.selectMachineInfo(lineSelect, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.get("/sensorInfo", [jsonParser],  function(req, res, next) {
	try {
		var node_id = req.query.node_id
		console.log(node_id)
		db.sensorInfo(node_id, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.get("/changeSelectLine", [jsonParser],  function(req, res, next) {
	try {
		var nameSelect = req.query.nameSelect

		db.changeSelectLine(nameSelect, function(result){
			res.send(result)
		})
	} catch(e) {
		next(e);
	}
})



router.get("/changeSelectMachine", [jsonParser],  function(req, res, next) {
	try {
		var lineSelect = req.query.lineSelect

		db.changeSelectMachine(lineSelect, function(result){
			res.send(result)
		})
	} catch(e) {
		next(e);
	}
})



module.exports = router;