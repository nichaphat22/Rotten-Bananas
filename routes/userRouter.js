var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController')






//---------------------------------------no-login----------------------------------//
// home
router.get('/', userController.mov_get);
// movie
router.get('/movies_nologin/:type', userController.MoviesdetailT_get)

router.get('/moviedetail_nolog/:id', userController.detailMovie_get);

// News
router.get('/news_nolog', userController.News_get);

// Newdetail
router.get('/newsdetail_nolog/:id', userController.Newsdetail_get);

// aboutme
router.get('/aboutme_nolog', function (req, res, next) {
  res.render('./user_no-login/aboutme_nolog');
});



//---------------------------------------------------login---------------------------------------------------------------//
router.get('/settingaccount/:id', userController.setting_get);

router.post('/settingaccount/editacc/:id', userController.setting_post);

router.post('/users/sendfeedback', userController.sendfeedback_get);

router.post('/users/sendfeedback', userController.sendfeedback_post);

router.get('/movies_login/:type', userController.MoviesdetailTLogin_get);

router.get('/moviedetail_log/:id', userController.detailMovieLog_get);



router.get('/feedback', function (req, res, next) {
  res.render('./users/feedback-login');
});



router.get('/aboutme-login', function (req, res, next) {
  res.render('./users/aboutme');
});

//-------------------------newlog-------------------------//
// News
router.get('/news', userController.Newslog_get);

// Newdetail
router.get('/newsdetail/:id', userController.Newsdetaillog_get);



// router.get('/news-login', function (req, res, next) {
//   res.render('./users/news');
// });

// router.get('/profile', adminController.Feedback_get);
module.exports = router;
