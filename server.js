var express = require("express");
var nunjucks = require("nunjucks");
var bodyParser = require("body-parser");
var cors = require("cors");
// var config = require("./config");
var fs = require("fs");
var passport = require("./services/passport");
var session = require("express-session");

var app = express();

var http = require("http").Server(app);

var mqtt = require("./services/MQTTService")


app.use(session({
    secret: '@#@$MYSIGN#@$#$',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

nunjucks.configure("views", {
	autoescape : true,
	express : app,
	watch : true
})


app.use("/static", express.static(__dirname + "/public"));
app.use("/data", express.static(__dirname + "/data"));
app.use("/css", express.static(__dirname + "/node_modules/jquery-ui-dist"));
app.use("/css", express.static(__dirname+ "/node_modules/bootstrap/dist/css"));
app.use("/js", express.static(__dirname + "/node_modules/moment"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js"));
app.use("/js", express.static(__dirname + "/node_modules/jquery/dist"));
app.use("/js", express.static(__dirname + "/node_modules/jquery-ui-dist"));
app.use("/js", express.static(__dirname + "/node_modules/datatables.net/js"));
app.use("/js", express.static(__dirname + "/node_modules/jcanvas/dist"));
app.use("/js", express.static(__dirname + "/node_modules/d3/dist"));
app.use("/js", express.static(__dirname + "/node_modules/sugar/dist"));


var loginRoute = require("./route/loginRoute");
var monitoringRoute = require("./route/monitoringRoute");
var dashboardRoute = require("./route/dashboardRoute");
var settingRoute = require("./route/settingRoute");
var dataSetRoute = require("./route/dataSetRoute");

app.use("/login", loginRoute);
app.use("/monitoring", monitoringRoute);
app.use("/dashboard", dashboardRoute);
app.use("/setting", settingRoute);
app.use("/dataset", dataSetRoute);

fs.writeFile("web_server.pid", process.pid);

http.listen(9502, function(){
	console.log("http server start")
})