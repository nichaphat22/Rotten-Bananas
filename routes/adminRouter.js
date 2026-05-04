const express = require('express')
const adminController = require('../controllers/adminController')
const router = express.Router()

//home
// router.get('/admin', adminController.homeAdmin);
//movie
router.get('/admin/createMovie', adminController.createMovie_get);

router.post('/admin/createMovie', adminController.createMovie_post);

router.get('/admin/manageMovie', adminController.manageMovie_get);

router.delete('/admin/manageMovie/:id', adminController.deleteMovie);

router.get('/admin/editMovie/:id', adminController.editMovie_get);

router.post('/admin/updateMovie/:id', adminController.edit_UpdateMovie_post);


//user
router.get('/admin/manageUser', adminController.manageUsers_get);

router.delete('/admin/manageUser/:id', adminController.delete_Users);

//news
router.get('/admin/createNew', adminController.createNews_get);

router.post('/admin/createNew', adminController.createNews_post);

router.get('/admin/manageNew', adminController.manageNew_get);

router.delete('/admin/manageNew/:id', adminController.delete_News);

router.get('/admin/editNews/:id', adminController.editNews_get);

router.post('/admin/updateNews/:id', adminController.edit_UpdateNews_post);


//feedback
// router.get('/admin/feedback', adminController.Feedback_get);
router.get('/admin/feedback', adminController.Feedback_get);













module.exports = router