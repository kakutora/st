const express = require('express');
const app = express();
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('src/db/stable-diffusion.db');

/*
const createRoute = (pageName, pageSetting) => {
    const routePath = pageName === 'root' ? '/' : `/${pageName}`;
    router.get(routePath, (req, res) => {
        res.render(pageName, {
            layout: '../layouts/default',
            css: pageName,
            js: pageName,
            ...pageSetting
        });
    });
};
*/

module.exports = router;