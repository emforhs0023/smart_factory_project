var pool = require("../services/database").pool;

module.exports.selectName = function(user_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT * FROM tbl_factory WHERE user_id = ? ";
		connection.query(query,[user_id],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				// callback(true);
				callback(result);
			})
	})
}

module.exports.selectInfo = function(factory_code, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT * FROM tbl_machine WHERE factory_code=? GROUP BY line";
		connection.query(query,[factory_code],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				// callback(true);
				callback(result);
			})
	})
}

module.exports.selectMachineInfo = function(lineSelect, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT * FROM tbl_machine t1 JOIN tbl_sensor t2 ON t1.node_id = t2.node_id WHERE t1.line=? GROUP BY t1.node_id ";
		connection.query(query,[lineSelect],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				// callback(true);
				callback(result);
			})
	})
}

module.exports.sensorInfo = function(node_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT * FROM tbl_sensor WHERE node_id=?";
		var sensorQuery ="SELECT count(*) AS count FROM tbl_sensor WHERE node_id= ?"
        connection.query(query+";"+sensorQuery , [node_id, node_id],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				// callback(true);
				callback(result);
			})
	})
}

module.exports.changeSelectLine = function(nameSelect, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT * FROM tbl_machine WHERE factory_code=? GROUP BY line";
		connection.query(query,[nameSelect],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				// callback(true);
				callback(result);
			})
	})
}

module.exports.changeSelectMachine = function(lineSelect, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT * FROM tbl_machine t1 JOIN tbl_sensor t2 ON t1.node_id = t2.node_id WHERE t1.line= ? GROUP BY t1.node_id ";
		connection.query(query,[lineSelect],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				// callback(true);
				callback(result);
			})
	})
}