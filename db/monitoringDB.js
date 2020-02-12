var pool = require("../services/database").pool;

module.exports.selectFactory = function(user_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "select * from tbl_factory where user_id = ?";
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

module.exports.selectLine = function(factory_code, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "select * from tbl_machine where factory_code = ? GROUP BY line";
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
// selecMachine

module.exports.selecMachine = function(factory_code, line, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "select * from tbl_machine where factory_code = ? and line = ?";
		connection.query(query,[factory_code,line], 
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
module.exports.LastOneHourData = function(factory_code, line, node_id, a, b, callback){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}

		var query = "SELECT t4.value, t4.type, t4.regi_date "
					+ "FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE t1.factory_code = ? AND t2.line = ?) t3 "
					+ "JOIN tbl_sensor_log t4 ON t3.node_id = t4.node_id WHERE t4.node_id = ? AND t4.regi_date >= DATE_ADD(NOW(), INTERVAL -1 HOUR) ORDER BY regi_date DESC limit ?, 6";
		var count_query = "SELECT count(*) as count "
					+ "FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE t1.factory_code = ? AND t2.line = ?) t3 "
					+ "JOIN tbl_sensor_log t4 ON t3.node_id = t4.node_id WHERE t4.node_id = ? AND t4.regi_date >= DATE_ADD(NOW(), INTERVAL -1 HOUR)";
		// var query = "SELECT t4.value, t4.type, t4.regi_date "
		// 			+ "FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE t1.factory_code = ? AND t2.line = ?) t3 "
		// 			+ "JOIN tbl_sensor_log t4 ON t3.node_id = t4.node_id WHERE t4.node_id = ? AND t4.regi_date >= DATE_ADD(NOW(), INTERVAL -1 HOUR)";
		connection.query(query+";"+count_query, [factory_code, line, node_id, a, factory_code, line, node_id],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}
				callback([result[0],result[1][0].count])
				// callback(result)
			})
	})
}

module.exports.LastOneHourCount = function(node_id, callback){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}

		// var query = "SELECT count(*) as 'count' "
		// 			+ "FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE t1.factory_code = ? AND t2.line = ?) t3 "
		// 			+ "JOIN tbl_sensor_log t4 ON t3.node_id = t4.node_id WHERE t4.node_id = ? AND t4.regi_date >= DATE_ADD(DATE_FORMAT(NOW(),'%Y-%m-%d %H:00:00'), INTERVAL -1 HOUR) and t4.value=0";
		var query = "SELECT COUNT(*) as count FROM tbl_count_log WHERE node_id = ? AND reg_date > DATE_ADD(NOW(), INTERVAL -1 HOUR) AND state = 'e'";
		// var query = "SELECT count(*) as 'count' "
		// 			+ "FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE t1.factory_code = ? AND t2.line = ?) t3 "
		// 			+ "JOIN tbl_sensor_log t4 ON t3.node_id = t4.node_id WHERE t4.node_id = ? AND t4.regi_date >= DATE_ADD(NOW(), INTERVAL -1 HOUR) and t4.value=0";
		connection.query(query, [node_id],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				callback(result)
			})
	})
}
module.exports.LastOnHourTemp = function(node_id, callback){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}

		// var query = "SELECT t4.value, t4.type, t4.regi_date "
		// 			+ "FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE t1.factory_code = ? AND t2.line = ?) t3 "
		// 			+ "JOIN tbl_sensor_log t4 ON t3.node_id = t4.node_id WHERE t4.node_id = ? AND t4.regi_date >= DATE_ADD(DATE_FORMAT(NOW(),'%Y-%m-%d %H:00:00'), INTERVAL -1 HOUR) and t4.value=0";

		// var query = "SELECT t4.value, t4.type, t4.regi_date "
		// 			+ "FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE t1.factory_code = ? AND t2.line = ?) t3 "
		// 			+ "JOIN tbl_sensor_log t4 ON t3.node_id = t4.node_id WHERE t4.node_id = ? AND t4.regi_date >= DATE_ADD(NOW(), INTERVAL -1 HOUR)";
		var query = "SELECT * FROM tbl_sensor_log WHERE node_id = ? AND regi_date > DATE_ADD(NOW(), INTERVAL -1 HOUR) AND TYPE='temp'"
		connection.query(query, [node_id,],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				callback(result)
			})
	})
}

module.exports.lastDataMessage = function(node_id, callback){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}

		// var query = "SELECT count(*) as 'count' "
		// 			+ "FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE t1.factory_code = ? AND t2.line = ?) t3 "
		// 			+ "JOIN tbl_sensor_log t4 ON t3.node_id = t4.node_id WHERE t4.node_id = ? AND t4.regi_date >= DATE_ADD(DATE_FORMAT(NOW(),'%Y-%m-%d %H:00:00'), INTERVAL -1 HOUR) and t4.value=0";

		var query = "SELECT * FROM tbl_machine t1 JOIN tbl_sensor_log t2 ON t1.node_id = t2.node_id WHERE t1.node_id = ? ORDER BY t2.seq DESC  LIMIT 1";
		connection.query(query, [node_id],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}

				callback(result)
			})
	})
}

module.exports.avgProductionTime = function(node_id, callback){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT value FROM tbl_count_log WHERE node_id = ? ORDER BY reg_date DESC LIMIT 1";
		connection.query(query, [node_id],
			function(err, result){
				connection.release();

				if(err){
					console.log(err);
					callback(false);
					return;
				}
				callback(result)
			})

	})
}

module.exports.lastTempData = function(node_id, callback){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT * FROM tbl_machine t1 JOIN tbl_sensor_log t2 ON t1.node_id = t2.node_id WHERE t1.node_id = ? AND t2.type = 'TEMP' ORDER BY t2.seq DESC  LIMIT 1";
		connection.query(query, [node_id],
			function(err, result){
				connection.release();

				if(err){
					console.log(err);
					callback(false);
					return;
				}
				callback(result)
			})
	})
}
module.exports.state = function(node_id, callback){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT state FROM tbl_count_log WHERE node_id = ? ORDER BY reg_date DESC LIMIT 1";
		connection.query(query, [node_id],
			function(err, result){
				connection.release();

				if(err){
					console.log(err);
					callback(false);
					return;
				}
				callback(result)
			})
	})
}

module.exports.deviceState = function(node_id, callback){
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		// var query = "SELECT DATE_FORMAT(reg_date, '%Y-%m-%d %H') DAY, COUNT(IF(state='e', state, NULL)) cnt FROM tbl_count_log  WHERE reg_date > DATE_FORMAT(CURDATE(), '%Y-%m-%d %H:%i:%s') AND node_id = ? GROUP BY DAY DESC ";
		var query = "SELECT DATE_FORMAT(reg_date, '%H') DAY, COUNT(IF(state='e', state, NULL)) cnt FROM tbl_count_log  WHERE reg_date > DATE_FORMAT(CURDATE(), '%Y-%m-%d %H:%i:%s') AND node_id = ? GROUP BY DAY DESC ";
		var query2 = "SELECT DATE_FORMAT(reg_date, '%H') DAY, COUNT(*) cnt FROM tbl_count_log  WHERE reg_date > DATE_FORMAT(CURDATE(), '%Y-%m-%d %H:%i:%s') AND node_id = ? GROUP BY DAY DESC ";
		connection.query(query+";"+query2,[node_id, node_id],
			function(err, result){
				connection.release();

				if(err){
					console.log(err);
					callback(false);
					return;
				}
				callback(result)
			})
	})
}