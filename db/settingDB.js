var pool = require("../services/database").pool;

//전체 layer 요청(layer)

module.exports.factoryDataInfo = function(user_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT * FROM tbl_user t1 JOIN tbl_factory t2 ON t1.user_id = t2.user_id  WHERE t1.user_id = ?";
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

module.exports.insertfactoryData = function(factoryCode, factoryName, user_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "INSERT INTO tbl_factory (factory_code, factory_name, user_id, regi_date) VALUES (?,?,?,NOW())";
		connection.query(query,[factoryCode,factoryName,user_id],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				callback(true);
				// callback(result);s
			})
	})
}

module.exports.updateName = function(newNameValue, seq, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "UPDATE tbl_factory SET factory_name=? WHERE seq = ?"
		connection.query(query,[newNameValue, seq],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				callback(true);
			})
	})
}

module.exports.factoryDelete = function(seq, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        var query ="Delete from tbl_factory where seq = ?"
        connection.query(query, [seq],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                callback(true);
                // callback(result);
            })
    })
}

module.exports.machinesInfo = function(seq, factory_code, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "select * from tbl_factory t1 join tbl_machine t2 on t1.factory_code = t2.factory_code where t1.seq = ? AND t2.factory_code=?";
		connection.query(query,[seq, factory_code],
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

module.exports.insertAddMachines = function(lineName, nodeId, machineName, workerName, productName, factory_code, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "INSERT INTO tbl_machine (node_id, line, machine_name, worker, product, factory_code, regi_date) VALUES (?,?,?,?,?,?,NOW()) ";
		connection.query(query,[nodeId, lineName, machineName, workerName, productName, factory_code],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				callback(true);
				// callback(result);s
			})
	})
}

module.exports.factoryMachinesInfo = function(user_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT t3.seq, t4.factory_code, t4.factory_name, t3.line, t3.node_id FROM tbl_machine t3 JOIN (SELECT t2.factory_code, t2.factory_name FROM tbl_user t1 JOIN tbl_factory t2 ON t1.user_id = t2.user_id  WHERE t1.user_id = ?) t4 ON t3.factory_code = t4.factory_code";
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

module.exports.machineDelete = function(node_id, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        query ="Delete from tbl_machine where node_id = ?"
        var sensorQuery ="Delete from tbl_sensor where node_id = ?"
        connection.query(query+";"+sensorQuery , [node_id, node_id],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false);
                    return;
                }

                callback(true);
                // callback(result);
            })
    })
}

module.exports.sensorInfo = function(node_id, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return;
        }
        var query = "SELECT * FROM tbl_sensor WHERE node_id = ?"
        connection.query(query, [node_id],
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

module.exports.insertAddSensor = function(node_id, sensorType, sensor_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "INSERT INTO tbl_sensor (node_id, sensor_id, TYPE, regi_date) VALUES (?, ?, ?, NOW()) ";
		connection.query(query,[node_id,  sensor_id, sensorType],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				callback(true);
				// callback(result);s
			})
	})
}