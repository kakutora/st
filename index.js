const http = require("http");
const express = require("express");
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const server = http.createServer(app);

const routes = require('./routes');
const rootPage = require('./src/modules/root');

app.use("/js", express.static(__dirname + "/dist/js/"));
app.use("/css", express.static(__dirname + "/dist/css/"));
app.use("/img", express.static(__dirname + "/dist/img/"));
app.use("/fonts", express.static(__dirname + "/dist/fonts/"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.use('/', routes);

server.listen(3000, () => {
    console.log("Server started on port 3000");
});
