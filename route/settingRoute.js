var express = require("express");
var db = require("../db/settingDB");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
var ensureAuth   = require("../services/ensureAuth")
// var socketHandler = require("../services/socketHandler");
// var MQTTService = require("../services/MQTTService")
var urlencodedParser = bodyParser.urlencoded({extended : false})
var router = express.Router();
// var async = require("async");s

//웹페이지 경로
router.get("/", [ensureAuth],  function(req, res, next) {
	try {
		var user_id = req.session.passport.user.user_id;
		res.render("system/index.html", {"user_id" : user_id})
	} catch(e) {
		next(e);
	}
})

router.get("/factoryDataInfo", [jsonParser],  function(req, res, next) {
	try {
		var user_id = req.query.user_id

		db.factoryDataInfo(user_id, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})


router.post("/insertfactoryData", [jsonParser],  function(req, res, next) {
	try {
		var factoryCode = req.body.factoryCode;
		var factoryName = req.body.factoryName;
		var user_id = req.body.user_id;
		db.insertfactoryData(factoryCode, factoryName, user_id, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.put("/updateName", [jsonParser],  function(req, res, next) {
	try {
		var newNameValue = req.body.newNameValue;
		var seq = req.body.seq;
		db.updateName(newNameValue, seq, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.delete("/factoryDelete", function(req, res, next){
	try{
		var seq = req.query.seq;
		db.factoryDelete(seq, function(result){
			res.send(result);
		})
	} catch(e){
		next(e)
	}
})

router.get("/machinesInfo", [jsonParser],  function(req, res, next) {
	try {
		var seq = req.query.seq;
		var factory_code = req.query.factory_code;

		db.machinesInfo(seq, factory_code, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.post("/insertAddMachines", [jsonParser],  function(req, res, next) {
	try {
		var lineName = req.body.lineName;
		var nodeId = req.body.nodeId;
		var machineName = req.body.machineName;
		var workerName = req.body.workerName;
		var productName = req.body.productName;
		var	factory_code = req.body.factory_code;

		db.insertAddMachines(lineName, nodeId, machineName, workerName, productName, factory_code, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.get("/factoryMachinesInfo", [jsonParser],  function(req, res, next) {
	try {
		var user_id = req.query.user_id;

		db.factoryMachinesInfo(user_id, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.delete("/machineDelete", function(req, res, next){
	try{
		var node_id = req.query.node_id;
		
		db.machineDelete(node_id, function(result){
			res.send(result);
		})
	} catch(e){
		next(e)
	}
})

router.get("/sensorInfo", [jsonParser],  function(req, res, next) {
	try {
		var node_id = req.query.node_id;

		db.sensorInfo(node_id, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

router.post("/insertAddSensor", [jsonParser],  function(req, res, next) {
	try {
		var node_id = req.body.node_id;
		var sensorType = req.body.sensorType;
		var sensor_id = req.body.sensor_id;

		db.insertAddSensor(node_id, sensorType, sensor_id, function(result) {
			res.send(result);
		})
	} catch(e) {
		next(e);
	}
})

module.exports = router;