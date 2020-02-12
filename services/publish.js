var mqtt = require("mqtt");

client.on("connect", function() {
	console.log("mqtt connect")
	client.publish("/soosang/factory/sensor", '{"node_id":"0000", "sensor_id" : "CNT0", "type":"CNT", "value":"1"}')
	// client.publish("/soosang/factory/sensor", '{"node_id":"0000", "sensor_id" : "6", "type":"TEMP", "value":"6966188"}')
});

