var express = require('express');
var app = express();
var bcrypt = require("bcrypt-nodejs");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bodyParser = require("body-parser");
var path = require("path");
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var recipeController = require("./controllers/recipesController.js");
var authController = require("./controllers/authController.js");
var userController = require("./controllers/usersController.js");
var DB = require("./db/connection");
var User = DB.models.User;

app.set("view engine", "hbs");
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/", express.static(path.join(__dirname + "/public")));

app.use(cookieParser('keyboard cat'));
app.use(session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
}));

passport.use(new LocalStrategy(function(username, pass, callback) {
    User.findOne({
        where: {
            username: username
        }
    }).then(function(user, err) {
        if (err) {
            return callback(err)
        }
        if (!user) {
            return callback(null, false)
        }
        if (!bcrypt.compareSync(pass, user.password)) {
            return callback(null, false)
        }
        return callback(null, user)
    })
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, callback) {
    callback(null, user.id);
});
passport.deserializeUser(function(id, callback) {
    User.findById(id).then(function(user) {
        callback(null, user);
    });
});


app.use(function(req, res, callback) {
  if (req.user) {
    res.locals.currentUser = req.user.username
  }
  callback();
});

app.get("/", function(req, res) {
    res.render("auth/signin");
});

app.use("/", recipeController);
app.use("/", authController);
app.use("/", userController);

app.listen(process.env.PORT || 3000, function() {
    console.log("Listening on port 3000");
});
