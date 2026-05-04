var express = require('express');
var News = require('../models/News');
var router = express.Router();

//manageNews_get
router.get('/manageNew', function(req, res, next) {
    res.render('manageNew_admin')
});

// router.get('/createNew', (req, res) => {
//     // res.render('insert', { mytitle: 'Home' });
//     console.log('string')
// });

//createNews_post
// router.post('/createNew',(req, res) => {
//     const creatNews = new News(req.body)

//     creatNews.save()
//     .then((result) => {
//         res.redirect('/admin/addNew_addmin');
//     })
//     .catch((err) => {
//         console.log(err)
//     });
// });

module.exports = router;