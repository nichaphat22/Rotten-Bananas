var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const adminRouter = require('./routes/adminRouter');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
var newsRouter = require('./routes/news');
const Movies = require('./models/Movies');
const Users = require('./models/Users');
const News = require('./models/News');
const dotenv = require('dotenv');

dotenv.config()

const { requireAuth, checkUser } = require('./middleware/authMidleware');
var app = express();

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');
  next();
});

// view engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//database connection
const dbURI = process.env.DB_URL;
mongoose.connect(dbURI)
  .then(() => app.listen(8000, () => {
    console.log('Server running on port 8000');
  }))
  .catch((err) => console.log(err));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//route
app.get('*', checkUser);

app.use('/userRouter', userRouter);
app.use('/userRouter/aboutme', userRouter);
app.use('/userRouter/news', userRouter);
app.use('/userRouter/settingaccount', userRouter);

app.use('/news', newsRouter);
app.use('/news/manageNew', newsRouter);

app.get('/admin', async (req, res) => {
  try {
    const movies = await Movies.aggregate([
      {
        $project: {
          _id: 0,
          title: 1,
          createdAt: 1,
          type: { $literal: 'movie' }, // เพิ่มฟิลด์ type เพื่อระบุว่าเป็นข้อมูลจากคอลเล็คชัน movies
        },
      },
    ]);

    const news = await News.aggregate([
      {
        $project: {
          _id: 0,
          title: 1,
          createdAt: 1,
          type: { $literal: 'news' }, // เพิ่มฟิลด์ type เพื่อระบุว่าเป็นข้อมูลจากคอลเล็คชัน news
        },
      },
    ]);

    // รวมข้อมูลจาก movies และ news เข้าด้วยกัน
    const results = [...movies, ...news];

    // เรียงลำดับตาม createdAt จากน้อยไปมาก
    results.sort((a, b) => b.createdAt - a.createdAt);

    if (results.length === 0) {
      console.log('ไม่พบข้อมูล');
    } else {
      res.render('./admin/homeAdmin', { results });
    }
  } catch (error) {
    console.error(error);
  }
});

app.get('/home-login', requireAuth, async (req, res) => {
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

    res.render('./users/home-login', { moviesByType });
  } catch (err) {
    console.log(err);

  }
});

app.get('/profile', checkUser, async (req, res) => {
  // ส่งข้อมูลผู้ใช้ไปยังหน้า EJS
  res.render('./users/profile', { user: req.user });
});

app.get('/settingaccount', async (req, res) => {
  const user = await Users.findById(req.user.id);

  res.render('settingaccount', {
    user
  });
});


app.use(adminRouter);
app.use(authRouter);
app.use(userRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
