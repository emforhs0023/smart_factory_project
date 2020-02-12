var express = require("express");
var db = require("../db/monitoringDB");
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
		res.render("monitoring/index.html",{"user_id" : user_id});
	} catch(e) {
		next(e);
	}
})
router.get("/table", function(req, res, next){
	try{
		res.render("monitoring/table.html")
	}catch(e){
		next(e);
	}
})

router.get("/select_factory", function(req, res, next){
	try{
		var user_id = req.query.user_id;
		db.selectFactory(user_id, function(result){
			res.send(result)
		})
	}catch (e){
		next(e)
	}
})

//select_line
router.get("/select_line", function(req, res, next){
	try{
		var factory_code = req.query.factory_code;
		db.selectLine(factory_code, function(result){
			res.send(result)
		})
	}catch (e){
		next(e)
	}
})

//select_machine
router.get("/select_machine", function(req, res, next){
	try{
		var factory_code = req.query.factory_code;
		var line = req.query.line;
		db.selecMachine(factory_code, line, function(result){
			res.send(result)
		})
	}catch (e){
		next(e)
	}
})

function setup_limit(limit, count){ // 두개의 인자값을 사용한다 
	count = 16;

	min_limit = parseInt(limit)
    max_limit = parseInt(limit) + count	

    return [min_limit, max_limit]// 인자 값은 배열로 받을 것이다
}

router.get("/last_one_hour_data", function(req, res, next){
	try{
		var draw = req.query.draw;
		var start = req.query.start;
		var length = req.query.length;
		var factory_code = req.query.factory_code;
		var line = req.query.line;
		var node_id = req.query.node_id;

		var a = new Array();
		var a = setup_limit(start)

		db.LastOneHourData(factory_code, line, node_id, a[0], a[1], function(result){
			data = {"draw":draw, "data":result[0], "recordsTotal":result[1], "recordsFiltered": result[1]}
			res.json(data)
			// console.log(data)
		})
	}catch(e){
		next(e)	
	}
})

router.get("/last_one_hour_count", function(req ,res, next){
	try{
		var node_id = req.query.node_id;

		db.LastOneHourCount(node_id, function(result){
			// console.log(result)
			res.send(result)
		})
	}catch(e){
		next(e)	
	}
})

router.get("/last_one_hour_temp", function(req ,res, next){
	try{
		// var factory_code = req.query.factory_code;
		// var line = req.query.line;
		var node_id = req.query.node_id;

		db.LastOnHourTemp(node_id, function(result){
			// console.log(result)
			res.send(result)
		})
	}catch(e){
		next(e)	
	}
})

router.get("/last_data_message", function(req ,res, next){
	try{
		var node_id = req.query.node_id;

		db.lastDataMessage(node_id, function(result){
			// console.log(result)
			res.send(result)
		})
	}catch(e){
		next(e)	
	}
})

router.get("/avg_production_time", function(req, res, next){
	try{
		var node_id = req.query.node_id;
		db.avgProductionTime(node_id, function(result){
			res.send(result)
		})
	}catch(e){
		next(e)
	}
})

router.get("/last_temp_data", function(req, res, next){
	try{
		var node_id = req.query.node_id;
		// var type = 'temp';

		db.lastTempData(node_id, function(result){
			// console.log(result)
			res.send(result);
		})
	}catch(e){
		next(e)
	}
})

router.get("/state", function(req, res, next){
	try{
		var node_id = req.query.node_id;
		db.state(node_id, function(result){
			res.send(result);
		})
	}catch(e){
		next(e)
	}
})


router.get("/table_test", function(req, res, next){
	try{
		var node_id = req.query.node_id;
	
	}catch(e){
		next(e)
	}
})

router.get("/device_state", function(req, res, next){
	try{
		var node_id = req.query.node_id;
		db.deviceState(node_id, function(result){
			res.send(result);
		})
	}catch(e){
		next(e)
	}
})
module.exports = router;