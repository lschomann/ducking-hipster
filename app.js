
/**
 * Module dependencies.
 */

var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , orm = require("orm")
    , ormModels = require("./datamodel/ormModels")
    , secrets = require("./secrets");

$postgress_json = process.env.VCAP_SERVICES;


var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
    , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
    var idx = id - 1;
    if (users[idx]) {
        fn(null, users[idx]);
    } else {
        fn(new Error('Benutzer ' + id + ' existiert nicht!'));
    }
}

function findByUsername(username, fn) {
    for (var i = 0, len = users.length; i < len; i++) {
        var user = users[i];
        if (user.username === username) {
            return fn(null, user);
        }
    }
    return fn(null, null);
}


// Passport session setup.
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    findById(id, function (err, user) {
        done(err, user);
    });
});

// Use the LocalStrategy within Passport.
passport.use(new LocalStrategy(
    function(username, password, done) {
        // asynchronous verification, for effect...
        process.nextTick(function () {

            // Find the user by username. If there is no user with the given
            // username, or the password is not correct, set the user to `false` to
            // indicate failure and set a flash message. Otherwise, return the
            // authenticated `user`.
            findByUsername(username, function(err, user) {
                if (err) { return done(err); }
                if (!user) { return done(null, false, { message: 'Ups, ' + username + ' ist uns unbekannt!' }); }
                if (user.password != password) { return done(null, false, { message: 'Dein Password ist nicht ganz korrekt!' }); }
                return done(null, user);
            });
        });
    }
));


var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.session({
        secret: secrets.session.secret,
        maxAge: new Date(Date.now() + 900000),
        expires: new Date(Date.now() + 900000)

    }));
//    app.use(orm.express(secrets.getDBConnectionString(), {
//        define: ormModels.setup
//    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

// http://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
routes = routes(app);

app.configure('development', function(){
    app.use(express.errorHandler());
});

/* Authorisation
 * * * * * * * * * * * * * * * * * * * * * */

// POST /login
app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            req.session.messages = [info.message];
            return res.redirect('/login')
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
});



/* Error Handling
 * * * * * * * * * * * * * * * * * * * * * */
app.use(function(req, res, next){
    res.sendfile('./static_pages/404.html');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});