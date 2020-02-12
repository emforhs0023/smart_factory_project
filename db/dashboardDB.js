var pool = require("../services/database").pool;

//전체 layer 요청(layer)
module.exports.realTimeData = function(user_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT t4.regi_date, t4.node_id, t4.type, t4.value FROM (SELECT node_id FROM tbl_factory t1 JOIN tbl_machine t2 ON t1.factory_code = t2.factory_code WHERE user_id = ?) t3 JOIN tbl_sensor t4 ON t3.node_id = t4.node_id";
		connection.query(query,[user_id],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}
				
				callback(result);
			})
	})
}

module.exports.countErr = function(user_id, a, b, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT t6.node_id, t6.machine_name, t6.line, t5.reg_date FROM tbl_count_log t5 JOIN (SELECT t3.node_id, t3.machine_name, t3.line FROM tbl_machine t3 JOIN (SELECT t2.factory_code FROM tbl_user t1 JOIN tbl_factory t2 ON t1.user_id = t2.user_id  WHERE t1.user_id = ?) t4 ON t3.factory_code = t4.factory_code) t6 ON t5.node_id = t6.node_id WHERE t5.state = 'e' ORDER BY t5.reg_date DESC LIMIT ?, 4";
		var count_query = "SELECT count(*) AS count FROM tbl_count_log t5 JOIN (SELECT t3.node_id, t3.machine_name, t3.line FROM tbl_machine t3 JOIN (SELECT t2.factory_code FROM tbl_user t1 JOIN tbl_factory t2 ON t1.user_id = t2.user_id  WHERE t1.user_id = ?) t4 ON t3.factory_code = t4.factory_code) t6 ON t5.node_id = t6.node_id WHERE t5.state = 'e'"			
		connection.query(query+";"+count_query,[user_id, a, user_id],
			function(err, result){
				connection.release()

				if(err){
					console.log(err);
					callback(false);
					return;
				}
				
				callback([result[0],result[1][0].count])
			})
	})
}
module.exports.trend = function(user_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT DATE_FORMAT(reg_date, '%Y-%m-%d') DAY, COUNT(*) as cnt, t5.node_id, t5.state FROM tbl_count_log t5 JOIN (SELECT t3.factory_code, t3.node_id FROM tbl_machine t3 JOIN (SELECT t2.factory_code FROM tbl_user t1 JOIN tbl_factory t2 ON t1.user_id=t2.user_id WHERE t1.user_id = ?) t4 ON t3.factory_code = t4.factory_code) t6 ON t5.node_id = t6.node_id WHERE t5.state = 'e' GROUP BY DAY desc LIMIT 1, 3";		
		var query2 = "SELECT DATE_FORMAT(reg_date, '%Y-%m-%d') DAY, COUNT(*) as cnt, t5.node_id, t5.state FROM tbl_count_log t5 JOIN (SELECT t3.factory_code, t3.node_id FROM tbl_machine t3 JOIN (SELECT t2.factory_code FROM tbl_user t1 JOIN tbl_factory t2 ON t1.user_id=t2.user_id WHERE t1.user_id = ?) t4 ON t3.factory_code = t4.factory_code) t6 ON t5.node_id = t6.node_id GROUP BY DAY desc LIMIT 1, 3";		
		connection.query(query+";"+query2,[user_id, user_id],
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

module.exports.multiId = function(user_id, callback) {
	pool.getConnection(function(err, connection){
		if(err){
			console.log(err);
			callback(false);
			return;
		}
		var query = "SELECT t5.node_id FROM tbl_sensor_log t5 JOIN (SELECT node_id FROM tbl_machine t3 JOIN (SELECT t1.factory_code FROM tbl_factory t1 JOIN tbl_user t2 ON t1.user_id = t2.user_id) t4 ON t3.factory_code = t4.factory_code) t6 ON t5.node_id = t6.node_id  WHERE regi_date > DATE_FORMAT(CURDATE(), '%Y-%m-%d %H:%i:%s') GROUP BY t5.node_id";		
		connection.query(query,[user_id],
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
