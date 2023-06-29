const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');

app.use("/js", express.static(__dirname + "/dist/js/"));
app.use("/css", express.static(__dirname + "/dist/css/"));
app.use("/img", express.static(__dirname + "/dist/img/"));
app.use("/fonts", express.static(__dirname + "/dist/fonts/"));

const rootNamespace = require('./src/modules/root');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

const layout = '../layouts/default';
const renderPage = (req, res, page, title) => {
    res.render(page, {
        layout,
        css: page,
        js: page,
        title
    });
};

app.get('/', (req, res) => {
    const page = 'root';
    renderPage(req, res, page, 'トップ');
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});
