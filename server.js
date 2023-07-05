const http = require("http");
const express = require("express");
const path = require('path');
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const server = http.createServer(app);
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('src/db/stable-diffusion.db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rootPage = require('./src/modules/root');

app.use("/js", express.static(__dirname + "/dist/js/"));
app.use("/css", express.static(__dirname + "/dist/css/"));
app.use("/img", express.static(__dirname + "/dist/img/"));
app.use("/fonts", express.static(__dirname + "/dist/fonts/"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);

app.get('/', (req, res) => {
    db.all('SELECT * FROM prompt', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('データベースエラーが発生しました');
            return;
        }

        res.render('root', {
            layout: '../layouts/default',
            css: 'root',
            js: 'root',
            title: 'ホーム',
            data: rows
        });
    });
});

app.post('/send', (req, res) => {
    const formData = req.body;
    const insertQuery = `INSERT INTO prompt (item, content, code, fav) VALUES (?, ?, ?, ?)`;
    const params = [formData.item, formData.content, formData.code, 0];
    db.run(insertQuery, params, function (err) {
        if (err) {
            console.error(err);
            res.status(500).send('データベースエラーが発生しました');
        } else {
            console.log('データを挿入しました');
            res.redirect('/');
        }
    });
});

app.post('/fav', (req, res) => {
    const itemId = req.body.itemId;

    // まず、データベースから現在のお気に入りの状態を取得します
    const selectQuery = 'SELECT fav FROM prompt WHERE id = ?';
    db.get(selectQuery, itemId, (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('データベースエラーが発生しました');
        } else {
            let newFav;

            // お気に入りの状態を切り替えます
            if (row && row.fav === 1) {
                newFav = 0;
            } else {
                newFav = 1;
            }

            // 更新クエリを実行してお気に入りの状態を更新します
            const updateQuery = 'UPDATE prompt SET fav = ? WHERE id = ?';
            db.run(updateQuery, [newFav, itemId], function (err) {
                if (err) {
                    console.error(err);
                    res.status(500).send('データベースエラーが発生しました');
                } else {
                    console.log('データを更新しました');
                    res.redirect('/');
                }
            });
        }
    });
});


app.post('/delete', (req, res) => {
    const itemId = req.body.itemId; // 削除するデータのIDを取得

    // SQLiteでデータを削除するクエリを実行
    const deleteQuery = 'DELETE FROM prompt WHERE id = ?';
    db.run(deleteQuery, itemId, function (err) {
        if (err) {
            console.error(err);
            res.status(500).send('データベースエラーが発生しました');
        } else {
            console.log('データを削除しました');
            res.redirect('/');
        }
    });
});

server.listen(3000, () => {
    console.log("Server started on port 3000");
});
