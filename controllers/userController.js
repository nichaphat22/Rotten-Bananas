const Users = require('../models/Users');
const Movies = require('../models/Movies');
const News = require('../models/News'); 
const Feedbacks = require('../models/Feedbacks'); 
const { model } = require('mongoose');

//---------------------------------------no-login----------------------------------//
//Home_get
module.exports.mov_get = async (req, res) => {
    try {
        const movieTypes = [
            "การตูนอนิเมชั่น (Animation)",
            "นิยายเหนือจริง (Fantasy)",
            "แอ็คชั่น (Action)",
            "ตลก (Comedy)",
            "ชีวิต (Drama)",
            "หนังผี (Horror)",
            "นวนิยายวิทยาศาสตร์ (Sci-fi)",
            "รักโรแมนติก (Romance)"
        ];

        const moviesByType = {};

        for (const type of movieTypes) {
            const movies = await Movies.find({ type }).sort({ createdAt: -1 });
            moviesByType[type] = movies;
        }

        res.render('index', { moviesByType });
    } catch (err) {
        console.log(err);
       
    }
}
//moviedetail_type
module.exports.MoviesdetailT_get = async  (req, res) => {
    const movieType = req.params.type;
    try {
      // ดึงข้อมูลหนังตามประเภทและส่งไปยังหน้าแสดงหนังตามประเภท
      const movies = await Movies.find({ type: movieType }).sort({ createdAt: -1 });
      res.render('./user_no-login/moviegenre_nolog', { movies, movieType });
    } catch (error) {
      console.error(error);
      // คุณสามารถจัดการข้อผิดพลาดตามที่คุณต้องการ
    }
  }

//moviedetail 
module.exports.detailMovie_get = (req, res) => {
    const movie_detail = req.params.id
    const movieType = req.params.type;
    Movies.findById(movie_detail)
        .then((movies) => {
            res.render('./user_no-login/moviedetail_nolog', { movies,movieType })
        })
        .catch((err) => {
            console.log(err)
        })

}

//---------news-----------;
//News_get
module.exports.News_get = (req, res) => {
    News.find()
    .sort({ createdAt: -1 })
    .then((news) => { // เปลี่ยน Project เป็น news ที่ส่งไปยัง EJS
        res.render('./user_no-login/news_nolog', { news }); // เปลี่ยน Project เป็น news ที่ส่งไปยัง EJS
    })
    .catch((err) => {
        console.log(err);
    });
        
}

//Newsdetail_get
module.exports.Newsdetail_get = (req, res) => {
    const detail_News = req.params.id
    News.findById(detail_News)
        .then((news) => {
            res.render('./user_no-login/newsdetail_nolog', { news })
        })
        .catch((err) => {
            console.log(err)
        })
}




//---------------------------------------------------login---------------------------------------------------------------//

//--------movie-------//

//moviedetail_type
module.exports.MoviesdetailTLogin_get = async  (req, res) => {
    const movieType = req.params.type;
    try {
      // ดึงข้อมูลหนังตามประเภทและส่งไปยังหน้าแสดงหนังตามประเภท
      const movies = await Movies.find({ type: movieType }).sort({ createdAt: -1 });
      res.render('./users/moviegenre', { movies, movieType });
    } catch (error) {
      console.error(error);
      // คุณสามารถจัดการข้อผิดพลาดตามที่คุณต้องการ
    }
  }
//moviedetail 
module.exports.detailMovieLog_get = (req, res) => {
    const movie_detail = req.params.id
    const movieType = req.params.type;
    Movies.findById(movie_detail)
        .then((movies) => {
            res.render('./user_no-login/moviedetail_nolog', { movies,movieType })
        })
        .catch((err) => {
            console.log(err)
        })

}




//---------news-----------;
//News_get
module.exports.Newslog_get = (req, res) => {
    News.find()
    .sort({ createdAt: -1 })
    .then((news) => { // เปลี่ยน Project เป็น news ที่ส่งไปยัง EJS
        res.render('./users/news', { news }); // เปลี่ยน Project เป็น news ที่ส่งไปยัง EJS
    })
    .catch((err) => {
        console.log(err);
    });
        
    // res.render('./index',{news})
}

//Newsdetail_get
module.exports.Newsdetaillog_get = (req, res) => {
    const detail_News = req.params.id
    News.findById(detail_News)
        .then((news) => {
            res.render('./users/newsdetail', { news })
        })
        .catch((err) => {
            console.log(err)
        })
}

//---------profile-----------;

module.exports.setting_get = (req, res) => {
        const resourceId = req.params.id;
        const availableGender = ["หญิง", "ชาย", "LGBTQIA+", "ไม่ระบุ"];
        Users.findById(resourceId)
          .then((user) => {
            res.render('./users/settingaccount.ejs', { user, availableGender })
          })
          .catch((err) => {
            console.log(err)
          })
        
    }

module.exports.setting_post = (req, res) => {
        const resourceId = req.params.id;
        const updatedData = req.body;
        Users.findByIdAndUpdate(resourceId , updatedData)
          .then((user) => {
            res.redirect('./users/profile');
          })
          .catch((err) => {
            console.log(err)
          })
        
    }

module.exports.sendfeedback_get = (req, res) => {
        res.render('./users/feedback-login');
    }

module.exports.sendfeedback_post = (req, res) => {
        const sendfb = new Feedbacks(req.body)
    
        sendfb.save()
            .then((result) => {
                res.redirect('/users/home-login');
            })
            .catch((err) => {
                console.log(err)
            })
    }
// //profile_get
// module.exports.login_post = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const users = await Users.login(email, password);
//         const token = createToken(users._id);
//         res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
//         res.status(200).json({
//             users: users._id,
//             email: users.email,
//             username: users.username, // เพิ่ม username
//             imgUser: users.imgUser // เพิ่ม imgUser
//         });
//     } catch (err) {
//         const errors = handleErrors(err);
//         res.status(400).json({ errors });
//     }
// }


// module.exports.profile_get =  (requireAuth, req, res) => {

  
//     // Get the user's ID.
//     const userId = req.user?.id;

  
//     // Find the user by ID.
//     Users.findById(userId)
//       .then((user) => {
//         // Render the EJS template.
//         res.render('./users/profile', { user });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
  