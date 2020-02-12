var pool = require("../services/database").pool;

module.exports.saveDataLog = function(machine_id, sensor_id, type, value, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }

        
        if(type=="CNT"){
        	var query = "INSERT INTO tbl_sensor_log(node_id, sensor_id, type, value, regi_date) "
            +"VALUES ((SELECT node_id FROM tbl_sensor WHERE sensor_id = ?), ?, ?, ?, NOW())";
            var query_array = [sensor_id, sensor_id, type, value];
        }else if(type=="TEMP"){
            var query = "INSERT INTO tbl_sensor_log(node_id, sensor_id, type, value, regi_date) "
            +"VALUES ((SELECT node_id FROM tbl_sensor WHERE sensor_id = ?), ?, ?, ?, NOW())";
            var query_array = [sensor_id, sensor_id, type, value];
        }
       
        connection.query(query, query_array,
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false)
                }

                callback(true)
            })
    })
}

module.exports.updateData = function(machine_id, sensor_id, type, value, callback){
	 pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        if(type=="CNT"){
        	var query = "UPDATE tbl_sensor SET VALUE =  VALUE + ?, update_date = NOW() WHERE sensor_id = ?";
            var query_array = [value, sensor_id];
        }else if(type=="TEMP"){
            var query = "update tbl_sensor set value = ?, update_date = NOW() WHERE sensor_id = ?"
            var query_array = [value, sensor_id];
        }
        connection.query(query, query_array,
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false)
                }

                callback(true)
            })
    })
}
