var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require("http");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session') // to maintain session between login and logout.
const { Server } = require("socket.io");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newSignupRouter = require("./routes/newSignup");
var getProductDetails = require("./routes/getProductDetails");
var addProductDetails = require("./routes/addProductData");
var validateUserCredentials = require('./routes/userCredentialsValidator');
var uplaodResouceImage = require("./routes/uploadResource");
var ckeckUserLoginRouter = require("./routes/checkUserLogin");
var userLogOut = require("./routes/UserLogOut");


 
var app = express();
const myServer = http.createServer(app);
const io = new Server(myServer);

io.on('connection', (socket) => {
  console.log("user connected");
});

app.use(session({ secret: 'sdaekficddqe', cookie: { maxAge: 60000 }}))
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/userLoginData/validate", validateUserCredentials); // given path for credentials or can say webService URL.
app.use("/new/user/signup", newSignupRouter);
app.use("/get/productDetails", getProductDetails);
app.use("/add/productData", addProductDetails);
app.use("/upload/resourceImage", uplaodResouceImage);
app.use("/ckeck/isLoggedIn", ckeckUserLoginRouter);
app.use("/user/logOut", userLogOut);

myServer.listen(3080, () => {
  console.log("Server is listing to 3080");
})

// app.listen(3080, () => {
// console.log("Server is listening at 3080")
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
}); 

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
