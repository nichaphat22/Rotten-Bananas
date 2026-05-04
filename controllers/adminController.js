const Movies = require('../models/Movies');
const News = require('../models/News')
const Users = require('../models/Users')
const Feedbacks = require('../models/Feedbacks'); 

//-------------------------home-------------------------------------------//


//-------------------------movie-------------------------------------------//

//manageMovie_get
module.exports.manageMovie_get = (req, res) => {
    Movies.find()
        .sort({ createdAt: -1 })
        .then((movies) => { // เปลี่ยน Project เป็น movies ที่ส่งไปยัง EJS
            res.render('./admin/manageMovie_admin', { movies }); // เปลี่ยน Project เป็น movies ที่ส่งไปยัง EJS
        })
        .catch((err) => {
            console.log(err);
        });

    // res.render('./admin/manageMovie_admin',{Movies})
}
//createMovie_get
module.exports.createMovie_get = (req, res) => {
    res.render('./admin/addMovie_admin');
}
//createMovie_post
module.exports.createMovie_post = (req, res) => {
    const creatM = new Movies(req.body)

    creatM.save()
        .then((result) => {
            res.redirect('/admin/manageMovie');
        })
        .catch((err) => {
            console.log(err)
        })
}
//editMovie_get
module.exports.editMovie_get = (req, res) => {
    const edit_Movie = req.params.id
    Movies.findById(edit_Movie)
        .then((movies) => {
            res.render('./admin/editMovie_admin', { movies })
        })
        .catch((err) => {
            console.log(err)
        })
}

//edit_UpdateMovie_post
module.exports.edit_UpdateMovie_post = (req, res) => {
    const update_Movie = req.params.id
    Movies.findByIdAndUpdate(update_Movie, {
        title: req.body.title,
        type: req.body.type,
        detail: req.body.detail,
        year: req.body.year,
        imgM: req.body.imgM
    })
        .then((movies) => {
            res.redirect('/admin/manageMovie');
        })
}

//deleteMovie
module.exports.deleteMovie = (req, res) => {
    const m_id = req.params.id
    Movies.findByIdAndDelete(m_id)
        .then(movie => {
            res.json({ redirect: '/admin/manageMovie' })
        })
        .catch(err => {
            console.log(err)
        })
}


//----------------------------------------News-------------------------------------------//

//manageNews_get
module.exports.manageNew_get = (req, res) => {
    News.find()
        .sort({ createdAt: -1 })
        .then((news) => {
            res.render('./admin/manageNew_admin', { news });
        })
        .catch((err) => {
            console.log(err);
        });
}

//createNews_get
module.exports.createNews_get = (req, res) => {
    res.render('./admin/addNew_admin');
}

//createNews_post
module.exports.createNews_post = (req, res) => {
    const creatNews = new News(req.body)

    creatNews.save()
        .then((result) => {
            res.redirect('/admin/manageNew');
        })
        .catch((err) => {
            console.log(err)
        })
}
//editNews_get
module.exports.editNews_get = (req, res) => {
    const edit_News = req.params.id
    News.findById(edit_News)
        .then((news) => {
            res.render('./admin/editNew_admin', { news })
        })
        .catch((err) => {
            console.log(err)
        })
}
//edit_UpdateNews_post
module.exports.edit_UpdateNews_post = (req, res) => {
    const update_News = req.params.id
    News.findByIdAndUpdate(update_News, {
        title: req.body.title,
        detail: req.body.detail,
        imgNews: req.body.imgNews
    })
        .then((news) => {
            res.redirect('/admin/manageNew');
        })
}

//deleteNews
module.exports.delete_News = (req, res) => {
    const n_id = req.params.id
    News.findByIdAndDelete(n_id)
        .then(news => {
            res.json({ redirect: '/admin/manageNew' })
        })
        .catch(err => {
            console.log(err)
        })
}



//----------------------------------------Users-------------------------------------------//
//manageUsers_get
module.exports.manageUsers_get = (req, res) => {
    Users.find()
        .sort({ createdAt: -1 })
        .then((users) => {
            res.render('./admin/manageUser_admin', { users });
        })
        .catch((err) => {
            console.log(err);
        });
    // res.render('./admin/manageUser_admin')
}
//deleteNews
module.exports.delete_Users = (req, res) => {
    const u_id = req.params.id
    Users.findByIdAndDelete(u_id)
        .then(news => {
            res.json({ redirect: '/admin/manageUser' })
        })
        .catch(err => {
            console.log(err)
        })
}



//----------------------------------------feedback-------------------------------------------//

//feedback
module.exports.Feedback_get = (req, res) => {
    Feedbacks.find()
    .sort({ createdAt: -1 })
    .then((feedbacks) => {
        res.render('./admin/feedback_admin', { feedbacks });
    })
    .catch((err) => {
        console.log(err);
    });
}
