const express = require('express');
const router = express.Router();

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

createRoute('root', {
    title: 'ホーム'
});

module.exports = router;