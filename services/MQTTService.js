var mqtt = require("mqtt");
var dataDB = require("../db/dataDB")


client.on("connect", function() {
	console.log("mqtt connect")
	client.subscribe("/soosang/factory/sensor")
});

// '{"node_id":"'+node_id+'", "type":'+type+', "value":'+value+'}'

client.on("message", function(topic, message){
	// console.log(message.toString())
	// console.log(typeof(message))
	message = JSON.parse(message)
	console.log(message)
	

	var node_id = message.node_id;
	var sensor_id = message.sensor_id;
	var type = message.type;
	var value = message.value;
	// console.log(node_id)
	// // console.log(message)

	// // console.log(JSON.parse(message))


	// // console.log(message.toString())
	// tbl_data_log 저장
	dataDB.saveDataLog(node_id, sensor_id, type, value, function(result){
		// console.log(result);
	});
	// value update
	dataDB.updateData(node_id, sensor_id, type, value, function(result){
		// console.log(result);
	});
})


