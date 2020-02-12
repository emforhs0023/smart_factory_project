var pool = require("../services/database").pool;

module.exports.signinAdmin = function(id, pwd, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }
        var query = "SELECT * FROM tbl_user WHERE user_id = ? AND user_password= ?"
        connection.query(query,[id, pwd],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err);
                    callback(false)
                }

                var rows = result.length;
                // console.log(rows)
                if(rows>0){
                	callback(true);
                    // if(result[0]["approve_state"] == 1){
                    //     callback(true, result[0]["auth"], result[0]["approve_state"]);    
                    // }else{
                    //     callback(true, null, result[0]["approve_state"]);
                    // }
                } else {
                    callback(false)
                }
            })
    })
}
module.exports.insertUserInfo = function(user_name, user_id, user_password, callback){
    pool.getConnection(function(err, connection){
        if(err){
            console.log(err);
            callback(false);
            return
        }

        var query = "INSERT INTO tbl_user (user_name, user_id, user_password, regi_date) VALUES (?,?,?,NOW())"   
        connection.query(query,[user_name, user_id, user_password],
            function(err, result){
                connection.release()

                if(err){
                    console.log(err)
                    callback(false)
                }

                callback(true)
            })
    })
}